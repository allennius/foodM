import { useEffect, useState } from "react";
import styled from "styled-components";
import { Cart } from "../Models/Cart";
import { CalculateCostCart, GetCart } from "../services/CartService";
import { CheckoutCommentComponent } from "./CheckoutCommentComponent";
import { useNavigate } from "react-router-dom";

const CheckoutComponent = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<Cart>({
    id: 0,
    OrderList: [],
    TotalCost: 0,
  });

  const [customizeOrderId, setCustomizeOrderId] = useState<number[]>([]);

  useEffect(() => {
    setCart(GetCart());
  }, []);

  const toggleCustomizeOrder = (orderId: number) => {
    if (customizeOrderId.includes(orderId)) {
      setCustomizeOrderId(customizeOrderId.filter((id) => id !== orderId));
    } else {
      setCustomizeOrderId([...customizeOrderId, orderId]);
    }
  };

  const onDelete = (orderId: number) => {
    const updatedOrderList = cart.OrderList.filter(
      (order) => order.id !== orderId,
    );
    const updatedCart = {
      ...cart,
      OrderList: updatedOrderList,
      TotalCost: CalculateCostCart({ ...cart, OrderList: updatedOrderList }),
    };
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    console.log("Order removed", orderId);
  };

  const placeOrder = (e: React.MouseEvent) => {
    // check if cart exists
    if (cart.OrderList.length < 1 || CalculateCostCart(cart) < 1) {
      console.log("No Items in cart");
      e.preventDefault();
    } else {
      navigate("/orderconfirmation", {
        state: {
          OrderList: cart.OrderList,
          TotalCost: CalculateCostCart(cart),
        },
      });
    }
  };

  return (
    <CheckoutContainer>
      {cart.OrderList.map((order) => (
        <OrderRow key={order.id}>
          <ProductCell>
            <StyledList>
              {order.main?.title && <li>{order.main.title}</li>}
              {order.sides?.title && <li>{order.sides.title}</li>}
              {order.drink?.name && <li>{order.drink.name}</li>}
              {order?.comment && <p>Comment: {order.comment}</p>}
            </StyledList>
          </ProductCell>
          <PriceCell>{`${order.OrderCost} SEK`}</PriceCell>
          <ActionCell>
            <StyledButton onClick={() => toggleCustomizeOrder(order.id)}>
              Customize
            </StyledButton>
            {customizeOrderId.includes(order.id) && (
              <CheckoutCommentComponent
                cart={cart}
                setCart={setCart}
                orderId={order.id}
                toggle={() => toggleCustomizeOrder(order.id)}
              />
            )}
            <StyledButton onClick={() => onDelete(order.id)}>
              Remove
            </StyledButton>
          </ActionCell>
        </OrderRow>
      ))}

      {cart.OrderList.length > 0 && (
        <PricePayContainer>
          <h1>Total price: {CalculateCostCart(cart)} SEK</h1>
          <button onClick={(e) => placeOrder(e)}>Place order</button>
        </PricePayContainer>
      )}
    </CheckoutContainer>
  );
};

export default CheckoutComponent;

export const CheckoutContainer = styled.div`
  width: 900px;
  overflow-x: auto;
  padding-right: 20px;

  @media (max-width: 949px) {
    width: 500px;
  }

  @media (max-width: 549px) {
    width: 360px;
  }
`;

export const ActionCell = styled.div`
  display: flex;
  justify-content: right;
`;

export const StyledButton = styled.button`
  margin: 0px 10px;
`;

export const OrderRow = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;
  gap: 10px;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  border-width: 90%;
  text-align: left;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 949px) {
    grid-template-columns: 1fr;
    text-align: left;

    ${ActionCell} {
      justify-content: center;
    }
  }
`;

export const ProductCell = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: column;
  font-weight: bold;
`;

export const PriceCell = styled.div`
  text-align: right;
  @media (max-width: 949px) {
    text-align: left;
    margin-left: 30px;
  }
`;

export const PricePayContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 8px 20px;
  // background-color: var(--fifthColor);
  border-radius: 20px;
`;

export const StyledList = styled.ul`
  margin-bottom: 0px;
  li {
    margin: 5px;
  }
  p {
    margin: 0px;
  }
`;
