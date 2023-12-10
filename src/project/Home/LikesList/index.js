import { useSelector } from "react-redux";
import * as RecipeService from "../../services/RecipeService";
import './index.css';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <div>
      {currentUser && (
        <div>
          <h3>Your liked recipes</h3>
          <div className="list-group wd-card-container">
          {recipes.map((recipe) => (
              <Link key={recipe.id}
                    to={`/details/${recipe.id}`}
                    className="list-group-item wd-card">
                    <div className="card">
                      <img className="card-img-top" src={recipe.thumbnail_url} alt="Card image"/>
                      <div className="card-body">
                        <h5 className="card-text">{recipe.name}</h5>
                      </div>
                    </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default LikesList;