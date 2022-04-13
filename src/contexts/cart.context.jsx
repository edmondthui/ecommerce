import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    let existingItem = cartItems.find((item) => item.id === productToAdd.id);
    if (existingItem) {
        return cartItems.map((cartItem) => (cartItem.id === productToAdd.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem));
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const decrementCartItem = (cartItems, productToDecrement) => {
    let existingItem = cartItems.find((item) => item.id === productToDecrement.id);
    if (existingItem.quantity > 1) {
        return cartItems.map((cartItem) => (cartItem.id === productToDecrement.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem));
    }

    return cartItems.filter((cartItem) => cartItem.id !== productToDecrement.id);
} // generate new object so React rerenders React does not rerender if is mutated

const removeCartItem = (cartItems, productToRemove) => {
    return cartItems.filter(cartItem => cartItem.id !== productToRemove.id)
}



export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    decrementItemFromCart: () => {},
    removeItemFromCart: () => {},
    total: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total+cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]) // make useEffect single responsibility

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);
        setCartTotal(newCartTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const decrementItemFromCart = (productToDecrement) => {
        setCartItems(decrementCartItem(cartItems, productToDecrement));
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, decrementItemFromCart, removeItemFromCart, cartTotal };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
