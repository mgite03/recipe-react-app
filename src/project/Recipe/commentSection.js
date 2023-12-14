import * as CommentsService from "../services/CommentsService.js";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
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

  const currateComment = () => {
    const comment = {
      username: currentUser.username,
      createTime: new Date().toLocaleDateString,
      description: descriptText,
      recipeId: recipeId,
      likes: 0,
    };
    CommentsService.createComment(comment);
  };

  const deleteButton = (comment) => {
    if (currentUser.username == comment.username || currentUser.accountType == "Admin") {
        return(
            <button className="btn btn-danger float-end" onClick={() => CommentsService.deleteComment(comment.id)}>Delete</button>
        )
    }
    return(<></>);
  }

  return (
    <div>
      <div className="list-group">
        {comments.map((comment) => (
          <div className="list-group-item">
            <div className="d-flex flex-row">
              <h3>{comment.username}</h3>
              <h4>{comment.description}</h4>
              {deleteButton(comment)}
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex flex-column ps-5">
        <input
        className="form-select w-75"
          type="text"
          placeholder="Comment Description"
          onChange={(e) => setDecription(e.target.value)}
        />
        <button className="searchButton" onClick={currateComment}>Submit</button>
      </div>
    </div>
  );
}

export default CommentSection;
