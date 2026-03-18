import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";

export default function Checkout() {

const navigate = useNavigate();
const location = useLocation();
const [cart, setCart] = useState([]);

useEffect(() => {
if (location.state && location.state.products) {
setCart(location.state.products);
}
}, [location]);

const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

const handlePayment = async () => {

try {

const res = await axiosInstance.post("/orders/create-order", {
amount: totalAmount
});

const orderData = res.data;
const razorpayOrder = orderData.razorpayOrder;

const options = {

key: "rzp_test_SNu5v4Q0mXARq1",

amount: razorpayOrder.amount,
currency: razorpayOrder.currency,
name: "Gift Shop",
description: "Order Payment",

order_id: razorpayOrder.id,

handler: async function (response) {

await axiosInstance.post("/orders/payment-success", {

razorpayPaymentId: response.razorpay_payment_id,
razorpayOrderId: response.razorpay_order_id,
razorpaySignature: response.razorpay_signature,

orderId: orderData.orderId

});

alert("Payment Successful");

navigate("/orders");

},

prefill: {
name: "Customer",
email: "customer@gmail.com",
contact: "9999999999"
},

theme: {
color: "#3399cc"
}

};

const rzp = new window.Razorpay(options);

rzp.on("payment.failed", function (response) {

alert("Payment Failed");

console.log(response.error);

});

rzp.open();

} catch (error) {

console.log(error);

}

};

return (

<div>

<h2>Checkout Page</h2>

{cart.map((item, index) => (

<div key={index}>

<p>{item.name}</p>
<p>Price: ₹{item.price}</p>
<p>Quantity: {item.quantity}</p>

</div>

))}

<h3>Total Amount : ₹{totalAmount}</h3>

<button onClick={handlePayment}>
Pay Now
</button>

</div>

);

}