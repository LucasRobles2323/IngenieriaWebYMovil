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
('juan.perez@example.com', 'Juan Perez', '10004917-2', 'Metropolitana', 'Santiago', '$2b$12$L3G8SejZiD7AK5fG/QQts.cTvLYTAEDYKtlb1mlVYFLPBvOsAVuqC', 1),
('lucasrobles23@mail.cl', 'Lucas Robles', '21365017-3', 'Región de Valparaíso', 'Valparaiso', '$2b$12$QmTVURLeiU2Z7LWuLIgGnerBFZpY4RtW3K8FqRv1Gd9Q6E1w2FxD6', 1),
('maria.gonzalez@example.com', 'Maria Gonzalez', '10004920-2', 'Valparaiso', 'Valparaiso', '$2b$12$qPvLJNT2MUBpk80Svu6k5.ZJQ.hyTwBxSPXa5tSXeHA4evuQeUXni', 0),
('pedro.ramirez@example.com', 'Pedro Ramirez', '10004921-0', 'Biobio', 'Concepcion', '$2b$12$ZmZlvZ04tVqVaYtt1.DsbuGuRWF4Mzf3zmh.fX18EKIlZE7Znlhhq', 0);


-- Crear tabla que maneja las sesiones.
CREATE TABLE sesiones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    fecha_expiracion DATETIME NOT NULL
);
