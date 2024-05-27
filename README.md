# Proyecto **ICI4247-1- INGENIERIA WEB Y MOVIL(1S2024)**

## Integrantes

- Gerald Espinoza
- Lucas Robles

## Descripción

Este proyecto se realiza en conjunto con el proyecto del ramo **ICI4150-1- ROBOTICA Y SISTEMAS AUTONOMOS(1S2024)** y fue seleccionada la propuesta de Proyecto 2: 

Se requiere un robot autónomo que pueda recorrer el siguiente laberinto, donde el robot pueda encontrar la salida. El camino debe tener en cuenta las limitaciones del vehículo para evitar colisiones. Al completar el laberinto, tu robot debería celebrar girando dos veces en el sentido de las agujas del reloj y luego dos giros en el sentido contrario a las agujas del reloj. La meta está marcada por el círculo rojo. Para aproximaciones de distancia, todos los bloques grises miden 50 cm * 10 cm.

![Propuesta 2](Otros//ImagenesReadme/IdeaProyecto.png)

##### Segunda Entrega Parcial

- EP2.1 Implementación de las 5 UI en el framework Ionic.
- EP2.2 Hacer lectura de datos desde un archivo JSON (puede ser local, o alg´una fuente externa de datos), y mostrarlos en alguna de las pantallas.
- EP2.3 Definir estructura de datos inicial de la aplicación, y definir la estructura de la base de datos, y el modelo de datos. Algunos motores de bases de datos que se pueden utilizar son: MySQL, PostgreSQL, SQLite, MongoDB, Firebase, entre otros.
- EP2.4 Hacer uso de al menos dos (2) patrones de diseño, ya sea web o móvil, en la implementación de las pantallas, teniendo como foco principal el uso desde un dispositivo móvil.

### EP2.1

1. Menú: Esta en la carpeta src/app/tabs, esta presente en cada pantalla

2. Registro de Usuario: Esta en la carpeta src/app/tab3/registro

3. Inicio de sesión: Esta en la carpeta src/app/tab3

4. Control Remoto del Robot: Esta en la carpeta src/app/tab2

5. Recorrer el laberinto: src/app/tab1. Dentro de la carpeta tambien existe la pagina laberinto-end. Para acceder simplemente presione el boton iniciar en la pestaña y espere a que cargue, no tarda mas de 5 segundos.

Se cambiaron algunos aspectos visuales de la aplicación por diseño, pero las funcionalidades son las mismas.

### EP2.2

El json se encuentra en ./src/assets/BD.json  

Se guarda los datos de 2 usuarios, uno es admin y el otro no. Es posible iniciar sesión si se ingresa datos correctos del json.

Al ingresar un email y contraseña que corresponden a usuarios guardados, se enviara a una pantalla de sesión iniciada, donde se lee del json la informacion del usuario y se muestra en pantalla. Al ingresar datos fuera de la base de datos, entonces solo vera advertencias de que email o contraseña esta mal.

~~~
[{
    "idUsuario": "1", 
    "nombre": "Lucas Juan Bravo Espinoza",
    "rut": "21.332.121-3",
    "email": "lujuabraes@mail.com",
    "region": "Región de Valparaíso",
    "comuna": "Viña del Mar",
    "password": "1234567",
    "isAdmin": false
},
{
    "idUsuario": "2", 
    "nombre": "Juan Matias Bravo Gonzalez",
    "rut": "21.332.432-k",
    "email": "jumabrago@mail.com",
    "region": "Región de Valparaíso",
    "comuna": "Valparaíso",
    "password": "7654321",
    "isAdmin": true
}]
~~~

### EP2.3

En la carpeta BD_SQL se creo una base de datos inicial para la aplicación con los datos que consideramos importantes considerar.

### EP2.4

Se usaron 2 patrones de diseño.

Uno corresponde a tab bar, al ser una aplicación movil, tiene un menu inferior presente en todas las pantallas, ademas que no usa mas de 5 opciones ni menos de 3 opciones. Fue implementado en /tabs

El otro corresponde a back history. Un icono de flecha que permite volver a la pagina en la que se estaba anteriormente presionandolo. Dicho icono se encuentra en el header, en la parte superior de la pantalla, en el extremo izquierdo. Fue implementado en el componente header y usado en todas las pantallas con lo contenido en la carpeta shared.

### Como ejecutar

Primero tiene que abrir la carpeta MazeMaster en Visual Studio Code. Una vez alli tiene que abrir una terminal de cmd.

Luego en la terminal ingresa el siguiente comando
~~~
npm install
~~~

Con ese comando se instalaran las dependencias del proyecto, este proceso puede tardar un rato.

Una vez este todo instalado se ejecuta el siguiente comando
~~~
ionic serve
~~~

Una vez que cargue, se abrira el proyecto en su navegador.

Luego puede usar las herramientas de desarrollador para ver la aplicación en pantallas moviles.