# Proyecto **ICI4247-1- INGENIERIA WEB Y MOVIL(1S2024)**

<div align="center">

[![angular-badge-sm]][angular-web] [![css3-badge-sm]][css3-web] [![eslint-badge-sm]][eslint-web] [![express-badge-sm]][express-web] [![figma-badge-sm]][figma-web] [![git-badge-sm]][git-web] [![github-badge-sm]][github-web] [![html5-badge-sm]][html5-web] [![ionic-badge-sm]][ionic-web] [![js-badge-sm]][js-web] [![mongodb-badge-sm]][mongodb-web] [![mysql-badge-sm]][mysql-web] [![nodejs-badge-sm]][nodejs-web] [![npm-badge-sm]][npm-web] [![postgresql-badge-sm]][postgresql-web] [![prettier-badge-sm]][prettier-web] [![react-badge-sm]][react-web] [![tailwind-badge-sm]][tailwind-web] [![ts-badge-sm]][ts-web] [![vscode-badge-sm]][vscode-web] [![yarn-badge-sm]][yarn-web]

[![ios-development-badge-sm]][ios-development-web] [![android-development-badge-sm]][android-development-web]

</div>

## Integrantes

- Gerald Espinoza
- Lucas Robles

## Descripción

Este proyecto se realiza en conjunto con el proyecto del ramo **ICI4150-1- ROBOTICA Y SISTEMAS AUTONOMOS(1S2024)** y fue seleccionada la propuesta de Proyecto 2: 

Se requiere un robot autónomo que pueda recorrer el siguiente laberinto, donde el robot pueda encontrar la salida. El camino debe tener en cuenta las limitaciones del vehículo para evitar colisiones. Al completar el laberinto, tu robot debería celebrar girando dos veces en el sentido de las agujas del reloj y luego dos giros en el sentido contrario a las agujas del reloj. La meta está marcada por el círculo rojo. Para aproximaciones de distancia, todos los bloques grises miden 50 cm * 10 cm.

