import axios from "axios";

const KEY = process.env.REACT_APP_API_KEY;

const options = () => {
  return{
    method: 'GET',
    url: 'https://tasty.p.rapidapi.com/tags/list',
    headers: {
      'X-RapidAPI-Key': KEY,
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
  }}  
};

export const getAllTags = async () => {
  try {
    const response = await axios.request(options());
    return response.data;
  } catch (error) {
    console.error(error);
  }
}