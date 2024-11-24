import React, { useEffect, useRef, useState } from "react";
import "./Menu.css";

const Menu = () => {
  const marqueeRef = useRef(null);
  const marqueeContainerRef = useRef(null);
  const [menuItems, setMenuItems] = useState([]); // State untuk menyimpan menu
  const [searchTerm, setSearchTerm] = useState(""); // State untuk menyimpan input pencarian
  const [selectedCategory, setSelectedCategory] = useState(""); // State untuk kategori yang dipilih

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/menu"); // Fetch ke backend
        const data = await response.json();
        setMenuItems(data); // Simpan menu ke state
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const marqueeContainer = marqueeContainerRef.current;

    // Duplikat konten marquee
    const content = marquee.innerHTML;
    marquee.innerHTML += content; // Menambahkan konten dua kali

    const contentWidth = marquee.offsetWidth;
    marqueeContainer.style.width = `${contentWidth}px`;
  }, []);

  // Filter menu berdasarkan pencarian dan kategori
  const filteredMenuItems = menuItems.filter((menu) => {
    const matchesSearchTerm = menu.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSelectedCategory = selectedCategory
      ? menu.category === selectedCategory
      : true;
    return matchesSearchTerm && matchesSelectedCategory;
  });

  // Ambil semua kategori unik dari data
  const categories = [...new Set(menuItems.map((item) => item.category))];

  return (
    <section id="menu" className="menu">
      <div className="marquee">
        <div ref={marqueeContainerRef} className="marquee-container">
          <div ref={marqueeRef} className="marquee-content">
            <span>OUR MENU • </span>
            <span>OUR MENU • </span>
            <span>OUR MENU • </span>
          </div>
        </div>
      </div>
      <h1 className="menu-title">MENU</h1>
      <div className="search-container">
        <div className="search-icon">
          <i className="fas fa-search"></i>
        </div>
        <input
          type="text"
          placeholder="Search for a menu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="filter-container">
        <div className="filter-icon">
          <i className="fas fa-filter"></i>
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="menu-grid">
        {filteredMenuItems.map((menu) => (
          <div key={menu.id} className="menu-card">
            <img src={menu.image} alt={menu.name} />
            <h3>{menu.name}</h3>
            <p>{menu.description}</p>
            <p>
              <strong>Price:</strong> Rp{menu.price.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
