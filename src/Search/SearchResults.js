import { useParams } from "react-router";
import { Link } from "react-router-dom";
const SearchResults = () => {
    const {searchQuery} = useParams();

    return (<div>
        <h1> SEARCH RESULTS for {searchQuery}</h1>
        <Link to="/search" className="btn btn-primary">
            Back to Search
        </Link>

    </div>)
}
export default SearchResults;