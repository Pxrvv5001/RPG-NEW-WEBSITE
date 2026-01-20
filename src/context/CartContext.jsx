import { createContext, useState, useContext } from "react";
import toast from "react-hot-toast"; // <--- IMPORT TOAST

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        // Prevent adding duplicates
        if (cart.find(item => item.id === product.id)) {
            toast.error(`${product.name} is already in your quote!`, {
                icon: '⚠️',
            });
            return;
        }

        setCart((prev) => [...prev, product]);
        // Professional Success Toast
        toast.success(`Added ${product.name} to Quote Request!`);
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter(item => item.id !== id));
        toast('Item removed from quote', { icon: '🗑️' });
    };

    const clearCart = () => {
        setCart([]);
        toast.success("Quote list cleared");
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);