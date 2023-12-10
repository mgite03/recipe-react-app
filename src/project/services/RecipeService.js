import axios from "axios";

const KEY = process.env.REACT_APP_API_KEY;

const options = () => {
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

export const getRecipesList = async () => {
  try {
    const response = await axios.request(options());
    console.log("getRecipesList:");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}