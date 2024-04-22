import styled from "styled-components";

interface PopUpProps {
  Item: string;
}
export const ItemAddedToCartPopup = ({Item}: PopUpProps) => {

    return(
      
        <AddedToCartPopup><h2>{Item} was added to cart</h2></AddedToCartPopup>
    )

}




const AddedToCartPopup = styled.div`
  position: fixed;
  bottom: 50%;
  left: 50%;
  z-index: 5;
  background-color: grey;
  border-radius: 20px;
  padding: 10px;
`;