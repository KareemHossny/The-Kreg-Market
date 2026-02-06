const orderModel = require("../models/order");
const userModel = require("../models/user");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const SUPPORTED_CURRENCIES = ["usd", "egp"];

let currency = 'egp'; 
const deliveryCharge = 10

exports.getUserOrders=async(req,res)=>{
    try {
        const userId = req.user.id;
        console.log("Queried userId:", userId);
        const orders= await orderModel.find({userId: String(userId)});
        console.log("Orders found:", orders);
        res.json({success:true,orders});
    } catch (error) {
        res.json({success:false,message:"Error happend"});
    }
}

exports.placeOrder=async(req,res)=>{
    try {
        const { items, amount, address } = req.body;
        const userId = req.user.id;
        const orderData = 
        { 
            userId: String(userId),
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment: false,
            date: Date.now() 
        }
            const newOrder= new orderModel(orderData)
            await newOrder.save()

            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true,message:"Order Placed"})
    } catch (error) {
        console.error("Order placement error:", error);
        res.status(500).json({ success: false, message: "Order failed", error: error.message });
    }
}

exports.placeOrderStripe = async(req, res)=> {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            return res.status(500).json({ success: false, message: "Stripe secret key not set in backend." });
        }
        const { items, amount, address } = req.body;
        const userId = req.user.id;
        const {origin} = req.headers
        const orderData = 
        { 
            userId: String(userId),
            items,
            amount,
            address,
            paymentMethod:"stripe",
            payment: false,
            date: Date.now() 
        }
        const newOrder= new orderModel(orderData)
        await newOrder.save()
        let stripeCurrency = currency;
        if (!SUPPORTED_CURRENCIES.includes(stripeCurrency)) {
            stripeCurrency = 'usd';
        }

        const line_items = items.map((item)=>(
            {
                price_data:{
                    currency:stripeCurrency,
                    product_data:{
                        name:item.name
                    },unit_amount:item.price*100
                },quantity:item.quantity
            }
        ))
        line_items.push({
            price_data:{
                currency:stripeCurrency,
                product_data:{
                    name:'Delivery Charges'
                },unit_amount:deliveryCharge*100
            },quantity:1
        })

            const session = await stripe.checkout.sessions.create({
                success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
                line_items,
                mode:'payment'
            })
            res.json({success:true,session_url:session.url})
    } catch (error) {
        console.error("Order placement error:", error);
        res.status(500).json({ success: false, message: "Order failed", error: error.message });
    }
}


exports.getAdminOrders=async(req,res)=>{
    try {
        const orders = await orderModel.find({}).sort({ date: -1 });
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching all orders:", error);
        res.status(500).json({ success: false, message: "Error fetching orders", error: error.message });
    }
}


exports.updateStatus=async(req,res)=>{
    try {
        const { orderId, status } = req.body;
        if (!orderId || !status) {
            return res.status(400).json({ success: false, message: "orderId and status are required" });
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, message: "Order status updated", order: updatedOrder });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ success: false, message: "Error updating order status", error: error.message });
    }
}