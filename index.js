const express = require('express');
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Routes
app.use(require('./routes/tipodeapartamento'));
app.use(require('./routes/montodepago'));
app.use(require('./routes/inquilino'));
app.use(require('./routes/categoriasdepartamentos'));
app.use(require('./routes/login'));


// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
}); 