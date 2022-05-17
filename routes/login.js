const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database');

router.get('/login', (req, res) => {
    mysqlConnection.query('SELECT * FROM login', (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err); 
      }
    });  
  });

  router.get('/login:id', (req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM login WHERE usuario = ?', [usuario], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    });
  });

  // DELETE An Employee
router.delete('/login:usuario', (req, res) => {
  const { usuario } = req.params;
  mysqlConnection.query('DELETE FROM login WHERE usuario = ?', [usuario], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'login Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An Employee
router.post('/login', (req, res) => {
  const {usuario, contraseña} = req.body;
  console.log(usuario, contraseña);
  const query = `
    SET @usuario = ?;
    SET @contraseña = ?;
    CALL employeeAddOrEdit(@usuario, @contraseña);
  `;
  mysqlConnection.query(query, [usuario, contraseña], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'login Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/login:usuario', (req, res) => {
  const {usuario, contraseña } = req.body;
  const { id } = req.params;
  const query = `
  SET @usuario = ?;
  SET @contraseña = ?;
  CALL employeeAddOrEdit(@usuario, @contraseña);
`;
  mysqlConnection.query(query, [usuario, contraseña], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'loginUpdated'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;