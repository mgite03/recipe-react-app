import { useParams } from "react-router";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import * as searchService from "../services/SearchService";
import "./search.css";

const SearchResults = () => {
  const { searchQuery } = useParams();
  const [results, setResults] = useState([]);

  const search = async () => {
    try {
      const searchResults = await searchService.fullTextSearch(searchQuery);
      setResults(searchResults.results);
      // console.log(results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    search();
  }, []);

  const renderRecipe = (recipe) => {
    return (
      <Link to={`/details/${recipe.id}`} className="list-group-item wd-card">
        <div className="card">
          <img
            className="card-img-top"
            src={recipe.thumbnail_url}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">{recipe.name}</h5>
            <p className="card-text">
              {truncateDescription(recipe.description)}
            </p>
          </div>
        </div>
      </Link>
    );
  };

  const truncateDescription = (description) =>
    description.length < 100
      ? description
      : description.substring(0, 96) + "...";

  return (
    <div className="searchResults">
      <h1> SEARCH RESULTS for {searchQuery}</h1>
      <br />

      {/* {JSON.stringify(results)} */}
      <div className="d-flex flex-row flex-wrap">
        {results.map((result) => renderRecipe(result))}
      </div>
    </div>
  );
};
export default SearchResults;
