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
INSERT INTO `usuarios` (email, nombre, rut, region, comuna, password, isAdmin)
VALUES 
    ('juan.perez@example.com', 'Juan Perez', '12345678-9', 'Metropolitana', 'Santiago', 'pass1234', 1),
    ('maria.gonzalez@example.com', 'Maria Gonzalez', '98765432-1', 'Valparaiso', 'Valparaiso', 'maria2021', 0),
    ('pedro.ramirez@example.com', 'Pedro Ramirez', '11122233-4', 'Biobio', 'Concepcion', 'pedroPass', 0);
