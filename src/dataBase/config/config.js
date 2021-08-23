//require ('dotenv').config();

/*
DB_USER = 241116
DB_PASSWORD = alwaysdata2021
DB_NAME = lionelprats_proyecto_integrador_lio
DB_HOST = mysql-lionelprats.alwaysdata.net
DB_PORT = 3306
*/

module.exports = {
  /*
  "development": {
    "username": "241116",
    "password": "alwaysdata2021",
    "database": "lionelprats_proyecto_integrador_lio",
    "host": "mysql-lionelprats.alwaysdata.net",
    "dialect": "mysql",
    //"port": 3306
  },
  */
  
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql",
    //"port": 3306
  
  },
  
  "test": {
    "username": "241116",
    "password": "alwaysdata2021",
    "database": "lionelprats_proyecto_integrador_lio",
    "host": "mysql-lionelprats.alwaysdata.net",
    "dialect": "mysql",
    //"port": 3306
  },
  "production": {
    "username": "241116",
    "password": "alwaysdata2021",
    "database": "lionelprats_proyecto_integrador_lio",
    "host": "mysql-lionelprats.alwaysdata.net",
    "dialect": "mysql",
    //"port": 3306
  }
}

/*
DB_USER = 241116
DB_PASSWORD = alwaysdata2021
DB_NAME = lionelprats_proyecto_integrador_lio
DB_HOST = mysql-lionelprats.alwaysdata.net
DB_PORT = 3306
*/

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



// FUNIONA!!
/*
module.exports = {

  "development": {
    "username": "241116",
    "password": "alwaysdata2021",
    "database": "lionelprats_testing_proyecto_integrador_lio_testing",
    "host": "mysql-lionelprats.alwaysdata.net",
    "dialect": "mysql",
    "port": 3306
    
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "241116",
    "password": "alwaysdata2021",
    "database": "lionelprats_proyecto_integrador_lio",
    "host": "mysql-lionelprats.alwaysdata.net",
    "dialect": "mysql",
    "port": 3306
  }
}
*/

// TEST + PRODUCTION
/*
"development": {
  "test": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
},
"username": "241116",
  "password": "alwaysdata2021",
  "database": "lionelprats_testing_proyecto_integrador_lio_testing",
  "host": "mysql-lionelprats.alwaysdata.net",
  "dialect": "mysql",
  "port": 3306
},
"production": {
  "username": "241116",
  "password": "alwaysdata2021",
  "database": "lionelprats_proyecto_integrador_lio",
  "host": "mysql-lionelprats.alwaysdata.net",
  "dialect": "mysql",
  "port": 3306
}
}
*/

//lionelprats_proyecto_integrador_lio