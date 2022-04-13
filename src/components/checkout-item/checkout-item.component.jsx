import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
    const { removeItemFromCart, addItemToCart, decrementItemFromCart } = useContext(CartContext);
    const { name, imageUrl, quantity, price } = cartItem;

    const removeItemHandler = () => removeItemFromCart(cartItem); // if these methods change we can update this easily
    const addItemHandler = () => addItemToCart(cartItem); // we can optimize this later easily
    const decrementItemHandler = () => decrementItemFromCart(cartItem);

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`} />
            </div>

            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={decrementItemHandler}>
                    &#10094;
                </div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={addItemHandler}>
                    &#10095;
                </div>
            </span>
            <span className="price">${price}</span>
            <div className="remove-button" onClick={removeItemHandler}>
                &#10005;
            </div>
        </div>
    );
};

export default CheckoutItem;
