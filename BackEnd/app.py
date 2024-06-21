from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt, check_password_hash
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token

import json
import mysql.connector

app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)

# Configuración de la conexión a la base de datos
db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="",
    database="robot-movil"
)

@app.route('/')
def index():
    return "Bienvenido al Servicio Web Flask!"

# Rutas para los usuarios en sql

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT email, password FROM usuarios WHERE email = %s", (email,))
    user = cursor.fetchone()
    cursor.close()

    if user and check_password_hash(user['password'], password):
        # Contraseña válida
        # Puedes generar un token JWT aquí si necesitas manejar sesiones
        return jsonify({"message": "Login exitoso"}), 200
    else:
        # Credenciales inválidas
        return jsonify({"error": "Credenciales inválidas"}), 401
    
# Ruta para cambiar la contraseña de un usuario por su email
@app.route('/<string:email>/change-password', methods=['PUT'])
def change_password(email):
    data = request.json
    new_password = data.get('new_password')

    if not new_password:
        return jsonify({"error": "Se requiere proporcionar la nueva contraseña"}), 400

    hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')

    cursor = db.cursor()
    try:
        cursor.execute("UPDATE usuarios SET password = %s WHERE email = %s", (hashed_password, email))
        db.commit()
        cursor.close()
        return jsonify({"status": "Contraseña cambiada exitosamente"}), 200
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 400

# Ruta para obtener todos los usuarios
@app.route('/usuarios', methods=['GET'])
def get_users():
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT email, nombre, rut, region, comuna, isAdmin FROM usuarios")
    users = cursor.fetchall()
    cursor.close()
    return jsonify(users), 200

# Ruta para obtener un usuario por su email
@app.route('/<string:email>', methods=['GET'])
def get_user(email):
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT email, nombre, rut, region, comuna, password, isAdmin FROM usuarios WHERE email = %s", (email,))
    user = cursor.fetchone()
    cursor.close()
    if user:
        return jsonify(user), 200
    else:
        return jsonify({"error": "Usuario no encontrado"}), 404

# Ruta para crear un nuevo usuario
@app.route('/new-usuario', methods=['POST'])
def post_user():
    data = request.json
    email = data['email']
    nombre = data['nombre']
    rut = data['rut']
    region = data['region']
    comuna = data['comuna']  # Agregar comuna desde el JSON recibido
    password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    isAdmin = data.get('isAdmin', False)  # Por defecto, isAdmin es False si no se especifica

    cursor = db.cursor()
    try:
        cursor.execute("INSERT INTO usuarios (email, nombre, rut, region, comuna, password, isAdmin) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                       (email, nombre, rut, region, comuna, password, isAdmin))
        db.commit()
        cursor.close()
        return jsonify({"status": "Usuario creado exitosamente"}), 201
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 400

# Ruta para actualizar un usuario por su email
@app.route('/<string:email>/update', methods=['PUT'])
def put_user(email):
    data = request.json
    nombre = data.get('nombre')
    rut = data.get('rut')
    region = data.get('region')
    comuna = data.get('comuna')
    isAdmin = data.get('isAdmin')

    cursor = db.cursor()
    try:
        if nombre:
            cursor.execute("UPDATE usuarios SET nombre = %s WHERE email = %s", (nombre, email))
        if rut:
            cursor.execute("UPDATE usuarios SET rut = %s WHERE email = %s", (rut, email))
        if region:
            cursor.execute("UPDATE usuarios SET region = %s WHERE email = %s", (region, email))
        if comuna:
            cursor.execute("UPDATE usuarios SET comuna = %s WHERE email = %s", (comuna, email))  # Actualizar comuna
        if isAdmin is not None:
            cursor.execute("UPDATE usuarios SET isAdmin = %s WHERE email = %s", (isAdmin, email))
        db.commit()
        cursor.close()
        return jsonify({"status": "Usuario actualizado exitosamente"}), 200
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 400

# Ruta para eliminar un usuario por su email
@app.route('/<string:email>/eliminar', methods=['DELETE'])
def delete_user(email):
    cursor = db.cursor()
    try:
        cursor.execute("DELETE FROM usuarios WHERE email = %s", (email,))
        db.commit()
        cursor.close()
        return jsonify({"status": "Usuario eliminado exitosamente"}), 200
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 400

# Rutas para las regiones y comunas
regiones_comunas_file = './regiones-comunas.json'

@app.route('/regiones', methods=['GET'])
def get_regiones():
    with open(regiones_comunas_file, 'r', encoding='utf-8') as file:
        regiones_data = json.load(file)
    regiones = [{'codigo': codigo, 'nombre': region['nombre']} for codigo, region in regiones_data['regiones'].items()]
    return jsonify(regiones=regiones)

@app.route('/region/<string:codigo>', methods=['GET'])
def get_region(codigo):
    with open(regiones_comunas_file, 'r', encoding='utf-8') as file:
        regiones_data = json.load(file)
    region = regiones_data['regiones'].get(codigo)
    if region:
        return jsonify(region)
    else:
        return jsonify(error="Región no encontrada"), 404

@app.route('/<string:codigo>/comunas', methods=['GET'])
def get_comunas(codigo):
    with open(regiones_comunas_file, 'r', encoding='utf-8') as file:
        regiones_data = json.load(file)
    region = regiones_data['regiones'].get(codigo)
    if region:
        return jsonify(comunas=region['comunas'])
    else:
        return jsonify(error="Región no encontrada"), 404
    

if __name__ == '__main__':
    app.run(debug=True)