import React, { useState } from "react";
import QRCode from "react-qr-code";
import axios from "axios";

function Menu() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const generateQRCodeValue = () => {
    return `http://localhost.com/${category}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const qrCodeValue = generateQRCodeValue();
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `${token}`,
      };
      const {data} = await axios.post(
        "http://localhost:8000/menu/add-menu",
        { category, name, price, qrCodeValue },
        { headers }
      );
      alert(data.msg);
      
    } catch (error) {
      console.log("error in adding menu");
    }
  };

  return (
    <div>
      <form>
        <h1>Menu Page</h1>
        <br />
        <label>Add Name of a dish : </label>
        <input
          type="string"
          placeholder="enter dish name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>Price : </label>
        <input
          type="number"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <label>Choose category : </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Choose</option>
          <option value={"chinese"}>Chinese</option>
          <option value={"North_Indian"}>North Indian</option>
          <option value={"South_Indian"}>South Indian</option>
          <option value={"Continental"}>Continental</option>
        </select>
        <br />
        {category && <QRCode value={generateQRCodeValue()} />}
        <br />
        <button onClick={handleSubmit}>Add Menu</button>
      </form>
    </div>
  );
}

export default Menu;
