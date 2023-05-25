import ProductList from "../ProductList/ProductList";
import classes from "./Trending.module.css";

export default function Trending(props) {
  return (
    <section>
      <div className={classes.title}>
        <p>MADE THE HARD WAY</p>
        <h1>TOP TRENDING PRODUCTS</h1>
      </div>
      <div className={classes.trending}>
        <ProductList products={props.products} />
      </div>
    </section>
  );
}
