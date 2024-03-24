import { useState, useEffect } from "react";
import DishComponent from "./DishComponent";
import { MainDish } from "../Models/MainDish";
//import styled from "styled-components";

export const MainDishComponent = () => {
  const [mainDish, setMainDish] = useState<MainDish[]>();
  useEffect(() => {
    fetch(`https://iths-2024-recept-grupp5-o9n268.reky.se/recipes`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMainDish(data);
      });
  }, []);
  return mainDish?.map((dish) => <DishComponent dish={dish} />);
};
