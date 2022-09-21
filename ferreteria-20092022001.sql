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
CREATE DATABASE IF NOT EXISTS `ferreteria` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_bin */;
USE `ferreteria`;

-- Volcando estructura para tabla ferreteria.categorias
CREATE TABLE IF NOT EXISTS `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) COLLATE latin1_bin NOT NULL,
  `descripcion` varchar(255) COLLATE latin1_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- Volcando datos para la tabla ferreteria.categorias: ~9 rows (aproximadamente)
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT IGNORE INTO `categorias` (`id`, `nombre`, `descripcion`) VALUES
	(1, 'Industria', NULL),
	(2, 'Construcción', NULL),
	(3, 'Madera', NULL),
	(4, 'Sellantes', NULL),
	(5, 'Pinturas', NULL),
	(6, 'Equipos de trabajo', NULL),
	(7, 'Electroportátiles', NULL),
	(8, 'Accesorios', NULL),
	(9, 'Protección y vestuario', NULL);
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;

-- Volcando estructura para tabla ferreteria.categorias_productos
CREATE TABLE IF NOT EXISTS `categorias_productos` (
  `id_categoria` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  KEY `categorias_productos_FK` (`id_categoria`),
  KEY `categorias_productos_FK_1` (`id_producto`),
  CONSTRAINT `categorias_productos_FK` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `categorias_productos_FK_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- Volcando datos para la tabla ferreteria.categorias_productos: ~11 rows (aproximadamente)
/*!40000 ALTER TABLE `categorias_productos` DISABLE KEYS */;
INSERT IGNORE INTO `categorias_productos` (`id_categoria`, `id_producto`) VALUES
	(6, 1),
	(6, 2),
	(6, 3),
	(6, 4),
	(6, 5),
	(6, 6),
	(6, 7),
	(6, 8),
	(6, 9),
	(6, 10),
	(1, 10);
/*!40000 ALTER TABLE `categorias_productos` ENABLE KEYS */;

-- Volcando estructura para tabla ferreteria.compras
CREATE TABLE IF NOT EXISTS `compras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) DEFAULT NULL,
  `precio_total` decimal(10,0) DEFAULT NULL,
  `estado` varchar(20) COLLATE latin1_bin DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `compras_FK` (`id_usuario`),
  CONSTRAINT `compras_FK` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- Volcando datos para la tabla ferreteria.compras: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `compras` DISABLE KEYS */;
/*!40000 ALTER TABLE `compras` ENABLE KEYS */;

-- Volcando estructura para tabla ferreteria.productos
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

-- Volcando estructura para tabla ferreteria.productos_compras
CREATE TABLE IF NOT EXISTS `productos_compras` (
  `id_compra` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad_comprada` tinyint(4) DEFAULT 0,
  KEY `productos_compras_FK` (`id_producto`),
  KEY `productos_compras_FK_1` (`id_compra`),
  CONSTRAINT `productos_compras_FK` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`),
  CONSTRAINT `productos_compras_FK_1` FOREIGN KEY (`id_compra`) REFERENCES `compras` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- Volcando datos para la tabla ferreteria.productos_compras: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `productos_compras` DISABLE KEYS */;
/*!40000 ALTER TABLE `productos_compras` ENABLE KEYS */;

-- Volcando estructura para tabla ferreteria.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(60) COLLATE latin1_bin NOT NULL,
  `nombres` varchar(100) COLLATE latin1_bin DEFAULT NULL,
  `apellidos` varchar(100) COLLATE latin1_bin DEFAULT NULL,
  `correo` varchar(150) COLLATE latin1_bin NOT NULL,
  `contrasena` varchar(128) COLLATE latin1_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- Volcando datos para la tabla ferreteria.usuarios: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT IGNORE INTO `usuarios` (`id`, `usuario`, `nombres`, `apellidos`, `correo`, `contrasena`) VALUES
	(1, 'Valen7v', 'Dana Valentina', 'Manchego Alvarez', 'danamanchego7065@gmail.com', NULL),
	(2, 'JAnto21', 'Julian Antonio', 'Maldonado Rico', 'julianto1991@gmail.com', NULL),
	(3, 'CarlBele5', 'Carlos', 'Belen Lara', 'carlbe505@gmail.com', NULL),
	(4, 'MariJofe', 'Maria José', 'Castillo Paez', 'mariapaez2000@gmail.com', NULL),
	(5, 'Alej02', 'Alejandra', 'Rodriguez Romero', 'alejaromero2022@gmail.com', NULL),
	(6, 'admin', 'admin', 'admin', 'admin', '21232f297a57a5a743894a0e4a801fc3'),
	(7, '1002683521', 'Guillermo', 'Antonio', 'guilleantoq0@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
	(8, '1002455632', 'Julian ', 'Torres Garcia', 'juliangarcia1020@gmail.com', '962012d09b8170d912f0669f6d7d9d07');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
