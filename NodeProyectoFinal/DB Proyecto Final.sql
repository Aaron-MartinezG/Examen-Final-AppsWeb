CREATE DATABASE conta_db;
use conta_db;

CREATE TABLE servicios(
	id_servicio INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion TEXT,
    precio_base DECIMAL(10, 2)
);

CREATE TABLE clientes(
	id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    empresa VARCHAR(50),
    correo VARCHAR(50),
    telefono VARCHAR(20),
    rfc VARCHAR(15),
	honorarios_mensuales DECIMAL(10, 2),
    fecha_inicio DATE,
    activo BOOLEAN DEFAULT TRUE,
    id_servicio INT NOT NULL,
    FOREIGN KEY (id_servicio) REFERENCES servicios(id_servicio) ON DELETE CASCADE
);


CREATE TABLE facturas(
	id_factura INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    folio VARCHAR(50),
    fecha_emision DATE,
    fecha_pago DATE,
    monto DECIMAL(10, 2),
    estado ENUM('Pendiente', 'Pagada', 'Cancelada') DEFAULT 'Pendiente',
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente) ON DELETE CASCADE
);

INSERT INTO servicios (nombre, descripcion, precio_base) VALUES 
('Contabilidad General', 'Declaraciones mensuales y anuales', 1500.00),
('Nómina', 'Cálculo y timbrado de nómina', 800.00),
('Asesoría Fiscal', 'Consultas específicas sobre SAT', 500.00);

-- Nota: Ahora al insertar clientes, debemos especificar el id_servicio (ej: 1, 2 o 3)
INSERT INTO clientes (nombre, empresa, correo, telefono, rfc, honorarios_mensuales, fecha_inicio, activo, id_servicio) VALUES
('Juan Pérez', 'Abarrotes Don Juan', 'juan@mail.com', '4771235687', 'XAXX010101000', 2300.00, '2024-01-15', 1, 1), -- Tiene Contabilidad General
('Maria López', 'Consultoría ML', 'maria@mail.com', '4772096347', 'XAXX020202000', 1500.00, '2024-02-01', 1, 3); -- Tiene Asesoría Fiscal

INSERT INTO facturas (id_cliente, folio, fecha_emision, fecha_pago, monto, estado) VALUES
(1, 'F-001', '2024-10-01', '2024-10-30', 2300.00, 'Pagada'),
(1, 'F-002', '2024-11-01', '2024-11-05', 2300.00, 'Pendiente');

SELECT * FROM clientes;