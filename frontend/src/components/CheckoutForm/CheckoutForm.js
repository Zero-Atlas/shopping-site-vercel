import { Form, useRouteLoaderData } from "react-router-dom";
import classes from "./CheckoutForm.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function CheckoutForm(props) {
  const user = useRouteLoaderData("root");
  const listCart = useSelector((state) => state.cart.listCart);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(user.name);
      setPhone(user.phone);
    }
  }, [user]);

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const phoneChangeHandler = (event) => {
    setPhone(event.target.value);
  };
  return (
    <Form className={classes.form} method="post" action="/checkout">
      {props.errorMsg && <p className={classes.error}>{props.errorMsg}</p>}
      <div className={classes["form-control"]}>
        <label>FULL NAME:</label>
        <input
          type="text"
          placeholder="Enter Your Full Name Here!"
          value={name}
          name="name"
          onChange={nameChangeHandler}
        />
      </div>
      <div className={classes["form-control"]}>
        <label>EMAIL:</label>
        <input
          type="text"
          placeholder="Enter Your Email Here!"
          value={email}
          name="email"
          onChange={emailChangeHandler}
        />
      </div>
      <div className={classes["form-control"]}>
        <label>PHONE NUMBER:</label>
        <input
          type="text"
          placeholder="Enter Your Phone Number Here!"
          value={phone}
          name="phone"
          onChange={phoneChangeHandler}
        />
      </div>
      <div className={classes["form-control"]}>
        <label>ADDRESS:</label>
        <input
          type="text"
          placeholder="Enter Your Address Here!"
          name="address"
        />
      </div>
      <input type="hidden" name="cart" value={JSON.stringify(listCart)} />
      <button type="submit">Place Order</button>
    </Form>
  );
}
