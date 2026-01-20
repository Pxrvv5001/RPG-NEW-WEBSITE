import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        // Prevent duplicates
        if (cart.find(item => item.id === product.id)) {
            alert(`${product.name} is already in your quote list!`);
            return;
        }
        setCart((prev) => [...prev, product]);
        alert(`Added ${product.name} to Quote Request!`);
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter(item => item.id !== id));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);