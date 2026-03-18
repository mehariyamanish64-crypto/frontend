import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import "../styles/productDetails.css";

export default function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const res = await axiosInstance.get(`/products/${id}`);

        setProduct(res.data);

        setMainImage(
          res.data.images && res.data.images.length > 0
            ? res.data.images[0]
            : res.data.image
        );

      } catch (err) {

        console.log(err);

      }

    };

    fetchProduct();

  }, [id]);

  if (!product) return <h2>Loading...</h2>;


  // ADD TO CART (MongoDB)
  const handleAddToCart = async () => {

    try {

      await axiosInstance.post("/cart/add", {
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });

      alert(product.name + " added to cart ✅");

    } catch (error) {

      console.log(error);

      alert("Failed to add to cart");

    }

  };


  // BUY NOW → Checkout
  const handleBuyNow = () => {

    const buyProduct = {
      ...product,
      quantity: quantity
    };

    navigate("/checkout", {
      state: {
        products: [buyProduct]
      }
    });

  };


  return (

    <div className="product-page">

      {/* LEFT IMAGE */}
      <div className="product-gallery">

        <img className="main-img" src={mainImage} alt={product.name} />

        <div className="thumbnail">

          {(product.images || [product.image]).map((img, idx) => (

            <img
              key={idx}
              src={img}
              alt=""
              onClick={() => setMainImage(img)}
            />

          ))}

        </div>

      </div>


      {/* RIGHT INFO */}
      <div className="product-info">

        <h2>{product.name}</h2>

        <div className="price-box">

          {product.discount ? (

            <>
              <span className="old-price">₹{product.price}</span>
              <span className="discount">{product.discount}% OFF</span>
              <span className="final-price">
                ₹{Math.round(product.price * (1 - product.discount / 100))}
              </span>
            </>

          ) : (

            <span className="final-price">₹{product.price}</span>

          )}

        </div>


        {/* Quantity */}

        <div className="qty">

          <button
            onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
          >
            -
          </button>

          <span>{quantity}</span>

          <button
            onClick={() => setQuantity(prev => prev + 1)}
          >
            +
          </button>

        </div>


        {/* Buttons */}

        <button
          className="cart-btn"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>

        <button
          className="buy-btn"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>


        <p className="desc">{product.description}</p>


        {/* Back Button */}

        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: "30px",
            padding: "10px 20px",
            background: "#444",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          ← Back
        </button>

      </div>

    </div>

  );

}