![Propuesta 2](Otros//ImagenesReadme/IdeaProyecto.png)

##### Primera Entrega Parcial

- EP1.1 Análisis y diseño de funcionalidades (al menos 5).
- EP1.2 Prototipado en Figma de al menos 5 UI (pantallas), que representen las funcionalidades propuestas. Se deben considerar 5 funcionalidades y diseños diferentes, y las UI deben ser prototipadas utilizando interfaces móviles
- EP1.3 Maquetación responsiva de las 5 UI utilizando HTML y CSS. Se puede utilizar preprocesadores de CSS, o librerías de diseño como Bootstrap o Tailwind CSS.
- EP1.4 Incluír dos formularios relacionados a la sesión de usuarios (inicio de sesión y registro), considerando los campos: Nombre de usuario (username), RUT, Correo Electrónico (email), Región, Comuna, Contraseña, Confirmación de contraseña y Aceptación de términos y condiciones.
- EP1.5 Implementar un mecanismo de validación de formularios, utilizando JavaScript, y mostrando mensajes de error en caso de que los campos no cumplan con las reglas de validación.

### Funcionalidades

1. Menú: Un menú en forma de bar que se encuentre en todas las pantallas, con diseño minimalista e intuitivo, para navergar por las funcionalidades de la aplicación.

2. Registro de Usuario: Una de las 2 funcionalidades relacionadas a la sesión del usuario. Consiste en espacios de input para insertar los datos requeridos, un boton para registrar un nuevo usuario en la aplicación con esos datos y otro boton para registrarse con su cuenta Google.

3. Inicio de sesión: Una de las 2 funcionalidades relacionadas a la sesión del usuario. En esta solo habra 2 input para verificar el usuario y 2 botones, uno con los datos ingresados y otro con su cuenta Google

4. Control Remoto del Robot: Funcion que busca permitir al usuario mover al robot con un control remoto que se mostraria en pantalla, que consiste en las flechas de movimiento y un boton para celebrar donde el robot realizara movimientos pre-programados a modo de celebración.

5. Recorrer el laberinto: 
    - Pantalla donde se puede iniciar la funcion principal del robot, un boton para indicarle al robot que esta en un laberinto y debe salir de manera autonoma.
    - Mientra el robot se mueve por su cuenta sale un icono de carga y el boton presionado se torna rojo, siendo ahora un boton para detener al robot. 
    - Al presionar el boton rojo, el robot cesa su movimiento autonomo y se muestra en pantalla lo que el robot ha mapeado del laberinto.

## Prototipo

<div align="center">

[![figma-prot-badge]][figma-prot-url] [![figma-dis-badge]][figma-dis-url]

</div>

## Maquetación web

> [!NOTE]
> Debe incluir los archivos de maquetación en la carpeta respectiva, e incluir una breve descripción de dichos archivos.

[js-badge-sm]: https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=flat
[js-web]: https://developer.mozilla.org/es/docs/Web/JavaScript
[ts-badge-sm]: https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=flat
[ts-web]: https://www.typescriptlang.org/
[html5-badge-sm]: https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=fff&style=flat
[html5-web]: https://developer.mozilla.org/es/docs/Web/HTML
[css3-badge-sm]: https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=fff&style=flat
[css3-web]: https://developer.mozilla.org/es/docs/Web/CSS
[tailwind-badge-sm]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=fff&style=flat
[tailwind-web]: https://tailwindcss.com/
[react-badge-sm]: https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=fff&style=flat
[react-web]: https://reactjs.org/
[angular-badge-sm]: https://img.shields.io/badge/Angular-DD0031?logo=angular&logoColor=fff&style=flat
[angular-web]: https://angular.io/
[nodejs-badge-sm]: https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=fff&style=flat
[nodejs-web]: https://nodejs.org/
[express-badge-sm]: https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=fff&style=flat
[express-web]: https://expressjs.com/
[mongodb-badge-sm]: https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=fff&style=flat
[mongodb-web]: https://www.mongodb.com/
[postgresql-badge-sm]: https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=fff&style=flat
[postgresql-web]: https://www.postgresql.org/
[mysql-badge-sm]: https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=fff&style=flat
[mysql-web]: https://www.mysql.com/
[git-badge-sm]: https://img.shields.io/badge/Git-F05032?logo=git&logoColor=fff&style=flat
[git-web]: https://git-scm.com/
[github-badge-sm]: https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=fff&style=flat
[github-web]: https://github.com
[npm-badge-sm]: https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff&style=flat
[npm-web]: https://www.npmjs.com/
[yarn-badge-sm]: https://img.shields.io/badge/Yarn-2C8EBB?logo=yarn&logoColor=fff&style=flat
[yarn-web]: https://yarnpkg.com/
[prettier-badge-sm]: https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=fff&style=flat
[prettier-web]: https://prettier.io/
[eslint-badge-sm]: https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=fff&style=flat
[eslint-web]: https://eslint.org/
[vscode-badge-sm]: https://img.shields.io/badge/Visual_Studio_Code-007ACC?logo=visual-studio-code&logoColor=fff&style=flat
[vscode-web]: https://code.visualstudio.com/
[ionic-badge-sm]: https://img.shields.io/badge/Ionic-3880FF?logo=ionic&logoColor=fff&style=flat
[ionic-web]: https://ionicframework.com/
[figma-badge-sm]: https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=fff&style=flat
[figma-web]: https://www.figma.com/
[ios-development-badge-sm]: https://img.shields.io/badge/iOS_Development-000000?logo=ios&logoColor=fff&style=flat
[ios-development-web]: https://developer.apple.com/ios/
[android-development-badge-sm]: https://img.shields.io/badge/Android_Development-3DDC84?logo=android&logoColor=fff&style=flat
[android-development-web]: https://developer.android.com/

[figma-prot-badge]: https://img.shields.io/badge/Ver%20prototipo%20en%20Figma-F24E1E?logo=figma&logoColor=fff&style=flat
[figma-prot-url]: https://www.figma.com/file/tohZZDbyGVSBx4Ei6HKVq6/Web-y-Robotica?type=design&node-id=1%3A3&mode=design&t=3yznKTGzGxYGXfRy-1 
[figma-dis-badge]: https://img.shields.io/badge/Ver%20diseño%20UI%20en%20Figma-F24E1E?logo=figma&logoColor=fff&style=flat
[figma-dis-url]: https://www.figma.com/proto/tohZZDbyGVSBx4Ei6HKVq6/Web-y-Robotica?type=design&node-id=8-68&t=tomM2kdyr1irPSbD-1&scaling=scale-down&page-id=0%3A1&starting-point-node-id=8%3A68&mode=design
