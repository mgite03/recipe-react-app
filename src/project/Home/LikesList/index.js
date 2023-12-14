import { useSelector } from "react-redux";
import * as RecipeService from "../../services/RecipeService";
// import './index.js';
import '../RecipeList/index.js';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as AccountService from "../../services/AccountService";
function LikesList() {
  const { currentUser } = useSelector((state) => state.usersReducer);
  const [recipes, setRecipes] = useState([]);
  const likes = currentUser ? currentUser.likes : [];

  const fetchRecipes = async (likes) => {
    try {
      let recipesList = [];
      recipesList = await Promise.all(likes.map(async (recipeId) => {
        return await RecipeService.getRecipeAt(recipeId);
      }));
      setRecipes(recipesList);
      console.log(recipes);
    } catch (err) {
      console.log("can't load recipes");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecipes(likes);
  }, []);
  return(
    <div className="popularRecipes">
      {currentUser && (
        <><h3 className="mt-5">Your liked recipes</h3>
        <div className="list-group wd-card-container">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="list-group-item wd-card">
              <Link className="card" to={`/details/${recipe.id}`}>
                <img
                  className="card-img-top"
                  src={recipe.thumbnail_url}
                  alt="Card image"
                />
                  <h5 className="card-text">{recipe.name}</h5>
                  <button className="likeButton"
                    onClick={(e) => {
                      if (currentUser) {
                        AccountService.unlikeRecipe(recipe.id);
                        window.location.reload(false);
                      } else {
                        alert("Must be logged in");
                      }
                    }}>Unlike
                  </button>
                </Link>
              </div>
          ))}
        </div></>
      )}
      {currentUser && likes.length === 0 && (
          <div>It's empty here... Start liking recipes!</div>
        )}
    </div>
  );
}
export default LikesList;