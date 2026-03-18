import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Cart() {

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);


  const fetchCart = async () => {

    try {

      const res = await axiosInstance.get("/cart");

      setCartItems(res.data);

    } catch (error) {

      console.log("Cart Load Error:", error);

    }

  };


  // Remove single item
  const handleRemove = async (id) => {

    try {

      await axiosInstance.delete(`/cart/remove/${id}`);

      fetchCart();

      alert("Item removed");

    } catch (error) {

      console.log(error);

    }

  };


  // Remove all items
  const handleRemoveAll = async () => {

    try {

      await axiosInstance.delete("/cart/remove-all");

      setCartItems([]);

    } catch (error) {

      console.log(error);

    }

  };


  // Buy single item
  const handleBuyNow = (item) => {

    navigate("/checkout", { state: { products: [item] } });

  };


  // Buy all items
  const handleBuyAll = () => {

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    navigate("/checkout", { state: { products: cartItems } });

  };


  return (

    <div style={{ maxWidth: "600px", margin: "50px auto" }}>

      <h2 style={{ textAlign: "center" }}>Your Cart</h2>

      {cartItems.length === 0 ? (

        <p style={{ textAlign: "center" }}>Cart is empty</p>

      ) : (

        <>

          {cartItems.map((item) => (

            <div
              key={item._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
                padding: "10px",
                background: "#2c2c3e",
                borderRadius: "10px",
                color: "#fff",
              }}
            >

              <img
                src={item.image}
                alt={item.name}
                style={{ width: "50px", height: "50px" }}
              />

              <div style={{ flex: 1, marginLeft: "15px" }}>
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>

                {/* Buy Now */}

                <button
                  onClick={() => handleBuyNow(item)}
                  style={{
                    padding: "6px 12px",
                    background: "#28a745",
                    border: "none",
                    color: "#fff",
                    borderRadius: "6px",
                  }}
                >
                  Buy Now
                </button>

                {/* Remove */}

                <button
                  onClick={() => handleRemove(item._id)}
                  style={{
                    padding: "6px 12px",
                    background: "red",
                    border: "none",
                    color: "#fff",
                    borderRadius: "6px",
                  }}
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

          {/* Bottom Buttons */}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              marginTop: "30px"
            }}
          >

            <button
              onClick={handleBuyAll}
              style={{
                padding: "10px 20px",
                background: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
              }}
            >
              Buy Now All
            </button>

            <button
              onClick={handleRemoveAll}
              style={{
                padding: "10px 20px",
                background: "red",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
              }}
            >
              Remove All
            </button>

          </div>

        </>

      )}

    </div>

  );

}