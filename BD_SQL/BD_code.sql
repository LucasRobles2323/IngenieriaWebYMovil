-- -----------------------------------------------------
-- Table `Mapa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Mapa` (
  `idMapa` INT NOT NULL,
  `row1` VARCHAR(10) NOT NULL,
  `row2` VARCHAR(10) NOT NULL,
  `row3` VARCHAR(10) NOT NULL,
  `row4` VARCHAR(10) NOT NULL,
  `row5` VARCHAR(10) NOT NULL,
  `row6` VARCHAR(10) NOT NULL,
  `row7` VARCHAR(10) NOT NULL,
  `row8` VARCHAR(10) NOT NULL,
  `row9` VARCHAR(10) NOT NULL,
  `row10` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idMapa`))


-- -----------------------------------------------------
-- Table `mydb`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Usuario` (
  `idUsuario` INT NOT NULL,
  `Mapa_idMapa` INT NOT NULL,
  `nombre` VARCHAR(200) NOT NULL,
  `rut` VARCHAR(15) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `region` VARCHAR(300) NOT NULL,
  `comuna` VARCHAR(300) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `isAdmin` BOOLEAN NOT NULL,
  PRIMARY KEY (`idUsuario`),
  INDEX `fk_Usuario_Mapa_idx` (`Mapa_idMapa` ASC) VISIBLE,
  CONSTRAINT `fk_Usuario_Mapa`
    FOREIGN KEY (`Mapa_idMapa`)
    REFERENCES `mydb`.`Mapa` (`idMapa`))