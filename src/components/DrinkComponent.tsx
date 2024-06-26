import { useRef, useState } from "react";
import styled from "styled-components";
import DrinkPopUp from "./DrinkPopUp";
import { Drink } from "../Models/Drink";

interface DrinkComponentProps {
  expandDrink: () => void;
  drink: Drink;
  isOpen: boolean;
}


const DrinkComponent = ({ drink, isOpen, expandDrink }: DrinkComponentProps) => {
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  
  const togglePopUp = () => setPopUpOpen(!isPopUpOpen);
  
  const ExpandedRef = useRef<HTMLDivElement>(null);
  
  const clickedEvents = () => {
    expandDrink();
    if(isOpen) {
        ExpandedRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: "start" });
      }
  }
  
  return (
    <DrinkContainer ref={ExpandedRef} onClick={(clickedEvents)}>
      <ImageContainer>
        <DrinkImage src={drink.imgUrl} alt={drink.name} />
        <TitleOverlay>{drink.name}</TitleOverlay>
      </ImageContainer>
      {isPopUpOpen && <DrinkPopUp drink={drink} onClose={togglePopUp} />}
    </DrinkContainer>
  );
};

const DrinkContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 32px;

  @media (max-width: 949px) {
    margin-bottom: 23px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 250px;
  height: 250px;

  @media (max-width: 949px) {
    width: 150px;
    height: 150px;
  }
`;

const DrinkImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

const TitleOverlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2em;
  font-size: 16px;

  @media (max-width: 949px) {
    font-size: 14px;
  }
`;

export default DrinkComponent;
