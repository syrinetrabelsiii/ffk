import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "../styles/UserBids.css";
import { USER_ID } from "../constants";

const UserBids = () => {
  const [userBids, setUserBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bidsMap, setBidsMap] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem(USER_ID); // Retrieve user ID from local storage
    if (userId) {
      fetchUserBids(userId);
    }
  }, []);

  useEffect(() => {
    fetchAllBids();
  }, []);

  const fetchAllBids = async () => {
    try {
      const response = await api.get("/api/bids/");
      const bids = response.data;
      const bidsMap = {};
      bids.forEach((bid) => {
        bidsMap[bid.id] = bid;
      });
      setBidsMap(bidsMap);
    } catch (error) {
      console.error("Error fetching bids:", error);
    }
  };

  const fetchUserBids = async (userId) => {
    try {
      const response = await api.get(`/api/user-bids/?user=${userId}`);
      console.log("User Bids Response:", response.data); // Log the response data
      setUserBids(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user bids:", error);
      setLoading(false); // Set loading to false even in case of an error
    }
  };

  return (
    <div className="container">
      <h2>Your Bids</h2>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : userBids.length === 0 ? (
        <p>You are not participating in any bids at the moment.</p>
      ) : (
        <div className="user-bids-container">
          {userBids.map((userBid) => (
            <div key={userBid.id} className="user-bid-card">
              <img src={bidsMap[userBid.bid]?.bid_image1} alt="Bid Image" className="bid-image" />
              <div className="bid-details">
                <p className="bid-name">Bid Name: {bidsMap[userBid.bid]?.bid_name}</p>
                <p className="bid-amount">Bid Amount: ${userBid.amount}</p>
                <p className="check-auction-link"><Link to={`/bids/${userBid.bid}`}>Check Auction</Link></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBids;
