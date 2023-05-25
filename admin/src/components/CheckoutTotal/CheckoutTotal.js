import { useSelector } from "react-redux";
import { price } from "../UI/transform-text";
import classes from "./CheckoutTotal.module.css";

export default function CheckoutTotal() {
  const listCart = useSelector((state) => state.cart.listCart);
  const total = listCart.reduce(
    (sum, item) => (sum += item.quantity * item.product.price),
    0
  );
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>YOUR ORDER</h2>
      <ul>
        {listCart.map((item) => (
          <li key={item.product.name} className={classes.item}>
            {item.product.name}{" "}
            <span>{`${price(item.product.price)} VND x ${item.quantity}`}</span>
          </li>
        ))}
      </ul>
      <p className={classes.total}>
        {" "}
        TOTAL <span>{`${price(total)} VND`}</span>
      </p>
    </div>
  );
}

