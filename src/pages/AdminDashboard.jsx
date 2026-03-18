import { useState, useEffect } from "react";
import AddProduct from "./AddProduct";
import axios from "../api/axiosInstance";
import "./AdminDashboard.css";

export default function AdminDashboard() {

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showManageProducts, setShowManageProducts] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showPayments, setShowPayments] = useState(false);

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);

  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  // Fetch payments
  const fetchPayments = async () => {
    try {
      const res = await axios.get("/payments");
      setPayments(res.data);
    } catch (err) {
      console.error("Error fetching payments", err);
    }
  };

  useEffect(() => {
    if (showManageProducts) fetchProducts();
    if (showOrders) fetchOrders();
    if (showPayments) fetchPayments();
  }, [showManageProducts, showOrders, showPayments]);

  // Delete product
  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await axios.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowAddProduct(true);
    setShowManageProducts(false);
  };

  const handleAfterSave = () => {
    fetchProducts();
    setEditingProduct(null);
    setShowAddProduct(false);
  };

  return (
    <div className="admin-dashboard">

      <h2>Admin Dashboard</h2>

      <div className="admin-buttons">

        <button
          className="toggle-add-product-btn"
          onClick={()=>{
            setShowAddProduct(true);
            setShowManageProducts(false);
            setShowOrders(false);
            setShowPayments(false);
          }}
        >
          Add Product
        </button>

        <button
          className="toggle-manage-product-btn"
          onClick={()=>{
            setShowManageProducts(true);
            setShowAddProduct(false);
            setShowOrders(false);
            setShowPayments(false);
          }}
        >
          Manage Product
        </button>

        <button
          className="toggle-order-btn"
          onClick={()=>{
            setShowOrders(true);
            setShowAddProduct(false);
            setShowManageProducts(false);
            setShowPayments(false);
          }}
        >
          Order Details
        </button>

        <button
          className="toggle-payment-btn"
          onClick={()=>{
            setShowPayments(true);
            setShowAddProduct(false);
            setShowManageProducts(false);
            setShowOrders(false);
          }}
        >
          Payment Details
        </button>

      </div>

      {/* Add Product */}
      {showAddProduct && (
        <AddProduct
          editingProduct={editingProduct}
          afterSave={handleAfterSave}
        />
      )}

      {/* Manage Products */}
      {showManageProducts && (
        <div className="product-table-container">

          <h3>All Products</h3>

          <table className="product-table">

            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {products.length > 0 ? (
                products.map((product)=>(
                  <tr key={product._id}>

                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.discount || 0}</td>
                    <td>{product.category}</td>

                    <td>

                      <button
                        className="edit-btn"
                        onClick={()=>handleEdit(product)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={()=>handleDelete(product._id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No Products Found</td>
                </tr>
              )}

            </tbody>

          </table>

        </div>
      )}

      {/* Orders */}
      {showOrders && (
        <div className="product-table-container">

          <h3>Order Details</h3>

          <table className="product-table">

            <thead>
              <tr>
                <th>User</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {orders.map((order)=>(
                <tr key={order._id}>
                  <td>{order.user}</td>
                  <td>{order.total}</td>
                  <td>{order.status}</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

      {/* Payments */}
      {showPayments && (
        <div className="product-table-container">

          <h3>Payment Details</h3>

          <table className="product-table">

            <thead>
              <tr>
                <th>Order ID</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {payments.map((payment)=>(
                <tr key={payment._id}>
                  <td>{payment.orderId}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.status}</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}