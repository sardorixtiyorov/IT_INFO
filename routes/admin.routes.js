const { Router } = require("express");
const {
  getAdmins,
  createAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  getAdminByName,
  loginAdmin,
  logoutAdmin,
} = require("../controllers/admin.controller");

const Validator = require("../middleware/validator");
const Police = require("../middleware/Police");

const router = Router();

router.get("/", Police, getAdmins);
router.post("/", Validator("admin"), createAdmin);
router.get("/:id", getAdminById);
router.put("/:id", Validator("admin"), updateAdmin);
router.delete("/:id", deleteAdmin);
router.get("/name/:name", getAdminByName);
router.post("/login", Validator("admin_email_pass"), loginAdmin);
router.post("/logout", logoutAdmin);

module.exports = router;
