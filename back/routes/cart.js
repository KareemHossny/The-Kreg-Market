const express = require("express");
const cartRouter = express.Router();
const cartController = require("../controllers/cart");
const auth = require("../middleware/auth");

// All cart routes require authentication
cartRouter.post("/add", auth, cartController.addToCart);
cartRouter.put("/update", auth, cartController.updateCart);
cartRouter.post("/get", auth, cartController.UserCartData);
cartRouter.delete("/remove/:id", auth, cartController.removeFromCart);
cartRouter.delete("/clear", auth, cartController.clearCart);

module.exports = cartRouter;

