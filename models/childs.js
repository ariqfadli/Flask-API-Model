const dbPool = require('../config/database');

const getAllChilds = () => {
  const SQLQuery = `SELECT * FROM childs`;

  return dbPool.execute(SQLQuery);
};

const getChildByID = idUser => {
  const SQLQuery = `SELECT * FROM childs WHERE ChildID LIKE ${idUser}`;

  return dbPool.execute(SQLQuery);
};

const createNewChild = body => {
  const { childId, parentId, fullName, dateOfBirth, height, weight, gender, headCircumference } = body;

  const SQLQuery = `INSERT INTO childs VALUES (${Number(childId)}, '${parentId}', '${fullName}', '${dateOfBirth}', '${height}', '${weight}', '${gender}', '${headCircumference}')`;

  return dbPool.execute(SQLQuery);
};

const updateChild = ({ fullName, email, password }, idUser) => {
  const SQLQuery = `
    UPDATE childs
    SET fullName = "${fullName}", email = "${email}", password = "${password}"
    WHERE UserID LIKE ${parseInt(idUser)}
  `;

  return dbPool.execute(SQLQuery);
};

const deleteUser = idUser => {
  const SQLQuery = `
    DELETE FROM childs
    WHERE UserID LIKE ${parseInt(idUser)}
  `;

  return dbPool.execute(SQLQuery);
};


module.exports = {
  getAllChilds,
  getChildByID,
  createNewChild,
  updateChild,
  deleteChild
};