import React from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import Stripe from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";

function StripeCheckout({ products, reload, setReload }) {
  // const [data, setData] = useState({
  //   loading: false,
  //   success: false,
  //   error: "",
  //   address: "",
  // });
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const authToken = isAuthenticated() && isAuthenticated().token;

  const getFinalAmount = () => {
    let amount = 0;
    products &&
      // eslint-disable-next-line array-callback-return
      products.map((product) => {
        amount += product.price;
      });
    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("PAYMENT SUCCESS");
        const orderData = {
          products: products,
          transaction_id: response.id,
          amount: response.amount,
        };
        createOrder(userId, authToken, orderData);
        cartEmpty(() => {
          console.log("CLEANUP DONE");
        });
        setReload(!reload);
      })
      .catch((err) => console.log(err));
  };

  const showStriptButton = () => {
    return isAuthenticated() ? (
      <Stripe
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Buy Tshirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with stripe</button>
      </Stripe>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };
  return (
    <div>
      <h3 className="text-white">Total ${getFinalAmount()}</h3>
      {showStriptButton()}
    </div>
  );
}

export default StripeCheckout;
