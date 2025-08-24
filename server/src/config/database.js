import mysql from'mysql2/promise'


const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test_db',
};

// Create a db pool
const pool = mysql.createPool(dbConfig);

export {
  pool,
};