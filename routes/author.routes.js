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
const Police = require("../middleware/Police");
const authorRolesPolice = require("../middleware/authorRolesPolice");

const router = Router();

router.get("/", Police, getAuthors);
router.post("/", createAuthor);
router.get(
  "/:id",
  authorRolesPolice(["READ", "WRITE", "CHANGE", "DELETE"]),
  getAuthorById
);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);
router.get("/name/:name", getAuthorByName);
router.post("/login", loginAuthor);
module.exports = router;
