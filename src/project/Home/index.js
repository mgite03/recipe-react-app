import { useSelector } from "react-redux";
import LikesList from "./LikesList";
import RecipeList from "./RecipeList";
import Welcome from "./Welcome/welcome";

const Home = () => {

  return (
    <div>
      <Welcome/>
      {/* <RecipeList /> */}
      {/* <LikesList /> */}
    </div>
  );
};

export default Home;
