const { Router } = require("express");
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserByName,
  loginUser,
} = require("../controllers/user.controller");

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/name/:name", getUserByName);
router.post("/login", loginUser);

module.exports = router;
