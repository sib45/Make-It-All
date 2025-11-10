//NOTE: Files mentioned below contain fake information, real credentials
//will be hidden on university server

//mysql import is required here
const mysql = require('mysql2/promise');
const path = require('path');

//Manual switch between test and prod config
const configFile = 'test_config.json';
//const configFile = 'prod_config.json';

const configPath = path.join(__dirname, configFile);

//DO NOT LOG "cfg" OR "pool" (Contains sensitive information)
const cfg = require(configPath);

//Creates the connection pool using the chosen config file
const pool = mysql.createPool({
    ...cfg,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: false, //Disabled or else server connection fails
});

//Deletes sensitive info from the cfg object
delete cfg.username, cfg.password, cfg.database, cfg.host;

module.exports = pool;