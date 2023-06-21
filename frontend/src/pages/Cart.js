import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartTable from "../components/CartTable/CartTable";
import CartTotal from "../components/CartTotal/CartTotal";
import PageHeader from "../components/ShopHeader/PageHeader";
import { cartActions } from "../store/cart";
import classes from "./Cart.module.css";

export default function CartPage() {
  const cartList = useSelector((state) => state.cart.listCart);
  const dispatch = useDispatch();

  const decreaseHandler = (index) => {
    dispatch(cartActions.update({ update: -1, index: index }));
    if (cartList[index].quantity === 0) {
      dispatch(cartActions.delete(index));
    }
  };
  const increaseHandler = (index,disabled) => {
    if(disabled) return
    dispatch(cartActions.update({ update: 1, index: index }));
  };
  const deleteHandler = (index) => {
    dispatch(cartActions.delete(index));
  };

  const total = cartList.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );
  return (
    <div className="container">
      <PageHeader page="CART" />
      <section className={classes.cart}>
        <h1 className={classes.title}>SHOPPING CART</h1>
        <div className={classes.content}>
          <CartTable
            data={cartList}
            onDecrease={decreaseHandler}
            onIncrease={increaseHandler}
            onDelete={deleteHandler}
          />
          <CartTotal total={total} />
        </div>
      </section>
      <section className={classes.action}>
        <Link to="/shop">
          <i className="fa-solid fa-arrow-left-long"></i> Countinue shopping
        </Link>
        <Link to="/checkout">
          Proceed to checkout <i className="fa-solid fa-arrow-right-long"></i>
        </Link>
      </section>
    </div>
  );
}
