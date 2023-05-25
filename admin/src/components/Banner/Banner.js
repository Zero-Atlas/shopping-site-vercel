import { Link } from "react-router-dom";
import classes from "./Banner.module.css";
export default function Banner() {
  return (
    <div className={classes.banner}>
      <div className={classes.textbox}>
        <p>NEW INSPIRATION 2020</p>
        <h1>20% OFF ON NEW SESSON</h1>
        <Link to="/shop" className={classes.button}>
          Browse collection
        </Link>
      </div>
      <img src="assets/images/banner1.jpg" alt="clock banner" />
    </div>
  );
}
