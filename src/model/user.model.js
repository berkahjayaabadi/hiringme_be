const db = require("../helper/connection");
const { v4: uuidv4 } = require("uuid");
const userModel = {
  query: (search, jobType, sortBy, limit, offset) => {
    let orderQuery = `ORDER BY job_type ${sortBy} LIMIT ${limit} OFFSET ${offset}`;

    if (!search && !jobType) {
      return orderQuery;
    } else if (search && jobType) {
      return `WHERE job_type LIKE '%${search}%' AND job_type LIKE '${jobType}%' ${orderQuery}`;
    } else if (search || jobType) {
      return `WHERE job_type LIKE '%${search}%' OR job_type LIKE '${jobType}%' ${orderQuery}`;
    } else {
      return orderQuery;
    }
  },

  get: function (search, jobType, sortBy = "ASC", limit = 20, offset = 0) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * from users_worker ${this.query(
          search,
          jobType,
          sortBy,
          limit,
          offset
        )}`,
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
  // getDetail: (id) => {
  //   return new Promise((resolve, reject) => {
  //     db.query(`SELECT * from users_worker WHERE id='${id}'`, (err, result) => {
  //       if (err) {
  //         return reject(err.message);
  //       } else {
  //         return resolve(result.rows[0]);
  //       }
  //     });
  //   });
  // },
  getDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * from users_worker WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          const user = result.rows[0];
          db.query(
            `SELECT * from skill WHERE user_id = '${id}'`,
            (err, result) => {
              if (err) {
                return reject(err.message);
              } else {
                user.skills = result.rows;
                return resolve(user);
              }
            }
          );
        }
      });
    });
  },
  update: ({
    id,
    fullname,
    email,
    phone,
    jobType,
    address,
    file,
    instagram,
    github,
    gitlab,
    bio,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users_worker WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          db.query(
            UPDATE users_worker SET name='${
              fullname || result.rows[0].fullname
            }', email ='${email || result.rows[0].email}', phone ='${
              phone || result.rows[0].phone
            }',  job_type ='${jobType || result.rows[0].jobType}', address ='${
              address || result.rows[0].address
            }',  image ='${file ? file.path : result.rows[0].image}', instagram ='${
              instagram || result.rows[0].instagram
            }', github ='${github || result.rows[0].github}', gitlab ='${
              gitlab || result.rows[0].gitlab
            }', bio ='${bio || result.rows[0].bio}' WHERE id='${id}',
            (err, result) => {
              if (err) {
                return reject(err.message);
              } else {
                return resolve({
                  id,
                  fullname,
                  email,
                  phone,
                  jobType,
                  address,
                  image :file,
                  instagram,
                  github,
                  gitlab,
                  bio,
                });
              }
            }
          );
        }
      });
    });
  },

  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE from users_worker WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve("success delete");
        }
      });
    });
  },
};

module.exports = userModel;
