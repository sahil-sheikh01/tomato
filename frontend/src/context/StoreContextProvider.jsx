import { useEffect, useState } from "react";
import { StoreContext } from "./StoreContext";
import axios from 'axios';

const StoreContextProvider = (props) => {

    const backendUrl = "http://localhost:4000";

    const [token, setToken] = useState("");
    const [foodList, setFoodList] = useState([])
    const [cartItems, setCartItems] = useState({});

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        if (token) {
            await axios.post(backendUrl + "/api/cart/add", { itemId }, { headers: { token } });
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        if (token) {
            await axios.post(backendUrl + "/api/cart/remove", { itemId }, { headers: { token } });
        }
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
        setFoodList(response.data.data);
    }

    const loadCartData = async (token) => {
        const response = await axios.post(backendUrl + "/api/cart/get", {}, { headers: { token } });
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();

            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);
                await loadCartData(savedToken);
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