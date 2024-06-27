# Proyecto **ICI4247-1- INGENIERIA WEB Y MOVIL(1S2024)**

## Integrantes

- Gerald Espinoza
- Lucas Robles

## Descripción

Este proyecto se realiza en conjunto con el proyecto del ramo **ICI4150-1- ROBOTICA Y SISTEMAS AUTONOMOS(1S2024)** y fue seleccionada la propuesta de Proyecto 2: 

Se requiere un robot autónomo que pueda recorrer el siguiente laberinto, donde el robot pueda encontrar la salida. El camino debe tener en cuenta las limitaciones del vehículo para evitar colisiones. Al completar el laberinto, tu robot debería celebrar girando dos veces en el sentido de las agujas del reloj y luego dos giros en el sentido contrario a las agujas del reloj. La meta está marcada por el círculo rojo. Para aproximaciones de distancia, todos los bloques grises miden 50 cm * 10 cm.

![Propuesta 2](Otros//ImagenesReadme/IdeaProyecto.png)

##### Segunda Entrega Parcial

- EF.1 Implementar la versión final de la sesión de usuarios, considerando la autenticación y autorización de usuarios, y la gestión de roles (usuario y administrador).
- EF.2 Implementar el backend de la aplicación, con enfoque de API REST, y utilizando el framework y la base de datos seleccionadas, con conexión entre ambos. Se deben considerar al menos 2 rutas, y que involucren algunos de los métodos HTTP (GET, POST, PUT, DELETE). Algunos frameworks de ejemplo son: Express.js, Nest.js, Spring Boot, Flask, entre otros.
- EF.3 Implementar la conexión entre el frontend y el backend, utilizando el concepto de API REST, y consumir los datos desde el backend, y mostrarlos en el frontend.
- EF.4 Implementación de al menos 4 aspectos de seguridad web. Algunos ejemplos son: Autenticación y autorización de usuarios mediante JWT, encriptación de contraseñas en la base de datos (hashing), captcha (no soy un robot), crear usuario de DB y limitar permisos, manejo de cierre de sesión, identificador de sesión, uso de variables de entorno en el desarrollo para proteger datos sensibles, entre otros.

### EF.1 Implementar la versión final de la sesión de usuarios, considerando la autenticación y autorización de usuarios, y la gestión de roles (usuario y administrador).

Se hace autentificación de usuarios con el backend (la contraseña encriptada), y se da respuesta al frontEnd, si concuerda, se inicia sesion correctamente. Se maneja roles admin y user en el frontend, porque usuario tiene un atributo "isAdmin".


### EF.2 Implementar el backend de la aplicación, con enfoque de API REST, y utilizando el framework y la base de datos seleccionadas, con conexión entre ambos. Se deben considerar al menos 2 rutas, y que involucren algunos de los métodos HTTP (GET, POST, PUT, DELETE). Algunos frameworks de ejemplo son: Express.js, Nest.js, Spring Boot, Flask, entre otros.

Se uso Flask para el backend, considerando que parte del objetivo del grupo era usar las funciones python del robot en el backend y comunicarse con el robot desde una apk en celular.

Se conecto el backend con el frontend por medio de servicios en el frontend, que estan en una carpeta llama services en src/app/services. Se usaron GET, POST, PUT, DELETE para manejar a los usuarios.

Tambien se comunica con el backend para obtener regiones y comunas de un json para el registro de sesión y el editar usuario.

### EF.3 Implementar la conexión entre el frontend y el backend, utilizando el concepto de API REST, y consumir los datos desde el backend, y mostrarlos en el frontend.

El unico que se comunica con BD es el backend, el frontend recibe informacion del backend (el backend compara contraseñas, revisa que usuario y contraseña coincidan, obtiene los datos de la bd, elimina o edita datos de la bd, entregando los resultados por mensajes al frontend).


### EF.4 Implementación de al menos 4 aspectos de seguridad web. Algunos ejemplos son: Autenticación y autorización de usuarios mediante JWT, encriptación de contraseñas en la base de datos (hashing), captcha (no soy un robot), crear usuario de DB y limitar permisos, manejo de cierre de sesión, identificador de sesión, uso de variables de entorno en el desarrollo para proteger datos sensibles, entre otros.

Se uso autentificacion para revisar que usuario y contraseña son validos en login.
JWT se uso para saber que esta la sesión iniciada (dando permisos de un usuario iniciado, que en la app es ver y manipular sus datos), el token se guarda en una BD de sesiones, y cada sesion iniciada dura 1 hora.
Cuando el backend recibe contraseñas, las encripta antes de mandarlas a la BD, ademas si recibe una contraseña, puede comparar con una del BD para ver si son la misma (para login).
Se maneja el cierre de sesión, se elimina la sesion de la BD y ya no se puede acceder a las funciones que requeren ser un usuario con sesion iniciada.

### Como ejecutar

En el backend, existe un libreries.py que instala las librerias de python necesarias (hace los comandos pip install para todas las librerias). Para esto es necesario tener python instalado con el PATH (lo que permite comandos pip en consola windows).

Para el servidor de la base de datos, usamos XAMPP, en la carpeta BackEnd, existe un Usuarios.sql. Esto contiene un script para crear la base de datos con el nombre que solicita el Backend, se debe usar sql en XAMPP sin entrar a ninguna DB y creara la base de datos con sus tablas y algunos datos.

Para el FrontEnd, se debe tener instalado NodeJS y Ionic. Se ingresa a la carpeta FrontEnd y se ejecuta el comando
~~~
npm install
~~~
en cmd ubicandose en FrontEnd.

Luego de tener las librerias y dependencias instaladas y la BD creada.

Se debe hacer lo siguiente.

1. Tener la BD en linea
2. Poner a correr el BackEnd, se debe estar en cd BackEnd en la consola cmd y poner
~~~
py app.py
~~~
3. Se inicia el FrontEnd, estando en cd FrontEnd en la consola cmd y poner
~~~
ionic serve
~~~


Se tiene un json de rutValidos porque se valida el rut (no se puede poner cualquier numero ni cualquier digito verificador), puede copiar y pegar para un registro.

Tambien se tiene un json de usuarios validos, que son los que se crean en sql si uso el que esta en el backend. Esto para probar el inicio de sesión sin registrar usuario.