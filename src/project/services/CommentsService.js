import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

//REACT_APP_API_BASE should be something "http://localhost:4000/api/"
const API_URL = process.env.REACT_APP_API_BASE;


export const createComment = async (comment) => {
  try {
    const response = await request.post(`${API_URL}/comments`, comment);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// export const updateUser = async (user) => {
//   const response = await request.put(`${ACCOUNTS_URL}/${user.username}`, user);
//   return response.data;
// };

export const getComments = async (recipeId) => {
  try {
    const response = await request.get(`${API_URL}/${recipeId}/comments`);
    return response.data;
  } catch (err) {
    console.log("couldn't find comments");
  }
};

export const deleteComment = async (commentId) => {
    try{
        const response = await request.delete(`${API_URL}/comments/${commentId}`)
        return response.data;
    } catch (err){
      console.log("couldn't delete comment")
    }
}