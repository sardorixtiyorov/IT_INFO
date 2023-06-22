const { Router } = require("express");
const {
  getAuthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  getAuthorByName,
  loginAuthor,
  logoutAuthor,
  refreshAuthorToken,
  authorActivate,
} = require("../controllers/author.controller");
const Police = require("../middleware/Police");
const Validator = require("../middleware/validator");
const authorRolesPolice = require("../middleware/authorRolesPolice");

const router = Router();

router.get("/", Police, getAuthors);
router.post("/", Validator("author"), createAuthor);
router.get(
  "/:id",
  authorRolesPolice(["READ", "WRITE", "CHANGE", "DELETE"]),
  getAuthorById
);
router.put("/:id", Police,Validator("author"), updateAuthor);
router.delete("/:id", Police, deleteAuthor);
router.get("/name/:name", getAuthorByName);
router.post("/login", Validator("author_email_pass"), loginAuthor);
router.post("/logout", logoutAuthor);
router.post("/refresh", refreshAuthorToken);
router.get("/activate/:link", authorActivate);

module.exports = router;
