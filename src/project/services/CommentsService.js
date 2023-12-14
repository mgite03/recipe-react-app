import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

//REACT_APP_API_BASE should be something "http://localhost:4000/api"
const API_URL = process.env.REACT_APP_API_BASE;
const COMMENTS_URL = `${API_URL}/comments`


export const createComment = async (comment) => {
  try {
    const response = await request.post(`${COMMENTS_URL}`, comment);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getRecipeComments = async (recipeId) => {
  try {
    const response = await request.get(`${COMMENTS_URL}/${recipeId}`);
    return response.data;
  } catch (err) {
    console.log("couldn't find comments");
  }
};


export const getComments = async () => {
  try {
    const response = await request.get(`${COMMENTS_URL}`);
    return response.data;
  } catch (err) {
    console.log("couldn't find comments");
  }
};

export const deleteComment = async (commentId) => {
    try{
        const response = await request.delete(`${COMMENTS_URL}/${commentId}`)
        return response.data;
    } catch (err){
      console.log("couldn't delete comment")
    }
}

export const getCommentsByUser = async (username) => {
  try {
    const response = await request.get(`${COMMENTS_URL}/user/${username}`);
    return response.data;
  } catch (err) {
    console.log("couldn't get comments by username");
  }
}