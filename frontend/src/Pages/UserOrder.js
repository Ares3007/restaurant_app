import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/UserOrder.css"; // Import the CSS file

function UserOrder() {
  const [menuData, setMenuData] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/menu/all-menu`);
        setMenuData(response.data);
      } catch (error) {
        console.error("Error in fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = { ...prevSelectedItems };
      if (updatedSelectedItems[itemId]) {
        delete updatedSelectedItems[itemId];
      } else {
        updatedSelectedItems[itemId] = true;
      }
      return updatedSelectedItems;
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedMenuItems = menuData.filter(item => selectedItems[item._id]);
    console.log(selectedMenuItems);
    setSelectedItems({});
  };

  const groupedMenuItems = {};
  menuData.forEach((menuItem) => {
    const categoryName = menuItem.category.name;
    if (!groupedMenuItems[categoryName]) {
      groupedMenuItems[categoryName] = [];
    }
    groupedMenuItems[categoryName].push(menuItem);
  });

  return (
    <div className="menu-container">
      <h2>Menu</h2>
      {Object.keys(groupedMenuItems).map((categoryName) => (
        <div key={categoryName} className="menu-category">
          <h3>{categoryName}</h3>
          {groupedMenuItems[categoryName].map((menuItem) => (
            <div key={menuItem._id} className="menu-item">
              <label>
                <input
                  type="checkbox"
                  checked={selectedItems[menuItem._id]}
                  onChange={() => handleCheckboxChange(menuItem._id)}
                />
                {menuItem.name}
              </label>
            </div>
          ))}
        </div>
      ))}
      <h2 className="selected-items">Selected Items</h2>
      <form onSubmit={handleSubmit}>
        {Object.values(selectedItems).map((isSelected, index) => (
          <div key={index} className="selected-item">
            <label>Selected Item {index + 1}</label>
            <input
              type="text"
              value={isSelected ? `Item ${index + 1}` : ''}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserOrder;
