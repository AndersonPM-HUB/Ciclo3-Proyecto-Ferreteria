-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.9.2-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para ferreteria
DROP DATABASE IF EXISTS `ferreteria`;
CREATE DATABASE IF NOT EXISTS `ferreteria` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_bin */;
USE `ferreteria`;

-- Volcando estructura para tabla ferreteria.productos
DROP TABLE IF EXISTS `productos`;
CREATE TABLE IF NOT EXISTS `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) COLLATE latin1_bin NOT NULL,
  `cantidad` tinyint(4) DEFAULT 0,
  `descripcion` varchar(255) COLLATE latin1_bin DEFAULT NULL,
  `precio_unidad` decimal(10,0) DEFAULT 0,
  `imagen` varchar(255) COLLATE latin1_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- Volcando datos para la tabla ferreteria.productos: ~10 rows (aproximadamente)
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT IGNORE INTO `productos` (`id`, `nombre`, `cantidad`, `descripcion`, `precio_unidad`, `imagen`) VALUES
	(1, 'Cizalla corta', 10, NULL, 133900, NULL),
	(2, 'Cortador de tubos', 15, NULL, 50900, NULL),
	(3, 'Juego de copas', 10, '1/4 y 3/8, 39 Piezas', 50900, NULL),
	(4, 'Pistola Calafateadora', 15, NULL, 44500, NULL),
	(5, 'Pinza de presion', 15, NULL, 43900, NULL),
	(6, 'Llave para plomero', 5, NULL, 42900, NULL),
	(7, 'Llave copa multiusos', 10, '', 41300, NULL),
	(8, 'Broca para hierro', 30, NULL, 39913, NULL),
	(9, 'Alicate', 10, NULL, 38500, NULL),
	(10, 'Hombresolo', 10, 'Punta larga', 33900, NULL);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
