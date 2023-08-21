const Admin = require(`../models/AdminModel`);
const { StatusCodes } = require(`http-status-codes`);
const CustomError = require(`../errors`);
const { createJWT } = require('../utils/jwt');

// REGISTER ADMIN
const registerAdmin = async (req, res) => {
  const admin = await Admin.create(req.body);
  const tokenUser = {
    adminId: admin._id,
    email: admin.email,
    role: admin.role,
  };
  const token = createJWT(tokenUser);
  res.status(StatusCodes.CREATED).json({ ...tokenUser, token });
};

// LOGIN ADMIN
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError(`Please provide email and password`);
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new CustomError.UnauthenticatedError(`Email not registered`);
  }

  const isPasswordCorrect = await admin.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError(`Incorrect Password`);
  }
  const tokenUser = {
    admniId: admin._id,
    email: admin.email,
    role: admin.role,
  };
  const token = createJWT(tokenUser);
  res.status(StatusCodes.OK).json({ ...tokenUser, token });
};

module.exports = { registerAdmin, loginAdmin };
