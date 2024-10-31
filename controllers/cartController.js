const Cart = require('../models/cartModel');

// Add product to cart
exports.addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }
        const existingItem = cart.items.find(item => item.productId == productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }
        const savedCart = await cart.save();
        res.status(201).json(savedCart);
    } catch (err) {
        res.status(400).json({ message: "Invalid input" });
    }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        const item = cart.items.find(item => item.productId == productId);
        if (!item) return res.status(404).json({ message: "Item not found in cart" });
        item.quantity = quantity;
        const savedCart = await cart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(400).json({ message: "Invalid input" });
    }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        cart.items = cart.items.filter(item => item.productId != productId);
        const savedCart = await cart.save();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
