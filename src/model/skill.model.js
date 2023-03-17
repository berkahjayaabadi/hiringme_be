const db = require("../helper/connection");
const { v4: uuidv4 } = require("uuid");
const skillModel = {
  add: ({ userId, skillName }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO skill (id, user_id, skill_name) VALUES ('${uuidv4()}','${userId}','${skillName}') RETURNING *`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve(result.rows[0]);
          }
        }
      );
    });
  },
  getByUserId: (userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM skill WHERE user_id='${userId}'`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve(result.rows);
          }
        }
      );
    });
  },

  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE from skill WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve("success delete");
        }
      });
    });
  },
};

module.exports = skillModel;
