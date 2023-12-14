import { useParams } from "react-router";
import * as searchService from "../services/SearchService";
import { useEffect, useState } from "react";
import * as AccountService from "../services/AccountService";
import { useSelector } from "react-redux";
import CommentSection from "./commentSection";
import { BiDislike, BiLike } from "react-icons/bi";
import "./recipe.css"

function Recipe() {
    const { recipeId } = useParams();
    const [details, setDetails] = useState(null)
    const { currentUser } = useSelector((state) => state.usersReducer);

    const isCurrentlyLiked = currentUser.likes ? currentUser.likes.includes(recipeId) : false;

    const findDetails = async () => {
        try {
            const details = await searchService.detailSearch(recipeId);
            setDetails(details);
            // console.log(details);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => { findDetails(); }, []);

    const listOfIngredients = () => {

        console.log(details.sections[0].components.map((component) => {
            return component.raw_text
        }));
        return details.sections[0].components.map((component) => {
            return component.raw_text
        });
    }

    return (
        <div>
            {/* <h1 className="title">{details && `${details.name}`}</h1> */}
            {/* {JSON.stringify(currentUser)} */}
            {/* {JSON.stringify(isCurrentlyLiked)} */}

            {currentUser && isCurrentlyLiked && (
              <div className="ms-3 me-3">
                  <button className="btn btn-danger" onClick={() => {
                      AccountService.unlikeRecipe(recipeId)
                      window.location.reload(false)
                  }}><BiDislike /></button>
              </div>
            )}
            {currentUser && !isCurrentlyLiked && (
              <div className="ms-3 me-3">
                  <button className="btn btn-primary" onClick={() => {
                      AccountService.likeRecipe(recipeId)
                      window.location.reload(false)
                  }}>
                      <BiLike />
                  </button>
              </div>
            )}
            <CommentSection />
        </div>);
}
export default Recipe;
