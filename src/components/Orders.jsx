import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axiosInstance.get("/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h3>Orders</h3>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Products</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.user?.name}</td>
                <td>{order.products.map(p => p.name).join(", ")}</td>
                <td>{order.totalPrice}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}