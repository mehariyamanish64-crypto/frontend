import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import "../styles/Products.css";

const categories = [
  "Personalized Gifts",
  "Home Decor & Accents",
  "Handmade & Artisanal",
  "Corporate & Office",
  "Seasonal & Festive",
  "Gourmet & Edibles",
  "Toys & Games",
  "Fashion & Accessories",
  "Wellness & Self-Care",
  "Stationery & Paper Goods",
];

export default function Products() {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();


  // Fetch Products
  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const url = selectedCategory
          ? `/products/category/${encodeURIComponent(selectedCategory)}`
          : "/products";

        const res = await axiosInstance.get(url);

        setProducts(res.data);
        setFilteredProducts(res.data);

      } catch (error) {
        console.log("Product Fetch Error:", error);
      }

    };

    fetchProducts();

  }, [selectedCategory]);


  // SEARCH
  useEffect(() => {

    const term = searchTerm.toLowerCase();

    if (!term) {
      setFilteredProducts(products);
      setSuggestions([]);
      return;
    }

    const matched = products.filter((p) =>
      p.name.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    );

    setFilteredProducts(matched);

    const sug = products
      .filter((p) => p.name.toLowerCase().includes(term))
      .slice(0,5);

    setSuggestions(sug);

  }, [searchTerm, products]);


  const handleSuggestionClick = (name) => {

    setSearchTerm(name);

    const matched = products.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );

    setFilteredProducts(matched);
    setSuggestions([]);

  };


  // ADD TO CART
  const handleAddToCart = async (product) => {

    try {

      await axiosInstance.post("/cart/add", {
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });

      alert(product.name + " added to cart");

    } catch (error) {

      console.log("Cart Error:", error.response?.data || error.message);
      alert("Failed to add to cart");

    }

  };


  // BUY NOW
  const handleBuyNow = (product) => {

    navigate("/checkout", {
      state: {
        products: [product]
      }
    });

  };


  return (

    <div className="products-container">

      <h1>Products</h1>

      {/* SEARCH */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Search gifts, toys, decor..."
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
        />

        {suggestions.length > 0 && (

          <div className="suggestion-box">

            {suggestions.map((item)=>(

              <div
                key={item._id}
                className="suggestion-item"
                onClick={()=>handleSuggestionClick(item.name)}
              >
                {item.name}
              </div>

            ))}

          </div>

        )}

      </div>


      {/* CATEGORY */}

      <div className="category-menu">

        <button
          className={selectedCategory === "" ? "active" : ""}
          onClick={()=>setSelectedCategory("")}
        >
          All
        </button>

        {categories.map((cat)=>(

          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={()=>setSelectedCategory(cat)}
          >
            {cat}
          </button>

        ))}

      </div>


      {/* PRODUCTS */}

      <div className="product-grid">

        {filteredProducts.length > 0 ? (

          filteredProducts.map((product)=>(

            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />

          ))

        ) : (

          <p className="not-found">
            ❌ Product not found
          </p>

        )}

      </div>

    </div>

  );

}