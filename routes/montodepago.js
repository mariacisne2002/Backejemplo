const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database');

router.get('/monto', (req, res) => {
    mysqlConnection.query('SELECT * FROM montodepago', (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err); 
      }
    });  
  });

  router.get('/monto:id', (req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM montodepago WHERE numero_de_recibo = ?', [numero_de_recibo], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    });
  });

  // DELETE An Employee
router.delete('/monto:numero_de_recibo', (req, res) => {
  const { numero_de_recibo } = req.params;
  mysqlConnection.query('DELETE FROM montodepago WHERE numero_de_recibo = ?', [numero_de_recibo], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'montodepago Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An Employee
router.post('/monto', (req, res) => {
  const {numero_de_recibo, monto_de_pago, fecha_de_pago} = req.body;
  console.log(numero_de_recibo, monto_de_pago, fecha_de_pago);
  const query = `
    SET @numero_de_recibo = ?;
    SET @monto_de_pago = ?;
    SET @fecha_de_pago = ?;
    CALL montodepagoAddOrEdit(@numero_de_recibo, @monto_de_pago, fecha_de_pago  );
  `;
  mysqlConnection.query(query, [numero_de_recibo, monto_de_pago, fecha_de_pago], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'montodepago Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/monto:numero_de_recibo', (req, res) => {
  const { numero_de_recibo, monto_de_pago, fecha_de_pago} = req.body;
  const { id } = req.params;
  const query = `
  SET @numero_de_recibo = ?;
    SET @monto_de_pago = ?;
    SET @fecha_de_pago = ?;
    CALL montodepagoAddOrEdit(@numero_de_recibo, @monto_de_pago, fecha_de_pago  );
  `;
  mysqlConnection.query(query, [numero_de_recibo, monto_de_pago, fecha_de_pago], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'monto_de_pago Updated'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;