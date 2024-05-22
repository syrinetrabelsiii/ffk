import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function UploadItem() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [starting_price, setStarting_price] = useState("");
  const [agreeChecked, setAgreeChecked] = useState(false);

  const createItem = (e) => {
    e.preventDefault();
    if (!agreeChecked) {
      alert("Please agree to the terms before submitting.");
      return;
    }
    api
      .post("/api/items/", {
        name: name,
        description: description,
        starting_price: parseInt(starting_price),
      })
      .then((res) => {
        if (res.status === 201) {
          alert("Item Submitted!");
          navigate("/user");

        } else {
          alert("Failed to submit item");
        }
      })
      .catch((err) => {
        alert("Error submitting item: " + err);
      });
  };

  return (
    <div>
      <form onSubmit={createItem}>
        <label htmlFor="name">Item Name</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Type item name"
        />
        <br />
        <label htmlFor="description">Item description</label>
        <br />
        <input
          type="text"
          id="description"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Item description"
        />
        <br />
        <label htmlFor="starting_price">Starting price</label>
        <br />
        <input
          type="number"
          id="starting_price"
          name="starting_price"
          onChange={(e) => setStarting_price(e.target.value)}
          value={starting_price}
          placeholder="00"
        />
        <br />
        <button className="" type="submit">
          Submit Item
        </button>
        <div className="checkbox">
          <input
            type="checkbox"
            id="agree"
            name="agree"
            checked={agreeChecked}
            onChange={(e) => setAgreeChecked(e.target.checked)}
          />
          <label htmlFor="agree">
            Agree to send images and location separately to our email
          </label>
        </div>
      </form>
    </div>
  );
}

export default UploadItem;