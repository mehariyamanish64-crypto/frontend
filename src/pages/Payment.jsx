const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID, // frontend env
  amount: order.amount,
  currency: order.currency,
  name: "GiftShop",
  description: "Order Payment",
  order_id: order.id,
  handler: function (response) {
    alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
    // TODO: backend me order save karo
  },
  prefill: {
    name: "Customer Name",
    email: "customer@example.com",
    contact: "9999999999",
  },
  theme: {
    color: "#ff9900",
  },
};