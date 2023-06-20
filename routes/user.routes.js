const { Router } = require("express");
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserByName,
  loginUser,
  logoutUser,
} = require("../controllers/user.controller");

const Validator = require("../middleware/validator");

const router = Router();

router.get("/", getUsers);
router.post("/", Validator("user"), createUser);
router.get("/:id", getUserById);
router.put("/:id", Validator("user"), updateUser);
router.delete("/:id", deleteUser);
router.get("/name/:name", getUserByName);
router.post("/login", Validator("user_email_pass"), loginUser);
router.post("/logout", logoutUser);

module.exports = router;
