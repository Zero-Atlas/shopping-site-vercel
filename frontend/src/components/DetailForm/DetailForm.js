import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";
import { Form } from "react-router-dom";
import classes from "./DetailForm.module.css";
export default function DetailForm(props) {
  const cartList = useSelector((state) => state.cart.listCart);
  let currentProductInCart = 0;
  cartList.forEach((p) => {
    if (p.product._id === props.product._id) currentProductInCart = p.quantity;
  });
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const decreaseHandler = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const increaseHandler = () => {
    setQuantity((prev) => prev + 1);
  };
  const quantityChangeHandler = () => {};

  const addHandler = (event) => {
    event.preventDefault();
    dispatch(cartActions.add({ product: props.product, quantity: quantity }));
    alert(`${quantity} ${props.product.name} added to your cart!`);
  };
  return (
    <div>
      <p className={classes.stock}>Max stock: {props.product.stock}</p>
      <Form className={classes.form}>
        <label htmlFor="detail-quantity">QUANTITY:</label>
        <button className={classes.arrow} onClick={decreaseHandler}>
          <i className="fa-solid fa-caret-left"></i>
        </button>
        <input
          type="text"
          name="quantity"
          id="detail-quantity"
          value={quantity}
          onChange={quantityChangeHandler}
          readOnly
        />
        <button className={classes.arrow} onClick={increaseHandler}>
          <i className="fa-solid fa-caret-right"></i>
        </button>
        <button
          disabled={quantity + currentProductInCart > props.product.stock}
          className={classes.add}
          onClick={addHandler}
        >
          Add to cart
        </button>
      </Form>
    </div>
  );
}
