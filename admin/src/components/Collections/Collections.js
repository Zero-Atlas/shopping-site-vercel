import { Link } from "react-router-dom";
import classes from "./Collections.module.css";

export default function Collections() {
  return (
    <section>
      <div className={classes.title}>
        <p>CAREFULLY CREATED COLLECTIONS</p>
        <h1>BROWSE OUR CATEGORIES</h1>
      </div>
      <div className={classes.collections}>
        <Link
          to="/shop"
          className={`${classes["collection-item"]} ${classes["big-item"]}`}
        >
          <img src="assets/images/product_1.png" alt="iphone" />
        </Link>
        <Link
          to="/shop"
          className={`${classes["collection-item"]} ${classes["big-item"]}`}
        >
          <img src="assets/images/product_2.png" alt="mac" />
        </Link>
        <Link
          to="/shop"
          className={`${classes["collection-item"]} ${classes["small-item"]}`}
        >
          <img src="assets/images/product_3.png" alt="ipad" />
        </Link>
        <Link
          to="/shop"
          className={`${classes["collection-item"]} ${classes["small-item"]}`}
        >
          <img src="assets/images/product_4.png" alt="watch" />
        </Link>
        <Link
          to="/shop"
          className={`${classes["collection-item"]} ${classes["small-item"]}`}
        >
          <img src="assets/images/product_5.png" alt="airpods" />
        </Link>
      </div>
    </section>
  );
}
