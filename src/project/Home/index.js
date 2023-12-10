import RecipeList from "./RecipeList";
import Welcome from "./Welcome/welcome";

const Home = () => {
  return (
    <div>
      <Welcome/>
      <RecipeList />
    </div>
  );
};

export default Home;
