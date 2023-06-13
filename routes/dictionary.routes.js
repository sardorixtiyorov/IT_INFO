const { Router } = require("express");

const {
  getDict,
  getDictById,
  getDictByTerm,
  getDictByLetter,
  updateDict,
  deleteDict,
  addDict,
} = require("../controllers/dictionary.controller");

const router = Router();
router.get("/", getDict);
router.post("/", addDict);
router.get("/:id", getDictById);
router.get("/term/:term", getDictByTerm);
router.get("/letter/:letter", getDictByLetter);
router.put("/:id", updateDict);
router.delete("/:id", deleteDict);

module.exports = router;
