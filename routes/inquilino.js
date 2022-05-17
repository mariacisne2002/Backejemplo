const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database');

router.get('/inquilino', (req, res) => {
    mysqlConnection.query('SELECT * FROM inquilino', (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err); 
      }
    });  
  });

  router.get('/inquilino:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM inquilino WHERE dpi = ?', [dpi], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An Employee
router.delete('/inquilino:dpi', (req, res) => {
  const { dpi } = req.params;
  mysqlConnection.query('DELETE FROM inquilino  WHERE dpi= ?', [dpi], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'inquilino Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An Employee
router.post('/inquilino', (req, res) => {
  const {dpi, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, numero_de_telefono, cantidad_de_personas, fecha_de_ingreso, tipodeapartamento_id_apartamento, montodepago_numero_de_recibo} = req.body;
  console.log(dpi, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, numero_de_telefono, cantidad_de_personas, fecha_de_ingreso, tipodeapartamento_id_apartamento, montodepago_numero_de_recibo);
  const query = `
    SET @dpi =?:
    SET @primer_nombre = ?;
    SET @segundo_nombre= ?;
    SET @primer_apellido= ?;
    SET @segundo_apellido= ?;
    SET @numero_de_telefono= ?;
    SET @cantidad_de_personas= ?;
    SET @tipodeapartamento_id_apartamento = ?;
    SET @montodepago_numero_de_recibo = ?;
    CALL inquilinoAddOrEdit(@primer_nombre, @segundo_nombre, @primer_apellido, @segundo_apellido, @numero_de_telefono, @cantidad_de_personas, @montodepago_numero_de_recibo   );
  `;
  mysqlConnection.query(query, [dpi, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, numero_de_telefono, cantidad_de_personas, fecha_de_ingreso, tipodeapartamento_id_apartamento, montodepago_numero_de_recibo], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'inquilino Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/inquilino:dpi', (req, res) => {
  const { dpi, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, numero_de_telefono, cantidad_de_personas, fecha_de_ingreso, tipodeapartamento_id_apartamento, montodepago_numero_de_recibo } = req.body;
  const { id } = req.params;
  const query = `
  SET @dpi =?:
  SET @primer_nombre = ?;
    SET @segundo_nombre= ?;
    SET @primer_apellido= ?;
    SET @segundo_apellido= ?;
    SET @numero_de_telefono= ?;
    SET @cantidad_de_personas= ?;
    SET @tipodeapartamento_id_apartamento = ?;
    SET @montodepago_numero_de_recibo = ?;
    CALLinquilinoAddOrEdit(@primer_nombre, @segundo_nombre, @primer_apellido, @segundo_apellido, @numero_de_telefono, @cantidad_de_personas, @montodepago_numero_de_recibo   );
  `;
  mysqlConnection.query(query, [dpi, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, numero_de_telefono, cantidad_de_personas, fecha_de_ingreso, tipodeapartamento_id_apartamento, montodepago_numero_de_recibo], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'inquilino  Updated'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;