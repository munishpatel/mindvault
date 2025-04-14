import React, { useState, useEffect } from "react";
import "./Checklist.css";

const defaultData = {
  "CLOTHING": [
    "Pyjamas", "Underwear", "Bras", "Socks", "Tops", "Jeans", "Shorts",
    "Dresses", "Swimsuits", "Workout Clothes", "Formal Outfit",
    "Casual Shoes", "Dress Shoes", "Sandals", "Flip Flops", "Sunglasses"
  ],
  "IMPORTANT DOCUMENTS": [
    "Passport / Visa", "Identification", "Itinerary", "Boarding Passes",
    "Hotel Reservations", "Travel Insurance", "Emergency Contacts"
  ],
  "TOILETRIES": [
    "Shampoo", "Conditioner", "Hair Brush", "Soap", "Toothpaste",
    "Toothbrush", "Face Wash", "Razor", "Deodorant", "Makeup Bag", "Feminine Products"
  ],
  "MISCELLANEOUS": [
    "Camera", "Chargers", "Headphones", "Water bottle", "Wallet", "Phone"
  ]
};

const Checklist = () => {
  const [checklist, setChecklist] = useState({});
  const [customItem, setCustomItem] = useState("");
  const [category, setCategory] = useState("CLOTHING");

  // Ensure checklist is initialized and loaded on first visit
  useEffect(() => {
    const stored = localStorage.getItem("packingChecklist");

    if (stored) {
      setChecklist(JSON.parse(stored));
    } else {
      const structured = {};
      for (let cat in defaultData) {
        structured[cat] = defaultData[cat].map(item => ({ name: item, checked: false }));
      }
      localStorage.setItem("packingChecklist", JSON.stringify(structured));
      setChecklist(structured);
    }
  }, []);

  // Auto-save whenever checklist changes
  useEffect(() => {
    if (Object.keys(checklist).length > 0) {
      localStorage.setItem("packingChecklist", JSON.stringify(checklist));
    }
  }, [checklist]);

  const toggleCheck = (cat, index) => {
    const updated = { ...checklist };
    updated[cat][index].checked = !updated[cat][index].checked;
    setChecklist(updated);
  };

  const addCustomItem = () => {
    if (!customItem.trim()) return;
    const updated = { ...checklist };
    if (!updated[category]) updated[category] = [];
    updated[category].push({ name: customItem.trim(), checked: false });
    setChecklist(updated);
    setCustomItem("");
  };

  const clearAllChecks = () => {
    const updated = {};
    for (let cat in checklist) {
      updated[cat] = checklist[cat].map(item => ({ ...item, checked: false }));
    }
    setChecklist(updated);
  };

  const resetChecklist = () => {
    const fresh = {};
    for (let cat in defaultData) {
      fresh[cat] = defaultData[cat].map(item => ({ name: item, checked: false }));
    }
    localStorage.setItem("packingChecklist", JSON.stringify(fresh));
    setChecklist(fresh);
  };

  return (
    <div className="checklist-container">
      <h1>Packing Checklist</h1>

      <div className="checklist-grid">
        {Object.entries(checklist).map(([cat, items]) => (
          <div key={cat} className="checklist-column">
            <h3>{cat}</h3>
            {items.map((item, idx) => (
              <label key={idx} className="check-item">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleCheck(cat, idx)}
                />
                {item.name}
              </label>
            ))}
          </div>
        ))}
      </div>

      <div className="custom-add">
        <input
          type="text"
          value={customItem}
          placeholder="Custom item..."
          onChange={(e) => setCustomItem(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {Object.keys(checklist).map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
        <button onClick={addCustomItem}>Add</button>
      </div>

      <div className="utility-buttons">
        <button onClick={clearAllChecks}>Clear All Checks</button>
        <button onClick={resetChecklist}>Reset Checklist</button>
      </div>
    </div>
  );
};

export default Checklist;
