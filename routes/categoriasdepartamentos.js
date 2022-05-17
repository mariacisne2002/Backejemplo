const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database');

router.get('/categoria', (req, res) => {
    mysqlConnection.query('SELECT * FROM categoriasdeapartamentos', (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err); 
      }
    });  
  });

  router.get('/categoria:id', (req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM tcategoriasdeapartamentos WHERE id_apartamento = ?', [id_apartamento], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    });
  });

  // DELETE An Employee
router.delete('/categoria:id_apartamento', (req, res) => {
  const { id_apartamento } = req.params;
  mysqlConnection.query('DELETE FROM categoriasdeapartamentos WHERE id_apartamento = ?', [id_apartamento], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'categoriasdeapartamentos Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT 
router.post('/categoria', (req, res) => {
  const {id_apartamento, nombre_de_apartamento, precio_de_apartamento, categoriadeapartamentos_id_Categoria} = req.body;
  console.log(id_apartamento, nombre_de_apartamento, precio_de_apartamento, categoriadeapartamentos_id_Categoria);
  const query = `
    SET @id_apartamento = ?;
    SET @nombre_de_apartamento = ?;
    SET @precio_de_apartamento =?;
    SET @categoriadeapartamentos_id_Categoria = ?;
    CALL categoriasdeapartamentosAddOrEdit(@id_apartamento, @nombre_de_apartamento, @precio_de_apartamento, @categoriadeapartamentos_id_Categoria );
  `;
  mysqlConnection.query(query, [id_apartamento, nombre_de_apartamento, precio_de_apartamento, categoriadeapartamentos_id_Categoria], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'categoriasdeapartamentos Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/categoria:id_apartamento', (req, res) => {
  const {id_apartamento, nombre_de_apartamento, precio_de_apartamento, categoriadeapartamentos_id_Categoria } = req.body;
  const { id } = req.params;
  const query = `
  SET @id_apartamento = ?;
  SET @nombre_de_apartamento = ?;
  SET @precio_de_apartamento =?;
  SET @categoriadeapartamentos_id_Categoria = ?;
  CALL categoriasdeapartamentosAddOrEdit(@id_apartamento, @nombre_de_apartamento, @precio_de_apartamento, @categoriadeapartamentos_id_Categoria );
`;
  mysqlConnection.query(query, [id_apartamento, nombre_de_apartamento, precio_de_apartamento, categoriadeapartamentos_id_Categoria], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'categoriasdepartamentos Updated'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;