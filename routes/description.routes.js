const { Router } = require("express");
const {
  getDesc,
  createDesc,
  getDescById,
  updateDesc,
  deleteDesc,
} = require("../controllers/description.controller");

const router = Router();
router.get("/", getDesc);
router.post("/", createDesc);
router.get("/:id", getDescById);
router.put("/:id", updateDesc);
router.delete("/:id", deleteDesc);

module.exports = router;
