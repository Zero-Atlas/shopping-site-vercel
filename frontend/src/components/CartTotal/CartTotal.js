import { useState } from "react";
import { price } from "../UI/transform-text";
import classes from "./CartTotal.module.css";
export default function CartTotal(props) {
  const [coupon, setCoupon] = useState("");
  const couponChangeHandler = (event) => {
    setCoupon(event.target.value);
  };
  return (
    <div className={classes["cart-total"]}>
      <h2 className={classes.title}> CART TOTAL</h2>
      <p className={classes.subtotal}>
        SUBTOTAL
        <span>{price(props.total)} VND</span>
      </p>
      <p className={classes.total}>
        TOTAL
        <span>{price(props.total)} VND</span>
      </p>
      <form>
        <input
          type="text"
          value={coupon}
          onChange={couponChangeHandler}
          placeholder="Enter your coupon"
        />
        <button>
          <i className="fa-solid fa-gift"></i> Apply coupon
        </button>
      </form>
    </div>
  );
}
