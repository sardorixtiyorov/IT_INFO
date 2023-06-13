const { Router } = require("express");
const {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getCategoryByName,
} = require("../controllers/category.controller");

const router = Router();
router.get("/", getCategories);
router.post("/", createCategory);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.get("/name/:name", getCategoryByName);


module.exports = router;
