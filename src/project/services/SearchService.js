import axios from "axios";

const KEY = process.env.REACT_APP_API_KEY;


  


const options = (text) => {
    return {
    method: 'GET',
    url: 'https://tasty.p.rapidapi.com/recipes/list',
    params: {
      // prefix: text
      from: '0',
      size: '20',
      q: text
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

const detailedOptions = (recipeId) => {
return {
  method: 'GET',
  url: 'https://tasty.p.rapidapi.com/recipes/get-more-info',
  params: {id: recipeId},
  headers: {
    'X-RapidAPI-Key': KEY,
    'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
  }
}};


export const detailSearch = async(id) => {
  try {
      const response = await axios.request(detailedOptions(id));
      // console.log(response.data);
      return response.data;
  } catch (error) {
      console.error(error);
  }
}
