import React, { useState, useEffect } from "react";
// import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div>
        <h1>Products</h1>
        {products ? (
          products.map((product, index) => (
            <Card
              key={index}
              product={product}
              removeFromCart={true}
              addtoCart={false}
              setReload={setReload}
              reload={reload}
            />
          ))
        ) : (
          <h3>Cart is empty</h3>
        )}
      </div>
    );
  };

  return (
    <Base title="Cart page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">
          {
            <StripeCheckout
              products={products}
              reload={reload}
              setReload={setReload}
            />
          }
        </div>
      </div>
    </Base>
  );
}
