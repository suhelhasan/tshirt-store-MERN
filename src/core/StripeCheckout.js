import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";

function StripeCheckout({ products, reload, setReload }) {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });
  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;
    products.map((product) => {
      amount += product.price;
    });
    return amount;
  };

  const showStriptButton = () => {
    return isAuthenticated() ? (
      <button className="btn btn-success">Pay with stripe</button>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };
  return (
    <div>
      <h3 className="text-white">STRIPE ${getFinalAmount()}</h3>
      {showStriptButton()}
    </div>
  );
}

export default StripeCheckout;
