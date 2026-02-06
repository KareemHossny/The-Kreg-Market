const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/product");
const adminAuth = require("../middleware/adminauth");
const uploadImage = require("../middleware/multer");

// Admin routes (require authentication)
productRouter.post("/add", adminAuth, uploadImage, productController.addProduct);
productRouter.delete("/remove/:id", adminAuth, productController.removeProduct);
productRouter.put("/stock/:id", adminAuth, productController.updateStock);

// (no authentication required)
productRouter.get("/all", productController.allProducts);
productRouter.get("/:id", productController.getProduct);
module.exports = productRouter;
