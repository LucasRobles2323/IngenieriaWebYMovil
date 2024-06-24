-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS `robot-movil`;

-- Seleccionar la base de datos
USE `robot-movil`;

-- Crear la tabla de usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `email` VARCHAR(255) NOT NULL PRIMARY KEY,
  `nombre` VARCHAR(255) NOT NULL,
  `rut` VARCHAR(12) NOT NULL UNIQUE,
  `region` VARCHAR(100) NOT NULL,
  `comuna` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `isAdmin` BOOLEAN NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertar valores en la tabla de usuarios
-- Insertar valores en la tabla de usuarios
INSERT INTO `usuarios` (email, nombre, rut, region, comuna, password, isAdmin)
VALUES 
('lucasrobles23@mail.cl', 'Lucas Robles', '21365017-3', 'Región de Valparaíso', 'Valparaiso', '$2b$12$EkCdYZVVB5xFTNzeYpFcSOK3PgK0w.GctsxFzkea7TdA0/z3cnacG', 1),
('example@mail.com', 'Example User', '11050001-7', 'Región de Atacama', 'Copiapó', '$2b$12$tHiGu2036iHyZVrQO5HUfelj8dGrk./JdUYzkjM6pjhTz8nI/EWEy', 0),
('geraldespi45@mail.cl', 'Gerald Espinoza', '10004923-6', 'Región Metropolitana de Santiago', 'Alhué', '$2b$12$UAZzrF37wdme8xpS8dqQaenGGx0zqKFmkGpSSyTb8IVjsa.gh.LRO', 1);


-- Crear tabla que maneja las sesiones.
CREATE TABLE sesiones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    fecha_expiracion DATETIME NOT NULL
);
