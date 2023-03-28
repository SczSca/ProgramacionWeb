require('dotenv').config(); // para utilizar las variables de entorno
const mysql = require('mysql');//utiliza los paquetes de mysql nodejs
const connection = mysql.createConnection({ // se crea la conexion con las credenciales guardadas en las variables de entorno
    host    : process.env.DB_HOST,
    user    : process.env.DB_USER,
    password    : process.env.DB_PASSWORD,
    database    : process.env.DB_DATABASE,
    
});

module.exports = connection; //se exporta en formato CommonJS para poder utilizarlo en otros archivos