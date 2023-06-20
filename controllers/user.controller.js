const errorHandler = require("../helpers/error_handler");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");
const { userValidation } = require("../validations/user.validation");

const bcrypt = require("bcrypt");
const config = require("config");
const myJwt = require("../services/JwtService");

const createUser = async (req, res) => {
  try {
    const { error } = userValidation(req.body);
    if (error) return errorHandler(res, error.details[0].message);

    const {
      user_name,
      user_email,
      user_password,
      user_info,
      user_photo,
      user_is_active,
    } = req.body;
    const user = await User.findOne({
      user_name: { $regex: user_name, $options: "i" },
    });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(user_password, 7);
    const newUser = new User({
      user_name,
      user_email,
      user_password: hashedPassword,
      user_info,
      user_photo,
      user_is_active,
    });
    newUser.save();

    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json(users);
  } catch (error) {
    errorHandler(res, error);
  }
};
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Invalid  id",
      });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json(user);
  } catch (error) {
    errorHandler(res, error);
  }
};
const getUserByName = async (req, res) => {
  try {
    const { name } = req.params;
    if (!mongoose.isValidObjectId(req.params.name)) {
      return res.status(400).send({
        message: "Invalid  id",
      });
    }

    const user = await User.find({
      user_name: { $regex: name, $options: "i" },
    }).populate("parent_user_id");
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json(user);
  } catch (error) {
    errorHandler(res, error);
  }
};
const loginUser = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    const user = await Admin.findOne({ user_email });
    if (!user)
      return res.status(400).send({ message: "Email or password incorrect" });
    const validPassword = await bcrypt.compare(
      user_password,
      user.user_password
    );
    if (!validPassword)
      return res.status(400).send({ message: "Email or password incorrect" });
    const payload = {
      id: user._id,
      userRoles: ["WRITE"],
    };
    const tokens = myJwt.generateTokens(payload);
    console.log(tokens);
    user.user_token = tokens.refreshToken;
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });
    res.status(200).send({ ...tokens });
  } catch (error) {
    errorHandler(res, error);
  }
};
const logoutUser = async (req, res) => {
  const { refreshToken } = req.cookies;
  let user;
  if (!refreshToken) {
    return res.status(400).send({ message: "No token found" });
  }
  user = await Admin.findOneAndUpdate(
    { user_token: refreshToken },
    { user_token: "" },
    { new: true }
  );
  if (!user) return res.status(400).send({ message: "No token found" });
  res.clearCookie("refreshToken");
  res.status(200).send({ user });
};
const refreshUserToken = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.status(400).send({ message: "No token found" });

  const userDataFromCookie = await myJwt.verifyRefresh(refreshToken);

  const authoDataFromDB = await User.findOne({ user_token: refreshToken });

  if (!authoDataFromDB || !userDataFromCookie) {
    return res.status(400).send({ message: "User is not registered" });
  }
  const user = await User.findById(userDataFromCookie.id);
  if (!user) return res.status(400).send({ message: "Invalid Id" });
  const payload = {
    id: user._id,
    userRoles: ["READ"],
  };
  const tokens = myJwt.generateTokens(payload);
  user.user_token = tokens.refreshToken;
  await user.save();
  res.cookie("refreshToken", tokens.refreshToken, {
    maxAge: config.get("refresh_ms"),
    httpOnly: true,
  });
  res.status(200).send({ ...tokens });
};

const updateUser = async (req, res) => {
  try {
    const { error } = userValidation(req.body);
    if (error) return errorHandler(res, error.details[0].message);

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Invalid  id",
      });
    }
    const { id } = req.params;
    const {
      user_name,
      user_email,
      user_password,
      user_info,
      user_photo,
      user_is_active,
    } = req.body;
    const user = await User.findByIdAndUpdate(id, {
      user_name,
      user_email,
      user_password,
      user_info,
      user_photo,
      user_is_active,
    });
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Invalid  id",
      });
    }
    const { id } = req.params;
    const dict = await User.findByIdAndDelete(id);
    if (!dict) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    errorHandler(res, error);
  }
};
module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByName,
  loginUser,
  logoutUser,
  refreshUserToken
};
