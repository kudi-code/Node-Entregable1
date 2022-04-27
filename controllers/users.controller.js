const { User } = require('../models/users.model');

const getAllUsers = async (req, res) => {
  //SELECT * FROM users
  try {
    const users = await User.findAll();
    res.status(201).json({
      users,
    });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    //INSERT INTO...
    const newUser = await User.create({ name, email, password, role });

    const users = await User.findAll();
    res.status(201).json({
      status: "done!",
      users
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  console.log("parching")

  try {
    const { id } = req.params; // {id} debe ser igual al parametro enviado por la URL
    //SELECT * FROM users WHERE id = ?

    const user = await User.findOne({ where: { id: id } });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'User not found given this ID',
      });
    }

    res.status(201).json({
      user,
    });
  } catch (error) {
    console.log(error);
    console.log("hola")
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // {id} debe ser igual al parametro enviado por la URL
    const { name } = req.body;

    //SELECT * FROM users WHERE id = ?

    const user = await User.findOne({ where: { id: id } });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'User not found given this ID',
      });
    }

    await user.update({ name: name });

    res.status(200).json({
      status: 'sucess',
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // {id} debe ser igual al parametro enviado por la URL
    //SELECT * FROM users WHERE id = ?

    const user = await User.findOne({ where: { id: id } });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'User not found given this ID',
      });
    }
    //DELETE FROM ...
    user.update({ status: 'deleted' });

    res.status(200).json({
      status: 'sucess',
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
