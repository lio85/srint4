require ('dotenv').config();

module.exports = {
  /* con esta configuracion estaba conectada a mi base local proyecto_integrador_lio
    "development": {
    "username": "root",
    "password": null,
    "database": "proyecto_integrador_lio",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },*/
  // con esta configuracion me conecte a mi base productiva en alwaysdata proyecto_integrador_lio (desde localhost 3000)
/*"development": {
  "username": "241116",
  "password": "alwaysdata2021",
  "database": "lionelprats_proyecto_integrador_lio",
  "host": "mysql-lionelprats.alwaysdata.net",
  "dialect": "mysql",
  "port": 3306
},*/
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "port": process.env.DB_PORT
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  /*
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  */
 
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}


