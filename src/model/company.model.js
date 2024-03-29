const db = require("../helper/connection");
const { v4: uuidv4 } = require("uuid");
const companyModel = {
  query: (search, companySector, sortBy, limit, offset) => {
    let orderQuery = `ORDER BY company_sector ${sortBy} LIMIT ${limit} OFFSET ${offset}`;

    if (!search && !companySector) {
      return orderQuery;
    } else if (search && companySector) {
      return `WHERE company_sector LIKE '%${search}%' AND company_sector LIKE '${companySector}%' ${orderQuery}`;
    } else if (search || companySector) {
      return `WHERE company_sector  LIKE '%${search}%' OR company_sector LIKE '${companySector}%' ${orderQuery}`;
    } else {
      return orderQuery;
    }
  },

  get: function (
    search,
    companySector,
    sortBy = "ASC",
    limit = 20,
    offset = 0
  ) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * from users_company ${this.query(
          search,
          companySector,
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
  getDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * from users_company WHERE id='${id}'`,
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
  update: ({
    id,
    fullname,
    email,
    companyName,
    companySector,
    phone,
    password,
    address,
    image,
    instagram,
    linkedin,
    bio,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users_company WHERE id='${id}'`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            db.query(
              `UPDATE users_company SET name='${
                fullname || result.rows[0].fullname
              }', email ='${email || result.rows[0].email}', company_name ='${
                companyName || result.rows[0].companyName
              }',company_sector ='${
                companySector || result.rows[0].companySector
              }',phone ='${phone || result.rows[0].phone}', password ='${
                password || result.rows[0].password
              }',  address ='${address || result.rows[0].address}',  image ='${
                image || result.rows[0].image
              }', instagram ='${
                instagram || result.rows[0].instagram
              }', linkedin ='${linkedin || result.rows[0].linkedin}',  bio ='${
                bio || result.rows[0].bio
              }' WHERE id='${id}'`,
              (err, result) => {
                if (err) {
                  return reject(err.message);
                } else {
                  return resolve({
                    id,
                    fullname,
                    email,
                    companyName,
                    companySector,
                    phone,
                    password,
                    address,
                    image,
                    instagram,
                    linkedin,
                    bio,
                  });
                }
              }
            );
          }
        }
      );
    });
  },

  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE from users_company WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve("success delete");
        }
      });
    });
  },
};

module.exports = companyModel;
