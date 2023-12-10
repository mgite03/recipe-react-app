import { useState } from "react";
import { Link } from "react-router-dom";
import "./search.css";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="search">
      <div className="title">
        <h1>Search GOODEATS!</h1>
      </div>
      <div className="searchBar d-flex">
        <div className="input">
          <input
            placeholder="Search for a recipe"
            className="form-control mr-2 mt-3 mb-3"
            onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="button">
          <Link to={`/search/${searchQuery}`} className="searchButton">
            Search
          </Link>

        </div>
      </div>
    </div>);
};

export default Search;
