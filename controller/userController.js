const User = require('../models/userModel');

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: { users },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed!',
      message: error,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: 'user found!',
      data: { user },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed!',
      message: error,
    });
  }
};

exports.createUser = async (req, res) => {
  console.log(req.body);
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'new user added',
      data: { newUser },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed!',
      message: error,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: 'user data updated', data: { user } });
  } catch (error) {
    res.status(400).json({
      status: 'Failed!',
      message: error,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res
      .status(204)
      .json({ status: 'successfully deleted', data: { user: null } });
  } catch (error) {
    res.status(400).json({
      status: 'Failed!',
      message: error,
    });
  }
};
