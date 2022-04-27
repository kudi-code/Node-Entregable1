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

router.route(`/id`).get(getUserById).patch(updateUser).delete(deleteUser);

//export default router es igual a:
module.exports = { usersRouter: router };
