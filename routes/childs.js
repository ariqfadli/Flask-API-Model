const ChildsController = require('../controllers/users');
const express = require('express');

const router = express.Router();

// RETRIEVE USERS DATA
router.get('/', ChildsController.getAllChilds);

// CREATE NEW USER
router.post('/', ChildsController.createNewChild);

// GET USER BY ID
router.get('/:id', ChildsController.getChildByID);

// UPDATE USER
router.put('/:id', ChildsController.updateChild);

// DELETE USER
router.delete('/:id', ChildsController.deleteChild)


module.exports = router;