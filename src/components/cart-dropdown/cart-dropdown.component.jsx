import { useContext } from "react";
import { CartDropdownContainer, EmptyMessage, CartItems } from "./cart-dropdown.styles.jsx";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate("/checkout");
    };
    return (
        <CartDropdownContainer>
            <CartItems>{cartItems.length ? cartItems.map((item) => <CartItem cartItem={item} />) : <EmptyMessage>Your cart is empty</EmptyMessage>}</CartItems>
            <Button onClick={goToCheckoutHandler}>Go to checkout</Button>
        </CartDropdownContainer>
    );
};

export default CartDropdown;
