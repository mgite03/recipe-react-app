import axios from "axios";

// const KEY = process.env.REACT_APP_NAPSTER_API_KEY;
// const KEY = "551137adc6msh83e1d1c10073965p161b45jsn5e87f4d68d8e";
const KEY = "bdca2962e7msh49217335710b68fp1052c1jsn504f42d54e5e";


const options = (text) => {
    return {
    method: 'GET',
    url: 'https://tasty.p.rapidapi.com/recipes/auto-complete',
    params: {
      prefix: text
    },
    headers: {
      'X-RapidAPI-Key': KEY,
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
  }};

export const fullTextSearch = async(text) => {
    try {
        const response = await axios.request(options(text));
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}