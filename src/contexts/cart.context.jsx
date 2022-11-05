import { createContext, useReducer } from 'react';


const addCartItem = (cartItems, productToAdd) => {

    const existingCartItems = cartItems.find(cartitem => cartitem.id === productToAdd.id);

    if (existingCartItems) {
        return cartItems.map((cartitem) => cartitem.id === productToAdd.id ? { ...cartitem, quantity: cartitem.quantity + 1 } : cartitem)
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItems = cartItems.find(cartItem => cartItem.id === productToRemove.id);

    if (existingCartItems.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
    }


    return cartItems.map((cartItem) => cartItem.id === productToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem);

}

const removeItem = (cartItems, removeItem) => {
    const existingCartItems = cartItems.find(cartItem => cartItem.id === removeItem.id);

    if (existingCartItems) {
        return cartItems.filter(cartItem => cartItem.id !== removeItem.id);
    }
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemToCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0,


});
 const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
 }
const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return { ...state, ...payload };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {...state, isCartOpen: payload};
        default:
            throw new Error('Invalid Cartt action type: ' + type);
    }
}


export const CartProvider = ({ children }) => {
  
    const [{ cartItems, cartCount,isCartOpen, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newcartItems) => {
        const newCartCount = newcartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);


        const newCartTotal = newcartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );

        dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: { cartItems: newcartItems, cartCount: newCartCount, cartTotal: newCartTotal } });

    }



    const addItemToCart = (product) => {
        const newCartItems = (addCartItem(cartItems, product));
        updateCartItemsReducer(newCartItems);
    }
    const removeItemToCart = (product) => {
        const newCartItems = (removeCartItem(cartItems, product));
        updateCartItemsReducer(newCartItems);
    }
    const clearItemFromCart = (product) => {
        const newCartItems = (removeItem(cartItems, product));
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        dispatch({type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload:bool});
    }


    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        cartItems, 
        cartCount, 
        cartTotal, 
        removeItemToCart, 
        clearItemFromCart };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}