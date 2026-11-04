import userModel from "../models/userModel.js";

// Add items to cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId);
        let cartData = userData.cartData;

        const itemId = req.body.itemId;
        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.userId, { cartData });
        res.json({
            success: true,
            message: "Added to cart."
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error!"
        })
    }
}

// Remove items from cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId);
        let cartData = userData.cartData;

        const itemId = req.body.itemId;
        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.userId, { cartData });
        res.json({
            success: true,
            message: "Removed from cart."
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error!"
        });
    }
}

// Fetch cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId);
        let cartData = userData.cartData;

        res.json({
            success: true,
            cartData
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error!"
        });
    }
}

export { addToCart, removeFromCart, getCart }