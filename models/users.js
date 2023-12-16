const dbPool = require('../config/database');

const getAllUsers = () => {
  const SQLQuery = `SELECT * FROM users`;

  return dbPool.execute(SQLQuery);
};

const getUserByID = idUser => {
  const SQLQuery = `SELECT * FROM users WHERE UserID LIKE ${idUser}`;

  return dbPool.execute(SQLQuery);
};

const createNewUser = body => {
  const { id, fullName, email, password } = body;

  const SQLQuery = `INSERT INTO users VALUES (${Number(id)}, '${fullName}', '${email}', '${password}')`;

  return dbPool.execute(SQLQuery);
};

const updateUser = ({ fullName, email, password }, idUser) => {
  const SQLQuery = `
    UPDATE users
    SET fullName = "${fullName}", email = "${email}", password = "${password}"
    WHERE UserID LIKE ${parseInt(idUser)}
  `;

  return dbPool.execute(SQLQuery);
};

const deleteUser = idUser => {
  const SQLQuery = `
    DELETE FROM users
    WHERE UserID LIKE ${parseInt(idUser)}
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