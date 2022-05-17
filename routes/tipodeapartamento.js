const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database');

router.get('/tipo', (req, res) => {
    mysqlConnection.query('SELECT * FROM tipodeapartamento', (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err); 
      }
    });  
  });

// ver un empleado
router.get('/tipo:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM tipoapartamento WHERE id_apartamento = ?', [id_apartamento], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An Employee
router.delete('/tipo:id_apartamento', (req, res) => {
  const { id_apartamento } = req.params;
  mysqlConnection.query('DELETE FROM tipodeapartamento WHERE id_apartamento = ?', [id_apartamento], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'tipodeapartamento Deleted'});
    } else {
      console.log(err);
    }
  });
});

//insertar
router.post('/tipo', (req, res) => {
  const {id_apartamento, nombre_de_apartamento, precio_de_apartamento, ategoriasdeapartamentos_id_Categoria} = req.body;
  console.log(id_apartamento, nombre_de_apartamento, precio_de_apartamento, ategoriasdeapartamentos_id_Categoria );
  const query = `
    SET @id_apartamento = ?;
    SET @n=nombre_de_apartamento =?;
    SET @n=precio_de_apartamento= ?;
    SET @n=categoriasdeapartamentos_id_Categoria =?;
    CALL tipodeapartamentoAddOrEdit(@id_apartamento, @nombre_de_apartamento, @precio_de_apartamento, @categoriasdeapartamentos_id_Categoria);
  `;
  mysqlConnection.query(query, [id_apartamento, nombre_de_apartamento, precio_de_apartamento, ategoriasdeapartamentos_id_Categoria ], (err, rows, fields) => {
   if(!err) {
      res.json({status: 'tipodeapartamento Saved'});
   } else {
      console.log(err);
    }
  });

});

router.put('/tipo:id_apartamento', (req, res) => {
  const { id_apartamento, nombre_de_apartamento, precio_de_apartamento, ategoriasdeapartamentos_id_Categoria} = req.body;
  const { id } = req.params;
  const query = `
  SET @id_apartamento = ?;
  SET @n=nombre_de_apartamento =?;
  SET @n=precio_de_apartamento= ?;
  SET @n=categoriasdeapartamentos_id_Categoria =?;
  CALL tipodeapartamentoAddOrEdit(@id_apartamento, @nombre_de_apartamento, @precio_de_apartamento, @categoriasdeapartamentos_id_Categoria);
`;
  mysqlConnection.query(query, [id_apartamento, nombre_de_apartamento, precio_de_apartamento, ategoriasdeapartamentos_id_Categoria], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'tipodeapartamento Updated'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;