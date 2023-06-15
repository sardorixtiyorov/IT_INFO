const { Router } = require("express");
const {
  getAdmins,
  createAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  getAdminByName,
} = require("../controllers/admin.controller");

const router = Router();

router.get("/", getAdmins);
router.post("/", createAdmin);
router.get("/:id", getAdminById);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);
router.get("/name/:name", getAdminByName);
module.exports = router;
