import React from "react";
import "./Popup.css"; // Import the CSS file

function Popup({ onClose, data, following }) {
  console.log("DATA", data);
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="following">
          <h2>{following ? "Following" : "Followers"}</h2>
        </div>
        {data.map((d) => <div className="name">
          {d}
        </div>)}

        {/* Modal content goes here */}
        <button className="closeButton" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Popup;
