import React from "react";
import "./Popup.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Popup({ onClose, data, following }) {
  const navigate = useNavigate();
  const handleClick = (d) => {
    navigate(`../profile/${d}`);
    navigate(0);
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="following">
          <h2>{following ? "Following" : "Followers"}</h2>
        </div>
        {data.map((d) => (
          <>
            <Link onClick={() => handleClick(d)} className="name">
              {d}
            </Link>
          </>
        ))}
        <button className="closeButton" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Popup;
