import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/UserOrder.css";

function UserOrder() {
  const [menuData, setMenuData] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.1.57:8000/menu/all-menu`);
       // console.log(response.data)
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
        updatedSelectedItems[itemId] = {
          ...menuData.find((item) => item._id === itemId),
          quantity: 1, 
        };
      }
      return updatedSelectedItems;
    });
  };

  const handleChange = (e, itemId) => {
    const { value } = e.target;
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = { ...prevSelectedItems };
      updatedSelectedItems[itemId].quantity = parseInt(value) || 0;
      return updatedSelectedItems;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const totalBill = Object.values(selectedItems).reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const groupedMenuItems = {};
  menuData.forEach((menuItem) => {
    const categoryName = menuItem.category.name;
    if (!groupedMenuItems[categoryName]) {
      groupedMenuItems[categoryName] = [];
    }
    groupedMenuItems[categoryName].push(menuItem);
  });

  return (
    <>
      <h1 style={{ marginLeft: "500px" }}>Choose from wide range</h1>
      <div className="menu-container">
        <div>
          {Object.keys(groupedMenuItems).map((categoryName) => (
            <div key={categoryName} className="menu-category">
              <h3>{categoryName}</h3> 
              {groupedMenuItems[categoryName].map((menuItem) => (
                <div key={menuItem._id} className="menu-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={!!selectedItems[menuItem._id]}
                      onChange={() => handleCheckboxChange(menuItem._id)}
                    />
                    <div className="menu-item-details">
                      <h3>{menuItem.name}</h3>
                      <p>$ {menuItem.price}</p>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div>
          <h2 className="selected-items">Total Bill</h2>
          <form onSubmit={handleSubmit}>
            {Object.values(selectedItems).map((item, index) => (
              <div key={index} className="selected-item">
                <label>* {item.name}</label>
                <span>Price: ${item.price}</span>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleChange(e, item._id)}
                />
              </div>
            ))}
            <div>Total: ${totalBill}</div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserOrder;
