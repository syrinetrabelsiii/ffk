import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./Bids.css";


const Bids = () => {
  const navigate = useNavigate();
  const [bids, setBids] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchBids();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/api/categories/");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchBids = async () => {
    try {
      const response = await api.get("/api/bids/");
      setBids(response.data); // Assuming response.data is an array of bid objects
    } catch (error) {
      console.error("Error fetching bids:", error);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "";
  };

  const viewProduct = (id) => {
    navigate(`/bids/${id}`);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsSidebarOpen(false); // Close the sidebar when a category is selected
  };

  const handleResetFilter = () => {
    setSelectedCategory(null);
    setIsSidebarOpen(false); // Close the sidebar when resetting filter
  };

  const filteredBids = selectedCategory
    ? bids.filter((bid) => bid.bid_category === selectedCategory)
    : bids;

  return (
    <div className="container">
      <button
        className="toggle-sidebar-btn"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "Close Filters" : "Open Filters"}
      </button>
      <div className={`filter-card ${isSidebarOpen ? "open" : ""}`}>
        <h3 className="filter-title">Shop By Categories</h3>
        <ul>
          <li onClick={handleResetFilter}>All</li>
          {categories.map((category) => (
            <li
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="bids-list">
        {filteredBids.map((bid) => (
          <div key={bid.id} className="bid-item">
            <img
              src={bid.bid_image1}
              alt={bid.bid_name}
              className="img-fluid"
            />
            <h2>{bid.bid_name}</h2>
            <p>
              <strong>Description: {bid.bid_description}</strong>
            </p>
            <p>
              <strong>Starting Price: ${bid.starting_price}</strong>
            </p>
            <p>
              <strong>Entrance Insurance Fee: ${bid.auction_entrance_price}</strong>
            </p>
            <p>
              <strong>Category: {getCategoryName(bid.bid_category)}</strong>
            </p>
            <p>
              <strong>Current Highest Bid:</strong> $
              {bid.highest_bid || "No bids yet"}
            </p>
            <p>
              <strong>Highest Bidder:</strong>{" "}
              {bid.highest_bidder || "No bids yet"}
            </p>
            <button
              onClick={() => viewProduct(bid.id)}
              className="view-product-btn"
            >
              View Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bids;
