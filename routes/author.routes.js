const { Router } = require("express");
const {
  getAuthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  getAuthorByName,
} = require("../controllers/author.controller");

const router = Router();

router.get("/", getAuthors);
router.post("/", createAuthor);
router.get("/:id", getAuthorById);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);
router.get("/name/:name", getAuthorByName);
module.exports = router;
