let cart = [];

export const setCartItems = (cartItems) => cart = [...cartItems]

export const addCartItems = (cartItems) => (cart = [...cart, ...cartItems])

export const getCartItems = () => cart
