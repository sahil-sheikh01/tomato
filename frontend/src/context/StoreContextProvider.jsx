import { useState } from "react";
import { food_list } from "../assets/assets";
import { StoreContext } from "./StoreContext";

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId) => {

        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }

    const getCartTotal = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            const quantity = cartItems[item];

            if (quantity > 0) {
                const itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * quantity;
            }
        }
        return totalAmount;
    }

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getCartTotal
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;