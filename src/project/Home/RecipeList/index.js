import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import './index.css';
import * as RecipeService from "../../services/RecipeService";
import * as AccountService from "../../services/AccountService";


function RecipeList() {
  const [recipe, setRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const { currentUser } = useSelector((state) => state.usersReducer);
  const navigate = useNavigate();

  const fetchRecipes = async () => {
    try {
      const recipesList = await RecipeService.getRecipesList();
      console.log("results:");
      console.log(recipesList);
      console.log("array:");
      console.log(recipesList.results);
      console.log(typeof(recipesList.results));
      setRecipes(recipesList.results);
      console.log("NOW results are");
      console.log(recipes);
      console.log("of type" + typeof(recipes));
    } catch (err) {
      console.log("can't load recipes");
      console.error(err);
    }
    // setRecipes(recipes);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return(
    <div className="popularRecipes">
      <h3>Popular Recipes This Week</h3>
      <div className="list-group wd-card-container">
      {recipes.map((recipe) => (
          <Link key={recipe.id}
                to={`/details/${recipe.id}`}
                className="list-group-item wd-card">
                <div className="card">
                  <img className="card-img-top" src={recipe.thumbnail_url} alt="Card image"/>
                  <div className="card-body">
                    <h5 className="card-text">{recipe.name}</h5>
                    <button onClick={() => {
                      AccountService.likeRecipe(recipe.id, currentUser)
                    }}>Like</button>
                  </div>
                </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default RecipeList;