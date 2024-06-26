import { styled } from "styled-components";
import { Dish } from "../Models/Dish";
import { Drink } from "../Models/Drink";
import { DrinkRecommendation } from "../services/RecommendationService";
import { DrinkQuery } from "../services/DbService";
import { useState } from "react";
import DrinkComponentAlt from "./DrinkComponentAlt";

interface DrinkProps {
  dish: Dish;
  sendToCart: (drink?: Drink) => void;
  showItemAdded: boolean;
}
export const RecommendDrink = (props: DrinkProps) => {
    let drinkId = DrinkRecommendation(props.dish._id);
    const {data, isLoading, error} = DrinkQuery(drinkId)
    const [drinkList, setdrinkList] = useState(false);

    let recommendedDrink = data;
    let drinkListIDs = [
      "12768",
      "12618",
      "15092",
      "12630",
      "12724",
      "12726",
      "11288",
      "178365",
      "11462",
      "11000",
      "11003",
      "12528",
    ];

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    return (
        <DrinkRecommendationParent>
            {!drinkList && (<><h3>We recommend this drink to go with your food</h3>
            <h2>{recommendedDrink?.name}</h2>
            <ImageContainer>
                <DrinkImage src={recommendedDrink?.imgUrl} alt={'Loading'}></DrinkImage>
            </ImageContainer>
            <ButtonContainer>
              <Button disabled={props.showItemAdded} onClick={() => {props.sendToCart(recommendedDrink)}}>Yes, look delicious</Button>
              <Button disabled={props.showItemAdded} onClick={() => {setdrinkList(true)}}>I'd like to pick a different drink</Button>
              <Button disabled={props.showItemAdded} onClick={() => {props.sendToCart()}}>No, just the food for now</Button>
            </ButtonContainer></>)}
            {drinkList && (
              <>
              <ListContainer>{drinkListIDs.map((drinkId) => (
                    <DrinkComponentAlt sendToCart={props.sendToCart} key={drinkId} drinkId={drinkId} />
                ))}
              </ListContainer>
                
                <Button disabled={props.showItemAdded} onClick={() => {props.sendToCart()}}>Never mind, just the food</Button>
              </>
              )}
        </DrinkRecommendationParent>
    )

}

const ListContainer = styled.div`
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const ImageContainer = styled.div`
  margin-bottom: 20px;
`;

const DrinkRecommendationParent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 45rem;
`;

const DrinkImage = styled.img`
  width: 50%;
  border-radius: 20px;
`;

const Button = styled.button`
    margin: 20px;
    
  border: solid 2px black;
  &:hover,
  &:focus {
    color: grey;
    border-color: grey;
  }
`;
