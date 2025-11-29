const express = require("express");
const cors = require("cors");
const connection = require("./db")
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Definimos el endpoint para guardar clientes
app.post('/clientes', (req, res) => {
  const { nombre, empresa, correo, telefono, rfc, honorarios_mensuales, fecha_inicio, activo, id_servicio } = req.body;

  const sql = `INSERT INTO clientes (nombre, empresa, correo, telefono, rfc, honorarios_mensuales, fecha_inicio, activo, id_servicio)
              VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(sql, [nombre, empresa, correo, telefono, rfc, honorarios_mensuales, fecha_inicio, activo, id_servicio], (err, result) => {
    if (err) {
      console.error('Error al insertar en MySQL', err);
      return res.status(500).json({ message: 'Error guardando en la base de datos'});
    }

    console.log('Datos insertados correctamente en MySQL')
    console.log(result);
    res.status(201).json({
      message: 'Registro exitoso.',
      idGenerado: result.insertId
    })
  })
})

// // Endpoint para obtener todo
app.get('/clientes', (req, res) => {
  const sql = `SELECT * FROM clientes`;

  connection.query(sql, (err, result) => {
    if(err){
      return res.status(500).json({mensaje:"Error al traer los datos"});
    }

    res.status(200).json(result);
  });
});

// app.get('/getConfirmacionById/:id', (req, res)=>{
//   const { id } = req.params;
//   const sql = `SELECT * FROM confirmaciones WHERE id = ?`;

//   connection.query(sql, [id], (err, result)=>{
//     if(err){
//       return res.status(500).json({mensaje:"Error al consultar"});
//     }

//     if( result.length === 0 ){
//       return res.status(200).json({mensaje:"Resultados no encontrados"});
//     }

//     res.status(200).json(result);
//   })
// });

app.get("/", (req, res) => {
  res.send("Hola desde mi server de express");
});

//  app.post('/confirmacion', (req, res) => {
//    console.log("Datos recibidos desde Angular");
//    const data = req.body;
//    res.status(200).json({
//      message: 'Confirmación recibida correctamente',
//      received: data
//    })
//  })

app.listen(port, () => {
  console.log("My port is working on " + port);
});
