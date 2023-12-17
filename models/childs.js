const dbPool = require('../config/database');

const getAllChilds = () => {
  const SQLQuery = `SELECT * FROM childs`;

  return dbPool.execute(SQLQuery);
};

const getChildByID = idParam => {
  const SQLQuery = `SELECT * FROM childs WHERE ChildID LIKE ${idParam}`;

  return dbPool.execute(SQLQuery);
};

const createNewChild = body => {
  const { childId, parentId, fullName, dateOfBirth, height, weight, gender, headCircumference } = body;

  const SQLQuery = `INSERT INTO childs VALUES (${parseInt(childId)}, '${parentId}', '${fullName}', '${dateOfBirth}', ${parseFloat(height)}, ${parseFloat(weight)}, '${gender}', '${parseInt(headCircumference)}')`;

  return dbPool.execute(SQLQuery);
};

const updateChild = ({ childId, parentId, fullName, dateOfBirth, height, weight, gender, headCircumference }, idParam) => {
  const SQLQuery = `
    UPDATE childs
    SET
      ChildID = IFNULL(${!childId ? null : `'${childId}'`}),
      ParentID = IFNULL(${!parentId ? null : `'${parentId}'`}),
      ChildName = IFNULL(${!fullName ? null : `'${fullName}'`}),
      DateofBirth = IFNULL(${!dateOfBirth ? null : `'${dateOfBirth}'`}),
      Height = IFNULL(${!height ? null : `'${height}'`}),
      Weight = IFNULL(${!weight ? null : `'${weight}'`}),
      Gender = IFNULL(${!gender ? null : `'${gender}'`}),
      HeadCircumference = IFNULL(${!headCircumference ? null : `'${headCircumference}'`})
    WHERE ChildID LIKE ${parseInt(idParam)}
  `;

  return dbPool.execute(SQLQuery);
};

const deleteChild = idParam => {
  const SQLQuery = `
    DELETE FROM childs
    WHERE ChildID LIKE ${parseInt(idParam)}
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