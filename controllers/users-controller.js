const User = require(`../models/UserModel`);
const CustomError = require(`../errors`);
const { StatusCodes } = require(`http-status-codes`);
const checkPermissions = require(`../utils/checkPermissions`);

// JOIN WAITLIST
const joinWaitlist = async (req, res) => {
  const waitlistUser = await User.create(req.body);
  res.status(StatusCodes.CREATED).json(waitlistUser);
};

// GET ALL USERS (ADMIN)
const getAllUsers = async (req, res) => {
  const users = await User.find().select(`-password`);
  res.status(StatusCodes.OK).json({ users, count: users.length });
};

// GET SINGLE USER  (ADMIN)
const getSingleUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id }).select(`-password`);
  if (!user) {
    throw new CustomError.NotFoundError(`User with id:${id} not found`);
  }
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json(user);
};

// DELETE SINGLE USER
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new CustomError.NotFoundError(`User with id:${id} not found`);
  }
  await User.findOneAndDelete({ _id: id });
  res.status(StatusCodes.OK).json({ msg: `User successfully deleted` });
};

module.exports = {
  joinWaitlist,
  getAllUsers,
  getSingleUser,
  deleteUser,
};
