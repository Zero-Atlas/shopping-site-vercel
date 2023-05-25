import { useActionData, useNavigate } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm/CheckoutForm";
import CheckoutTotal from "../components/CheckoutTotal/CheckoutTotal";
import PageHeader from "../components/ShopHeader/PageHeader";

import classes from "./Checkout.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart";
import { baseUrl } from "../store/database";

export default function CheckoutPage() {
  const actionState = useActionData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    if (!actionState) return;

    if (actionState.state === "success") {
      dispatch(cartActions.destroy());
      setErrorMsg("");
      alert("Your order is created!");
      navigate("/");
      return;
    }

    // handler error
    if (actionState.state === "error") {
      if (actionState.status === 422 || actionState.status === 401) {
        setErrorMsg(actionState.errorMsg);
        return;
      }

      navigate("/error");
    }
  }, [actionState, dispatch, navigate]);

  return (
    <div className="container">
      <PageHeader page="CHECKOUT" />
      <section className={classes.checkout}>
        <h1 className={classes.title}>BILLING DETAILS</h1>
        <div className={classes.content}>
          <CheckoutForm errorMsg={errorMsg} />
          <CheckoutTotal />
        </div>
      </section>
    </div>
  );
}

export async function action({ request }) {
  console.log("checkout");
  const receive = await request.formData();
  const sendData = {
    name: receive.get("name"),
    email: receive.get("email"),
    phone: receive.get("phone"),
    address: receive.get("address"),
    cart: JSON.parse(receive.get("cart")),
  };

  console.log(sendData);

  const respon = await fetch(`${baseUrl}/order/new`, {
    method: "post",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sendData),
  });

  if (!respon.ok) {
    const data = await respon.json();
    return { state: "error", errorMsg: data.errorMsg, status: respon.status };
  }

  return { state: "success" };
}
