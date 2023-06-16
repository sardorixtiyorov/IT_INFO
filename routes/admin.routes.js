const { Router } = require("express");
const {
  getAdmins,
  createAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  getAdminByName,
} = require("../controllers/admin.controller");
const Police = require("../middleware/Police");

const router = Router();

router.get("/", Police, getAdmins);
router.post("/", createAdmin);
router.get("/:id", getAdminById);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);
router.get("/name/:name", getAdminByName);
module.exports = router;
