const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { mongoose } = require('./database');
const app = express();

//Configuración
app.set('port', process.env.PORT || 4000); 

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
//Rutas
app.use('/api',require('./routes/task.routes'));

//Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
//Inicio servidor

app.listen(app.get('port'), ()=>{
    console.log(`Conexión establecida con el servidor a través del puerto ${app.get('port')}`);
});