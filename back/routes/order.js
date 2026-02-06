const express = require("express");
const orderRouter = express.Router();
const auth = require("../middleware/auth");
const adminauth = require("../middleware/adminauth");
const ordercontroller = require("../controllers/order");

orderRouter.get("/userOrders", auth, ordercontroller.getUserOrders);
orderRouter.post("/placeOrder", auth, ordercontroller.placeOrder);
orderRouter.post("/stripe", auth, ordercontroller.placeOrderStripe);

orderRouter.get("/adminOrders", adminauth, ordercontroller.getAdminOrders);
orderRouter.put("/status", adminauth, ordercontroller.updateStatus);

module.exports = orderRouter;

