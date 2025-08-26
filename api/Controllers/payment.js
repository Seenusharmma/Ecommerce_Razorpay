import { Payment } from "../Models/Payment.js";
import Razorpay from "razorpay";
import dotenv from 'dotenv'

dotenv.config()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
}); 

// checkout
export const checkout = async (req, res) => {
  try {
    const { amount, cartItems, userShipping, userId } = req.body;

    if (!amount) {
      return res.status(400).json({ success: false, error: "Amount is required" });
    }

    const options = {
      amount: amount *100 , // amount in the smallest currency unit
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      orderId: order.id,
      amount,
      cartItems,
      userShipping,
      userId,
      payStatus: "created",
    });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};


// verify , save to db
export const verify = async (req, res) => {
  const {
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
  } = req.body;

  let orderConfirm = await Payment.create({
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
    payStatus: "paid",
  });

  res.json({ message: "payment successfull..", success: true, orderConfirm });
};

// user specificorder
export const userOrder = async (req,res) =>{
  let userId = req.user._id.toString();
  // console.log(userId)
  let orders = await Payment.find({ userId: userId }).sort({ orderDate :-1});
  res.json(orders)
}

// user specificorder
export const allOrders = async (req,res) =>{
 
  let orders = await Payment.find().sort({ orderDate :-1});
  res.json(orders)
}