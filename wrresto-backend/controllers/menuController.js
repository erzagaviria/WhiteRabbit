const fs = require("fs");
const path = require("path");
const menuDataPath = path.join(__dirname, "../data/menuData.json");

const readMenuData = () => {
  const data = fs.readFileSync(menuDataPath);
  return JSON.parse(data);
};

const writeMenuData = (data) => {
  fs.writeFileSync(menuDataPath, JSON.stringify(data, null, 2));
};

const getMenus = (req, res) => {
  const menus = readMenuData();
  res.json(menus);
};

// tambah menu
const addMenu = (req, res) => {
  const menus = readMenuData();
  const newMenu = {
    id: menus.length ? menus[menus.length - 1].id + 1 : 1, // ID otomatis
    ...req.body, // Mengambil data dari body
  };
  menus.push(newMenu);
  writeMenuData(menus);
  res.status(201).json(newMenu);
};

// perbarui menu
const updateMenu = (req, res) => {
  const { id } = req.params;
  const menus = readMenuData();
  const menuIndex = menus.findIndex((menu) => menu.id == id);

  if (menuIndex !== -1) {
    menus[menuIndex] = { ...menus[menuIndex], ...req.body };
    writeMenuData(menus);
    res.json(menus[menuIndex]);
  } else {
    res.status(404).json({ message: "Menu not found" });
  }
};

// hapus menu
const deleteMenu = (req, res) => {
  const { id } = req.params;
  const menus = readMenuData();
  const filteredMenus = menus.filter((menu) => menu.id != id);

  if (menus.length !== filteredMenus.length) {
    writeMenuData(filteredMenus);
    res.json({ message: "Menu deleted successfully" });
  } else {
    res.status(404).json({ message: "Menu not found" });
  }
};

module.exports = { getMenus, addMenu, updateMenu, deleteMenu };
