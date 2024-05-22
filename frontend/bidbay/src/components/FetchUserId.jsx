// FetchUserIdComponent.js

import React, { useEffect } from 'react';
import api from "../api";
import { USER_ID } from "../constants"; // Assuming you have a constants.js file with this key

const FetchUserIdComponent = () => {
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await api.get('/api/userid/'); // Adjust the endpoint based on your URL configuration
        const { user_id } = response.data;
        localStorage.setItem(USER_ID, user_id);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return null; // This component doesn't render anything visible
};

export default FetchUserIdComponent;
