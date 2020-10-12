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
        <h1>This is load Product</h1>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removeFromCart={true}
            addtoCart={false}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };
  // const loadCheckout = () => {
  //   return (
  //     <div>
  //       <h1>This is for checkout</h1>
  //     </div>
  //   );
  // };
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
