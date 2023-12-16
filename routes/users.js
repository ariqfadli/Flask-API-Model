const UsersController = require('../controllers/users');
const express = require('express');

const router = express.Router();

// RETRIEVE USERS DATA
router.get('/', UsersController.getAllUsers);

// CREATE NEW USER
router.post('/', UsersController.createNewUser);

// GET USER BY ID
router.get('/:id', UsersController.getUserByID);

// UPDATE USER
router.put('/:id', UsersController.updateUser);

// DELETE USER
router.delete('/:id', UsersController.deleteUser)


module.exports = router;