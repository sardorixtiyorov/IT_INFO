const { Router } = require("express");
const {
  getSynonyms,
  createSyn,
  getSynonym,
  updateSynonym,
  deleteSynonym,
} = require("../controllers/synonym.contoller");

const router = Router();
router.get("/", getSynonyms);
router.post("/", createSyn);

router.get("/:id", getSynonym);
router.put("/:id", updateSynonym);
router.delete("/:id", deleteSynonym);

module.exports = router;
