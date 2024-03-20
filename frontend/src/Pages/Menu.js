import React from "react";
import QRCode from "react-qr-code";

function Menu() {
  const generateQRCodeValue = () => {
    return "http://192.168.1.57:3000/user-order";
  };

  return (
    <div>
      <h1 style={{marginLeft:"400px"}}>Scan QR Code to Access Menu</h1>
      <p style={{marginLeft:"400px"}}>Scan the QR code below to view the menu on your mobile device:</p>
      <QRCode style={{margin:"100px", marginLeft:"400px"}} value={generateQRCodeValue()} />
    </div>
  );
}

export default Menu;
