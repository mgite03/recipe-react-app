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
            console.log("THE REULTS ARE");
            console.log(searchResults);
            console.log("THE ARRAY IS");
            console.log(searchResults.results);
            console.log(typeof (searchResults.results));
            // console.log(Array.isArray(searchResults.results));
            setResults(searchResults.results);
            console.log("NOW RESULTS ARE");
            console.log(results);
            console.log("of type" + typeof (results));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => { search(); }, []);


    return (
        <div className="searchResults">
            <h1> SEARCH RESULTS for {searchQuery}</h1>
            <br />

            <Link to="/search" className="backToSearch">
                Back to Search
            </Link>
            {JSON.stringify(results)}

        </div>)
}
export default SearchResults;