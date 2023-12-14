import * as CommentsService from "../services/CommentsService.js";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./recipe.css"

function CommentSection() {
    const { recipeId } = useParams();
    const { currentUser } = useSelector((state) => state.usersReducer);
    const [descriptText, setDecription] = useState("");
    const [comments, setComments] = useState([]);
    const fetchComments = async () => {
        try {
            let commentList = [];
            commentList = await CommentsService.getRecipeComments(recipeId);
            setComments(commentList);
            console.log(commentList);
        } catch (err) {
            console.log("can't load recipes");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const currateComment = async () => {
        const comment = {
            username: currentUser.username,
            createTime: new Date().toLocaleDateString,
            description: descriptText,
            recipeId: recipeId,
            likes: 0,
        };
        await CommentsService.createComment(comment);
        window.location.reload(false);
    };

    const deleteButton = (comment) => {
        if (currentUser.username == comment.username || currentUser.accountType == "Admin") {
            return (
                <button className="btn btn-danger float-end me-5" onClick={async () => {
                    await CommentsService.deleteComment(comment.id)
                    window.location.reload(false)
                }}>Delete</button>
            )
        }
        return (<></>);
    }

    return (
        <div className="commentSection">
          <h2 className="ms-5">Comments:</h2>
            <table className="table">
              {/* <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead> */}
                {comments.map((comment) => (
                  <tbody>
                    <tr>
                      <td className="col-3">
                        <h3 className="ms-5">
                          <Link to={`/profile/${comment.username}`}>
                              {comment.username}
                          </Link>
                        </h3>
                      </td>
                      <td className="col-6"><h4>{comment.description}</h4></td>
                      <td className="col-3 me-5">{deleteButton(comment)}</td>
                      </tr>
                  </tbody>
                ))}
            </table>
            {currentUser && (
              <div className="d-flex flex-column ps-5">
                <textarea
                    className="form-control w-75"
                    type="text"
                    placeholder="Write a comment..."
                    onChange={(e) => setDecription(e.target.value)}
                />
                <button className="searchButton" onClick={currateComment}>Submit</button>
              </div>
            )}
        </div>
    );
}

export default CommentSection;
