import { useEffect, useState } from "react";
import { StoreContext } from "./StoreContext";
import axios from 'axios';

const StoreContextProvider = (props) => {

    const backendUrl = "http://localhost:4000";

    const [token, setToken] = useState("");
    const [foodList, setFoodList] = useState([])
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
                const itemInfo = foodList.find((product) => product._id === item);
                totalAmount += itemInfo.price * quantity;
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(backendUrl + "/api/food/list");
        setFoodList(response.data.data)
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    const contextValue = {
        token,
        setToken,
        backendUrl,
        foodList,
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