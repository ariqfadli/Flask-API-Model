const UsersModel = require('../models/users');

const getAllUsers = async (req, res) => {
  try {
    const [data] = await UsersModel.getAllUsers();

    res
      .status(200)
      .json({ message: "Success", data: data });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Failed" });
  };
};

const getUserByID = async (req, res) => {
  try {
    const { id: idUser } = req.params;

    const [data] = await UsersModel.getUserByID(parseInt(idUser));

    res
      .status(200)
      .json({ message: "Success", data: data });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Failed" });
  };
};

const createNewUser = async (req, res) => {
  const { body } = req;

  try {
    if (!body.fullName || !body.email || !body.password) {
      return res.status(400).json({
        message: "Bad request",
        data: null
      });
    };

    await UsersModel.createNewUser(body);

    res
      .status(201)
      .json({ message: "User data successfully created", data: body });

    console.log(req.body);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Failed" });
  };
};

const updateUser = async (req, res) => {
  const { id: idUser } = req.params;
  const { body } = req;
  console.log(body);

  try {
    // Check for user
    const [existingUser] = await UsersModel.getUserByID(idUser);

    if (existingUser.length === 0) res.status(404).json({ message: "User not found" });

    await UsersModel.updateUser(body, idUser);

    res
      .status(200)
      .json({
        message: "User data successfully updated",
        data: { idUser, ...body }
      });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Failed" });
  };
};

const deleteUser = async (req, res) => {
  const { id: idUser } = req.params;

  try {
    const [existingUser] = await UsersModel.getUserByID(idUser);

    if (existingUser.length === 0) res.status(404).json({ message: "User not found" });

    await UsersModel.deleteUser(idUser);

    res
      .status(200)
      .json({
        message: "User data successfully deleted",
      });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Failed" });
  };
};


module.exports = {
  getAllUsers,
  getUserByID,
  createNewUser,
  updateUser,
  deleteUser
};