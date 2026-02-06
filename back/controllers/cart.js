const userModel = require("../models/user");
const productModel = require("../models/product");

exports.addToCart = async (req, res) => {
    try {
        const { itemId } = req.body;
        const userId = req.user.id;

        if (!itemId) {
            return res.status(400).json({
                success: false,
                message: 'Item ID is required'
            });
        }

        // Check if product exists
        const product = await productModel.findById(itemId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Get user and their cart data
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        let cartData = user.cartData || {};

        // Add item to cart
        if (cartData[itemId]) {
            cartData[itemId] += 1; // Increment quantity
        } else {
            cartData[itemId] = 1; // Add new item
        }

        // Update user's cart data
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({
            success: true,
            message: 'Item added to cart successfully',
            cartData
        });

    } catch (error) {
        console.error('Add to cart error:', error.message, error.stack);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

exports.updateCart = async (req, res) => {
    try {
        const { itemId, quantity } = req.body;
        const userId = req.user.id;

        if (!itemId || quantity === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Item ID and quantity are required'
            });
        }

        if (quantity < 0) {
            return res.status(400).json({
                success: false,
                message: 'Quantity cannot be negative'
            });
        }

        // Get user and their cart data
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        let cartData = user.cartData || {};

        if (quantity === 0) {
            // Remove item if quantity is 0
            delete cartData[itemId];
        } else {
            // Update quantity
            cartData[itemId] = quantity;
        }

        // Update user's cart data
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({
            success: true,
            message: 'Cart updated successfully',
            cartData
        });

    } catch (error) {
        console.error('Update cart error:', error.message, error.stack);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

exports.UserCartData = async (req, res) => {
    try {
        const userId = req.user.id;

        // Get user's cart data
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        const cartData = user.cartData || {};

        // Get product details for items in cart
        const cartItems = [];
        let totalAmount = 0;

        for (const [itemId, quantity] of Object.entries(cartData)) {
            const product = await productModel.findById(itemId);
            if (product) {
                const itemTotal = product.price * quantity;
                cartItems.push({
                    itemId,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity,
                    itemTotal
                });
                totalAmount += itemTotal;
            }
        }

        res.json({
            success: true,
            cartItems,
            totalAmount,
            itemCount: Object.keys(cartData).length
        });

    } catch (error) {
        console.error('Get cart data error:', error.message, error.stack);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Item ID is required'
            });
        }

        // Get user and their cart data
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        let cartData = user.cartData || {};

        // Remove item from cart
        if (cartData[id]) {
            delete cartData[id];
            
            // Update user's cart data
            await userModel.findByIdAndUpdate(userId, { cartData });

            res.json({
                success: true,
                message: 'Item removed from cart successfully',
                cartData
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Item not found in cart'
            });
        }

    } catch (error) {
        console.error('Remove from cart error:', error.message, error.stack);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

exports.clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        // Clear user's cart data
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({
            success: true,
            message: 'Cart cleared successfully',
            cartData: {}
        });

    } catch (error) {
        console.error('Clear cart error:', error.message, error.stack);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};
