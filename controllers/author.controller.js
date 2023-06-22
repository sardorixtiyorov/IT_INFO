const errorHandler = require("../helpers/error_handler");
const { default: mongoose } = require("mongoose");
const Author = require("../models/Author");
const { authorValidation } = require("../validations/author.validation");
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");
const uuid = require("uuid");
const mailService = require("../services/MailService");

const myJwt = require("../services/JwtService");

// const generateAccessToken = (id, is_expert, authorRoles) => {
//   const payload = {
//     id,
//     is_expert,
//     authorRoles,
//   };
//   return jwt.sign(payload, config.get("secret"), { expiresIn: "1h" });
// };

const createAuthor = async (req, res) => {
  try {
    const { error, value } = authorValidation(req.body);
    if (error) {
      return errorHandler(res, error.details[0].message);
    }
    const {
      author_first_name,
      author_last_name,
      author_nick_name,
      author_email,
      author_phone,
      author_password,
      author_info,
      author_position,
      author_photo,
      is_expert,
    } = value;
    const author = await Author.findOne({ author_email });
    if (author) {
      return res.status(400).json({ message: "Author already exists" });
    }
    const hashedPassword = await bcrypt.hash(author_password, 7);
    const author_activation_link = uuid.v4();

    const newAuthor = new Author({
      author_first_name,
      author_last_name,
      author_nick_name,
      author_email,
      author_phone,
      author_password: hashedPassword,
      author_info,
      author_position,
      author_photo,
      is_expert,
      author_activation_link,
    });
    await newAuthor.save();
    await mailService.sendActivationMail(
      author_email,
      `${config.get("api_url")}/api/author/activate/${author_activation_link}`
    );
    const payload = {
      id: newAuthor._id,
      is_expert: newAuthor.is_expert,
      authorRoles: ["READ", "WRITE"],
      author_is_active: newAuthor.author_is_active,
    };
    const tokens = myJwt.generateTokens(payload);
    newAuthor.author_token = tokens.refreshToken;
    await newAuthor.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });

    res.status(201).json({ ...tokens, author: payload });
  } catch (error) {
    errorHandler(res, error);
  }
};

const authorActivate = async (req, res) => {
  try {
    const author = await Author.findOne({
      author_activation_link: req.params.link,
    });
    if (!author) {
      return res.status(400).send({ message: "This author not found" });
    }
    if (author.author_is_active) {
      return res.status(400).send({ message: "user already activated" });
    }
    author.author_is_active = true;
    await author.save();
    res.status(200).send({
      author_is_active: author.author_is_active,
      message: "user activated",
    });
  } catch (error) {
    errorHandler(res, error);
  }
};
const loginAuthor = async (req, res) => {
  try {
    const { author_email, author_password } = req.body;
    const author = await Author.findOne({ author_email });
    if (!author)
      return res.status(400).send({ message: "Email or password incorrect" });
    const validPassword = await bcrypt.compare(
      author_password, //frontdan kelgan ochiq password
      author.author_password //bazadan olingan heshlangan password
    );
    if (!validPassword)
      return res.status(400).send({ message: "Email or password incorrect" });
    const payload = {
      id: author._id,
      is_expert: author.is_expert,
      authorRoles: ["READ", "WRITE"],
    };
    const tokens = myJwt.generateTokens(payload);
    console.log(tokens);
    author.author_token = tokens.refreshToken;
    await author.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });

    // try {
    //   setTimeout(function () {
    //     var error = new Error("Hello");
    //     throw error;
    //   }, 1000);
    // } catch (error) {
    //   console.log(error);
    // } //uncaughtException

    // new Promise((_, reject) => reject(new Error("OOPS"))); //unhandledReject

    // const token = generateAccessToken(author.id, author.is_expert, [
    //   "READ",
    //   "WRITE",
    // ]);

    res.status(200).send({ ...tokens });
  } catch (error) {
    errorHandler(res, error);
  }
};

const logoutAuthor = async (req, res) => {
  const { refreshToken } = req.cookies;
  let author;
  if (!refreshToken) {
    return res.status(400).send({ message: "No token found" });
  }
  author = await Author.findOneAndUpdate(
    { author_token: refreshToken },
    { author_token: "" },
    { new: true }
  );
  if (!author) return res.status(400).send({ message: "No token found" });
  res.clearCookie("refreshToken");
  res.status(200).send({ author });
};

const refreshAuthorToken = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.status(400).send({ message: "No token found" });

  const authorDataFromCookie = await myJwt.verifyRefresh(refreshToken);

  const authoDataFromDB = await Author.findOne({ author_token: refreshToken });

  if (!authoDataFromDB || !authorDataFromCookie) {
    return res.status(400).send({ message: "Author is not registered" });
  }
  const author = await Author.findById(authorDataFromCookie.id);
  if (!author) return res.status(400).send({ message: "Invalid Id" });
  const payload = {
    id: author._id,
    is_expert: author.is_expert,
    authorRoles: ["READ", "WRITE"],
  };
  const tokens = myJwt.generateTokens(payload);
  author.author_token = tokens.refreshToken;
  await author.save();
  res.cookie("refreshToken", tokens.refreshToken, {
    maxAge: config.get("refresh_ms"),
    httpOnly: true,
  });
  res.status(200).send({ ...tokens });
};

const getAuthors = async (req, res) => {
  try {
    const author = await Author.find();
    if (!author) {
      return res.status(404).json({ message: "No author found" });
    }
    res.status(200).json(author);
  } catch (error) {
    errorHandler(res, error);
  }
};
const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Invalid  id",
      });
    }
    const author = await Author.findById(id);
    if (!author) {
      return res.status(404).json({ message: "No author found" });
    }
    res.status(200).json(author);
  } catch (error) {
    errorHandler(res, error);
  }
};
const getAuthorByName = async (req, res) => {
  try {
    const { name } = req.params;
    if (!mongoose.isValidObjectId(req.params.name)) {
      return res.status(400).send({
        message: "Invalid  id",
      });
    }

    const author = await Author.find({
      author_first_name: { $regex: name, $options: "i" },
    });
    if (!author) {
      return res.status(404).json({ message: "No author found" });
    }
    res.status(200).json(author);
  } catch (error) {
    errorHandler(res, error);
  }
};
const updateAuthor = async (req, res) => {
  try {
    const { error } = authorValidation(req.body);
    if (error) return errorHandler(res, error.details[0].message);

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Invalid  id",
      });
    }
    const { id } = req.params;
    const {
      author_first_name,
      author_last_name,
      author_nick_name,
      author_email,
      author_phone,
      author_password,
      author_info,
      author_position,
      author_photo,
      is_expert,
    } = req.body;
    const author = await Author.findByIdAndUpdate(
      id,
      {
        author_first_name,
        author_last_name,
        author_nick_name,
        author_email,
        author_phone,
        author_password,
        author_info,
        author_position,
        author_photo,
        is_expert,
      },
      { new: true }
    );
    if (!author) {
      return res.status(404).json({ message: "No author found" });
    }
    author.save();
    res.status(200).json({ message: "author updated successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const id = req.params.id;
    if (id !== req.author.id) {
      return res.status(401).send({
        message: "You are not authorized to perform this action",
      });
    }
    const result = await Author.findOne({ _id: id });
    if ((result = null)) {
      return res.status(400).send({ message: "Id is Incorrect" });
    }
    await Author.findByIdAndDelete(id);

    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    errorHandler(res, error);
  }
};
module.exports = {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  getAuthorByName,
  loginAuthor,
  logoutAuthor,
  refreshAuthorToken,
  authorActivate,
};
