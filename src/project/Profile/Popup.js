import React from "react";
import "./Popup.css"; // Import the CSS file

function Popup({ onClose, data, following }) {
  console.log("DATA", data);
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{following ? "Following" : "Followers"}</h2>
        Data {data}
        {/* Modal content goes here */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Popup;
