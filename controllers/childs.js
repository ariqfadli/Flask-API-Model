const ChildsModel = require('../models/childs');

const getAllChilds = async (req, res) => {
  try {
    const [data] = await ChildsModel.getAllChilds();

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

const getChildByID = async (req, res) => {
  try {
    const { id: idChild } = req.params;

    const [data] = await ChildsModel.getChildByID(parseInt(idChild));

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

const createNewChild = async (req, res) => {
  const { body } = req;

  try {
    if (!body.fullName || !body.email || !body.password) {
      return res.status(400).json({
        message: "Bad request",
        data: null
      });
    };

    await ChildsModel.createNewChild(body);

    res
      .status(201)
      .json({ message: "Child data successfully created", data: body });

    console.log(req.body);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Failed" });
  };
};

const updateChild = async (req, res) => {
  const { id: idChild } = req.params;
  const { body } = req;

  try {
    // Check for user
    const [existingUser] = await ChildsModel.getChildByID(idChild);

    if (existingUser.length === 0) res.status(404).json({ message: "Child data not found" });

    await ChildsModel.updateUser(body, idChild);

    res.status(200).json({
      message: "Child data successfully updated",
      data: { idChild, ...body }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed" });
  };
};

const deleteChild = async (req, res) => {
  const { id: idChild } = req.params;

  try {
    const [existingChild] = await ChildsModel.getUserByID(idChild);

    if (existingChild.length === 0) res.status(404).json({ message: "Child not found" });

    await ChildsModel.deleteChild(idChild);

    res.status(200).json({
      message: "Child data successfully deleted",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed" });
  };
};


module.exports = {
  getAllChilds,
  getChildByID,
  createNewChild,
  updateChild,
  deleteChild
};