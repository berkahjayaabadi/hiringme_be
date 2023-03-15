require("dotenv").config({ path: "../../.env" });
const { Client } = require("pg");

const db = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB_NAME,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (!err) {
    console.log("database aman");
  } else {
    console.log("db conection eror");
  }
});
module.exports = db;
