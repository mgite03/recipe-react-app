import { useParams } from "react-router";
import * as searchService from "../services/SearchService";
import { useEffect, useState } from "react";
function Recipe() {
  const {recipeId} = useParams();
  const [details, setDetails] = useState(null)

  const findDetails = async () => {
      try {
          const details = await searchService.detailSearch(recipeId);
          setDetails(details);
          // console.log(details);
      } catch (error){
          console.error(error);
      }
    }
    useEffect(() => {findDetails();}, []);

    const listOfIngredients = () => {

      console.log(details.sections[0].components.map((component) => {
          return component.raw_text
      }));
      return details.sections[0].components.map((component)=> {
          return component.raw_text
      });
    }

  return (
  <div>
      <h1>{details &&`${details.name}`}</h1>
      {details && 
      <div>
          <img src={details.thumbnail_url}/>
          <h3>{details.description}</h3>
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
      </div>}
  </div>);
}
export default Recipe;
