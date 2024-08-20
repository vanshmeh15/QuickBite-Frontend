import axios from "axios";
import { StoreContext } from "../../context/StoreContext.jsx";
import "./PlaceOrder.css";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function PlaceOrder() {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const onChangeHander = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {

    event.preventDefault();

    const orderItems = [];

    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      } 
    }); 

    
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 10,  
    };
    
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token }
    });

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    }
    else {
      alert("Failed to place order. Please try again later.");
    }
  };

  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate("/cart");
    }
    else if (getTotalCartAmount() === 0){
      navigate("/cart")
    }
  },[token])

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            required
            onChange={onChangeHander}
            value={data.firstName}
            name="firstName"
            placeholder="First Name"
          />
          <input
            type="text"
            required
            onChange={onChangeHander}
            value={data.lastName}
            name="lastName"
            placeholder="Last Name"
          />
        </div>
        <input
          type="email"
          required
          onChange={onChangeHander}
          value={data.email}
          name="email"
          placeholder="Email address"
        />
        <input
          type="text"
          required
          onChange={onChangeHander}
          value={data.street}
          name="street"
          placeholder="street"
        />
        <div className="multi-fields">
          <input
            type="text"
            required
            onChange={onChangeHander}
            value={data.city}
            name="city"
            placeholder="City"
          />
          <input
            type="text"
            required
            onChange={onChangeHander}
            value={data.state}
            name="state"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            required
            onChange={onChangeHander}
            value={data.zip}
            name="zip"
            placeholder="Zip-code"
          />
          <input
            type="text"
            required
            onChange={onChangeHander}
            value={data.country}
            name="country"
            placeholder="Country"
          />
        </div>
        <input
          type="text"
          required
          onChange={onChangeHander}
          value={data.phone}
          name="phone"
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total">
              <h2>Cart Total</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery fee</p>
                  <p>${getTotalCartAmount() === 0 ? 0 : 10}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>
                    $
                    {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 10}
                  </b>
                </div>
              </div>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}
