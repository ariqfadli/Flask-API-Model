const dbPool = require('../config/database');

const getAllUsers = () => {
  const SQLQuery = `SELECT * FROM users`;

  return dbPool.execute(SQLQuery);
};

const getUserByID = idParam => {
  const SQLQuery = `SELECT * FROM users WHERE UserID LIKE ${idParam}`;

  return dbPool.execute(SQLQuery);
};

const createNewUser = body => {
  const { id, fullName, email, password } = body;

  const SQLQuery = `INSERT INTO users VALUES (${Number(id)}, '${fullName}', '${email}', '${password}')`;

  return dbPool.execute(SQLQuery);
};

const updateUser = ({ fullName, email, password }, idParam) => {
  const SQLQuery = `
    UPDATE users
    SET
      FullName = IFNULL(${!fullName ? null : `'${fullName}'`}, FullName),
      Email = IFNULL(${!email ? null : `'${email}'`}, Email),
      \`Password\` = IFNULL(${!password ? null : `'${password}'`}, \`Password\`)
    WHERE UserID LIKE ${parseInt(idParam)}
  `;

  return dbPool.execute(SQLQuery);
};

const deleteUser = idParam => {
  const SQLQuery = `
    DELETE FROM users
    WHERE UserID LIKE ${parseInt(idParam)}
  `;

  return dbPool.execute(SQLQuery);
};


module.exports = {
  getAllUsers,
  getUserByID,
  createNewUser,
  updateUser,
  deleteUser
};