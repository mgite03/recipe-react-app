import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { Link} from "react-router-dom";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (<>
  <input placeholder="Search for a recipe" className="form-control w-50 mt-3 mb-3" 
          onChange={(e) => setSearchQuery(e.target.value) } />

  <Link to={`/search/${searchQuery}`} className="btn btn-primary">
    Search
  </Link>


  </>);
};

export default Search;
