import axios from "axios";

const KEY = process.env.REACT_APP_API_KEY;

const popularList = () => {
  return{
    method: 'GET',
    url: 'https://tasty.p.rapidapi.com/recipes/list',
    params: {
      from: '0',
      size: '5'
    },
    headers: {
      'X-RapidAPI-Key': KEY,
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
  }}  
};

// const similarRecipes = (recipeId) => {
//   return{
//     method: 'GET',
//     url: 'https://tasty.p.rapidapi.com/recipes/list-similarities',
//     params: {
//       recipe_id: {recipeId}
//     },
//     headers: {
//       'X-RapidAPI-Key': KEY,
//       'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
//   }}  
// };

const getRecipe = (recipeId) => {
  return{
    method: 'GET',
    url: 'https://tasty.p.rapidapi.com/recipes/get-more-info',
    params: {
      id: recipeId
    }, 
    headers: {
      'X-RapidAPI-Key': KEY,
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
  }}
};

export const getRecipesList = async () => {
  try {
    const response = await axios.request(popularList());
    console.log("getRecipesList:");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// export const getSimilarTo = async (recipeId) => {
//   try {
//     const response = await axios.request(similarRecipes);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// }

export const getRecipeAt = async (recipeId) => {
  try {
    const response = await axios.request(getRecipe(recipeId));
    console.log("GETTING RECIPE:");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}