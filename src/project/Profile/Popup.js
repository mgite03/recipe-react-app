import React, { useEffect, useState } from "react";
import "./Popup.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as RecipeService from "../services/RecipeService";

function Popup({ onClose, data, title }) {
  const navigate = useNavigate();
  const [recipeNames, setRecipes] = useState([]);
  const handleClick = (d) => {
    // bad but watver
    if (title === "Likes") {
      navigate(`../details/${d}`);
    } else {
      navigate(`../profile/${d}`);
    }
    navigate(0);
  };
  const fetchRecipeNames = async () => {
    try {
      const promises = data.map((d) => RecipeService.getRecipeAt(d));
      let recipeData = await Promise.all(promises);
      recipeData = recipeData.map((d) => d.name);
      console.log("DATA IS HERE", recipeData);
      setRecipes(recipeData);
    } catch (error) {
      console.error("Error fetching recipe names:", error);
    }
  };
  useEffect(() => {
    if (title === "Likes") {
      fetchRecipeNames();
    }
  }, []);
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="following">
          <h2>{title}</h2>
        </div>
        {data.map((d, idx) => (
          <>
            <Link onClick={() => handleClick(d)} className="name">
              {title === "Likes" ? recipeNames[idx] : d}
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
