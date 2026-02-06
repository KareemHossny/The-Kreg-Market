const productModel = require("../models/product");
const uploadImage = require("../middleware/multer");

exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, oldprice, category, subcategory, outOfStock } = req.body;
        
        // Validate required fields
        if (!name || !description || !price || !category || !subcategory) {
            return res.status(400).json({
                success: false,
                message: 'Name, description, price, category, and subcategory are required'
            });
        }

        // Check if image was uploaded
        if (!req.imageUrl) {
            return res.status(400).json({
                success: false,
                message: 'Product image is required'
            });
        }

        // Create new product
        const newProduct = new productModel({
            name,
            description,
            price: Number(price),
            oldprice: oldprice ? Number(oldprice) : undefined,
            category,
            subcategory,
            image: req.imageUrl,
            outOfStock: outOfStock === 'true' || outOfStock === true
        });

        await newProduct.save();

        res.status(201).json({
            success: true,
            message: 'Product added successfully',
            product: newProduct
        });

    } catch (error) {
        console.error('Add product error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.removeProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Product ID is required'
            });
        }

        const product = await productModel.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            message: 'Product removed successfully',
            product
        });

    } catch (error) {
        console.error('Remove product error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.allProducts = async (req, res) => {
    try {
        const products = await productModel.find({}).sort({ createdAt: -1 });

        res.json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {
        console.error('Get all products error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Product ID is required'
            });
        }

        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            product
        });
    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.updateStock = async (req, res) => {
    try {
        const { outOfStock } = req.body;
        const { id } = req.params;

        if (typeof outOfStock !== 'boolean') {
            return res.status(400).json({ success: false, message: "'outOfStock' must be a true or false" });
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            { outOfStock },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Updated successfully", product: updatedProduct });
    } catch (error) {
        console.error('Update stock error:', error);
        res.status(500).json({ success: false, message: "Can't update now, try again later" });
    }
}