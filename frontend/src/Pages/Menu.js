import React from "react";
import QRCode from "react-qr-code";

function Menu() {
  const generateQRCodeValue = () => {
    return "http://localhost:8000";
  };

  return (
    <div>
      <h1>Search food from your mobile</h1>
      <br />
      <QRCode value={generateQRCodeValue()} />
    </div>
  );
}

export default Menu;
