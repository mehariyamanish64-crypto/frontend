import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProductCard.css";

export default function ProductCard({ product, onAddToCart }) {

  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        products: [product]
      }
    });
  };

  const goToProduct = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="product-card">

      {/* Product Image */}
      <img
        src={product.image}   // ✅ FIX HERE
        alt={product.name}
        onClick={goToProduct}
        style={{ cursor: "pointer" }}
        onError={(e)=>{
          e.target.src="https://via.placeholder.com/250?text=No+Image"
        }}
      />

      {/* Product Info */}
      <div
        className="product-info"
        onClick={goToProduct}
        style={{ cursor: "pointer" }}
      >
        <h3>{product.name}</h3>

        <div className="category">
          {product.category}
        </div>

        <p className="price">
          ₹{product.price}
        </p>
      </div>

      {/* Buttons */}
      <div className="product-card-buttons">

        <button
          className="buy-btn"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>

        <button
          className="cart-btn"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>

      </div>

    </div>
  );
}