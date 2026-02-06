const mongoose =require('mongoose')
const Schema = mongoose.Schema;


const productModel= new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    oldprice: {
        type: Number
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    outOfStock: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('product', productModel);