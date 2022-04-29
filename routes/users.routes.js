const express = require('express');

//controllers
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');

//router
const router = express.Router();

//Funciones Verbo
router.get('/', getAllUsers);

router.post('/', createUser);

router.get('/:id', getUserById)
router.patch(':/id', updateUser)
router.delete(':/id', deleteUser)


//export default router es igual a:
module.exports = { usersRouter: router };
