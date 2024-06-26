from flask import Flask, request, jsonify, g
from flask_bcrypt import Bcrypt, check_password_hash
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

from datetime import timedelta, datetime

import json
import mysql.connector

app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)

# Configuración del JWT para manejar la sesion de usuario.
app.config['JWT_SECRET_KEY'] = '2010 earthquake, I overslept.'
jwt = JWTManager(app)

def get_db():
    if 'db' not in g:
        g.db = mysql.connector.connect(
            host='localhost',
            user='root',
            password='',
            database='robot-movil'
        )
    return g.db


@app.teardown_appcontext
def close_db(exception):
    db = g.pop('db', None)
    if db is not None:
        db.close()

# Limpiar sesiones expiradas antes de cada solicitud
@app.before_request
def before_request():
    clean_expired_sessions()

# Función para limpiar sesiones expiradas
def clean_expired_sessions():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM sesiones WHERE fecha_expiracion < NOW()")
    db.commit()
    cursor.close()

@app.route('/process', methods=['POST'])
def process():
    data = request.json
    cadena = data.get('Cadena', '')
    
    # Parse the string
    try:
        r = int(cadena.split('R:')[1].split('G:')[0])
        g = int(cadena.split('G:')[1].split('B:')[0])
        b = int(cadena.split('B:')[1].split('D:')[0])
        d = cadena.split('D:')[1]
    except (IndexError, ValueError) as e:
        return jsonify({'error': 'Invalid format'}), 400
    
    result = {
        'RGB': f"({r},{g},{b})",
        'Distancia': d
    }
    
    return jsonify(result)

# Ruta de inicio
@app.route('/')
def index():
    return "Bienvenido al Servicio Web Flask para la aplicación movil!"

# Rutas para los usuarios en sql

# Ruta para obtener todos los usuarios
@app.route('/usuarios', methods=['GET'])
def get_users():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT email, nombre, rut, region, comuna, isAdmin FROM usuarios")
    users = cursor.fetchall()
    cursor.close()
    return jsonify(users), 200

# Ruta para obtener un usuario por su email
@app.route('/<string:email>', methods=['GET'])
def get_user(email):
    db = get_db()
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
    comuna = data['comuna']
    password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    isAdmin = data.get('isAdmin', False)  # Por defecto, isAdmin es False si no se especifica

    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("INSERT INTO usuarios (email, nombre, rut, region, comuna, password, isAdmin) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                       (email, nombre, rut, region, comuna, password, isAdmin))
        db.commit()
        cursor.close()
        return jsonify({"status": "Usuario creado exitosamente"}), 201
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 400

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT email, password FROM usuarios WHERE email = %s", (email,))
    user = cursor.fetchone()
    cursor.close()

    if user and check_password_hash(user['password'], password):
        # Contraseña válida, generar token JWT por 1 hora
        expires_delta = timedelta(hours=1)
        access_token = create_access_token(identity=email, expires_delta=expires_delta)

        # Almacenar la sesión en la tabla de sesiones
        cursor = db.cursor()
        fecha_expiracion = datetime.utcnow() + expires_delta
        cursor.execute("INSERT INTO sesiones (email, token, fecha_expiracion) VALUES (%s, %s, %s)",
                       (email, access_token, fecha_expiracion))
        db.commit()
        cursor.close()

        return jsonify(access_token=access_token), 200
    else:
        # Credenciales inválidas
        return jsonify({"error": "Credenciales inválidas"}), 401

@app.route('/logout', methods=['POST'])
@jwt_required() 
def logout():
    current_user = get_jwt_identity()
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("DELETE FROM sesiones WHERE email = %s", (current_user,))
        db.commit()
        cursor.close()
        return jsonify({"message": "Logout exitoso"}), 200
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 400

@app.route('/current-usuario', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user = get_jwt_identity()
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT email, nombre, rut, region, comuna, isAdmin FROM usuarios WHERE email = %s", (current_user,))
    user = cursor.fetchone()
    cursor.close()

    if user:
        return jsonify(user), 200
    else:
        return jsonify({"error": "Usuario no encontrado"}), 404
    
# Ruta para cambiar la contraseña del usuario actual
@app.route('/change-password', methods=['PUT'])
@jwt_required()
def change_password():
    current_user = get_jwt_identity()
    
    data = request.json
    new_password = data.get('new_password')

    if not new_password:
        return jsonify({"error": "Se requiere proporcionar la nueva contraseña"}), 400

    hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')

    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("UPDATE usuarios SET password = %s WHERE email = %s", (hashed_password, current_user))
        db.commit()
        cursor.close()
        return jsonify({"status": "Contraseña cambiada exitosamente"}), 200
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 400

# Ruta para actualizar el usuario actual
@app.route('/update', methods=['PUT'])
@jwt_required()
def put_user():
    current_user = get_jwt_identity()

    data = request.json
    nombre = data.get('nombre')
    rut = data.get('rut')
    region = data.get('region')
    comuna = data.get('comuna') 
    isAdmin = data.get('isAdmin', False) # Por defecto, isAdmin es False si no se especifica

    db = get_db()
    cursor = db.cursor()
    try:
        if nombre:
            cursor.execute("UPDATE usuarios SET nombre = %s WHERE email = %s", (nombre, current_user))
        if rut:
            cursor.execute("UPDATE usuarios SET rut = %s WHERE email = %s", (rut, current_user))
        if region:
            cursor.execute("UPDATE usuarios SET region = %s WHERE email = %s", (region, current_user))
        if comuna:
            cursor.execute("UPDATE usuarios SET comuna = %s WHERE email = %s", (comuna, current_user))  # Actualizar comuna
        if isAdmin is not None:
            cursor.execute("UPDATE usuarios SET isAdmin = %s WHERE email = %s", (isAdmin, current_user))
        db.commit()
        cursor.close()
        return jsonify({"status": "Usuario actualizado exitosamente"}), 200
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 400

# Ruta para eliminar un usuario distinto al actual por su email
@app.route('/eliminar/distinct-user', methods=['DELETE'])
@jwt_required()
def delete_distinct_user():
    current_user = get_jwt_identity()

    data = request.json
    email = data.get('email')

    if current_user == email:
        return jsonify({"error": "No permitido."}), 403

    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("DELETE FROM usuarios WHERE email = %s", (email,))
        db.commit()
        cursor.close()
        return jsonify({"status": "Usuario eliminado exitosamente"}), 200
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 400
    
# Ruta para eliminar al usuario actual
@app.route('/eliminar/current-user', methods=['DELETE'])
@jwt_required()
def delete_current_user():
    current_user = get_jwt_identity()

    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("DELETE FROM usuarios WHERE email = %s", (current_user,))
        db.commit()
        cursor.close()
        return jsonify({"status": "Usuario eliminado exitosamente"}), 200
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 400




### Rutas para las regiones y comunas
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
    # En vez de 0.0.0.0 hay que poner el ip del PC
    #app.run(host='0.0.0.0', port=5000, debug=True)