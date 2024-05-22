import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import useCurrentUser from "../hooks/UseCurrentUser";
import Carousel from "react-bootstrap/Carousel";
import "../styles/BidDetails.css";
import Image from "react-bootstrap/Image";
import Container from "../components/Container";

const BidDetails = () => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [bid, setBid] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  if (!currentUser) {
    navigate("/login", { state: { from: location } });
  }

  useEffect(() => {
    fetchBidDetails();
  }, []);

  const fetchBidDetails = async () => {
    try {
      const response = await api.get(`/api/bids/${id}`);
      const bidData = response.data;
      setBid(bidData);
      fetchCategoryName(bidData.bid_category);
      console.log(bidData);
    } catch (error) {
      console.error("Error fetching bid details:", error);
    }
  };

  const fetchCategoryName = async (categoryId) => {
    try {
      const response = await api.get(`/api/categories/${categoryId}`);
      setCategoryName(response.data.name);
    } catch (error) {
      console.error("Error fetching category name:", error);
    }
  };

  const handleBid = async () => {
    try {
      if (!currentUser) {
        console.error("User information not found.");
        return;
      }

      const userId = currentUser.id;

      if (!userId) {
        console.error("User ID not found.");
        return;
      }

      const response = await api.post("/api/user-bids/", {
        bid: bid.id,
        amount: bidAmount,
        user: userId,
      });
      alert("Bid placed successfully");
      setBidAmount("");
      setErrorMessage("");
      fetchBidDetails();
    } catch (error) {
      console.error("Error placing bid:", error);
      setErrorMessage("Failed to place bid. Please try again.");
    }
  };

  return (
    <div className="container">
      {bid ? (
        <div className="bid-details">
          <div className="right-side">
            <Carousel slide={false}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={bid.bid_image1}
                  alt="First slide"
                  Style={"max-height: 500px"}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={bid.bid_image2}
                  alt="First slide"
                  Style={"max-height: 500px"}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={bid.bid_image3}
                  alt="First slide"
                  Style={"max-height: 500px"}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={bid.bid_image4}
                  alt="First slide"
                  Style={"max-height: 500px"}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={bid.bid_image5}
                  alt="First slide"
                  Style={"max-height: 500px"}
                />
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="left-side">
            <div className="bidinfo">
              <h2>{bid.bid_name}</h2>
              <p>
                <strong>Description:</strong> {bid.bid_description}
              </p>
              <p>
                <strong>Starting Price:</strong> ${bid.starting_price}
              </p>
              <p>
                <strong>Entrace Insurance Fee:</strong> $
                {bid.auction_entrance_price}
              </p>
              <p>
                <strong>Current Highest Bid:</strong> $
                {bid.highest_bid || "No bids yet"}
              </p>
              <p>
                <strong>Highest Bidder:</strong>{" "}
                {bid.highest_bidder || "No bids yet"}
              </p>
              <p>
                <strong>Category:</strong> {categoryName}
              </p>
            </div>

            <div className="bid-form">
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Enter your bid"
              />
              <button onClick={handleBid} className="place-bid-btn">
                Place Bid
              </button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
          </div>
        </div>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
};

export default BidDetails;
