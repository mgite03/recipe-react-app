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

    // const [currentlyLiked] = currentUser.likes;
    // .contains(parseInt(recipeId));

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
            <h1 className="title">{details && `${details.name}`}</h1>


            {details &&
                <div>
                    <div className="d-flex justify-content-center">
                        <img src={details.thumbnail_url} className="img-fluid rounded col-2" />
                    </div>
                    <div className="d-flex justify-content-center">
                        {currentUser && (
                            <div className="ms-3 me-3">
                                <button className="btn btn-danger" onClick={() => {
                                    AccountService.unlikeRecipe(recipeId, currentUser)
                                    window.location.reload(false)
                                }}><BiDislike /></button>
                            </div>
                        )}
                        {currentUser && (
                            <div className="ms-3 me-3">
                                <button className="btn btn-primary" onClick={() => {
                                    AccountService.likeRecipe(details.id, currentUser)
                                    window.location.reload(false)
                                }}>
                                    <BiLike />
                                </button>

                            </div>
                        )}
                    </div>

                    <h3 className="description">{details.description}</h3>
                    <div className="recipe-text ps-5">
                        Ingredients: <ul>
                            {listOfIngredients().filter((ingredient) => (ingredient !== "n/a")).map((ingredient) => <li>{ingredient}</li>)}
                        </ul>
                        <ol>
                            {details.instructions.map((step) =>
                                <li>
                                    {step.display_text}
                                </li>)}
                        </ol>
                        {/* {JSON.stringify(details)} */}
                    </div>
                </div>}
            <CommentSection />
        </div>);
}
export default Recipe;
