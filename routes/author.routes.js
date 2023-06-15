const { Router } = require("express");
const {
  getAuthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  getAuthorByName,
  loginAuthor,
} = require("../controllers/author.controller");

const router = Router();

router.get("/", getAuthors);
router.post("/", createAuthor);
router.get("/:id", getAuthorById);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);
router.get("/name/:name", getAuthorByName);
router.post("/login", loginAuthor);
module.exports = router;
