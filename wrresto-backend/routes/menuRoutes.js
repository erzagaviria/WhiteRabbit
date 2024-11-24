const express = require("express");
const {
  getMenus,
  addMenu,
  updateMenu,
  deleteMenu,
} = require("../controllers/menuController");
const router = express.Router();

// CRUD Routes
router.get("/", getMenus);
router.post("/", addMenu);
router.put("/:id", updateMenu);
router.delete("/:id", deleteMenu);

module.exports = router;
