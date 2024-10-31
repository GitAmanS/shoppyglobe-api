const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware); 

router.post('/cart', cartController.addToCart);
router.put('/cart', cartController.updateCartItem);
router.delete('/cart', cartController.removeFromCart);

module.exports = router;
