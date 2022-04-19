import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
    let existingItem = cartItems.find((item) => item.id === productToAdd.id);
    if (existingItem) {
        return cartItems.map((cartItem) => (cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem));
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const decrementCartItem = (cartItems, productToDecrement) => {
    let existingItem = cartItems.find((item) => item.id === productToDecrement.id);
    if (existingItem.quantity > 1) {
        return cartItems.map((cartItem) => (cartItem.id === productToDecrement.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem));
    }

    return cartItems.filter((cartItem) => cartItem.id !== productToDecrement.id);
}; // generate new object so React rerenders React does not rerender if is mutated

const removeCartItem = (cartItems, productToRemove) => {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    decrementItemFromCart: () => {},
    removeItemFromCart: () => {},
    total: 0,
});

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: "SET_CART_ITEMS",
    SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const INITIAL_STATE = {
    cartItems: [],
    isCartOpen: false,
    cartCount: 0,
    cartTotal: 0,
};

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            };

        default:
            throw new Error(`unhandled type of ${type} in cartReducer`);
    }
};

export const CartProvider = ({ children }) => {
    const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        // should dispatch new action with payload
        // generate new cart total
        // generate new cart count
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount }));
    };

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const decrementItemFromCart = (productToDecrement) => {
        const newCartItems = decrementCartItem(cartItems, productToDecrement);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove);
        updateCartItemsReducer(newCartItems);
    };

    const setIsCartOpen = (bool) => {
        dispatch(createAction( CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    };

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, decrementItemFromCart, removeItemFromCart, cartTotal };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
