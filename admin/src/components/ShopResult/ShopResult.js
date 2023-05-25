import { useState } from "react";
import ProductList from "../ProductList/ProductList";
import SearchForm from "./SearchForm";
import classes from "./ShopResult.module.css";

export default function ShopResult(props) {
  const itemPerPage = 8;
  const [pages, setPages] = useState(1);
  const maxPages = Math.ceil(props.data.length / itemPerPage);
  const decreaseHandler = () => {
    if (pages > 1) {
      setPages((prev) => prev - 1);
    }
  };
  const increaseHandler = () => {
    if (pages < maxPages) {
      setPages((prev) => prev + 1);
    }
  };

  const filteredData = props.data.filter(
    (_, i) =>
      pages * itemPerPage >= i + 1 && i + 1 >= (pages - 1) * itemPerPage + 1
  );
  return (
    <div className={classes.content}>
      {/* search product and sorting by adding 'q','sort' searchParams */}
      <SearchForm />
      <div className={classes.result}>
        <ProductList products={filteredData} pages={pages} />

        {/* page navigation */}
        <div className={classes["pages-nav"]}>
          <div className={classes["nav-container"]}>
            <button
              disabled={pages === 1}
              className={classes.arrow}
              onClick={decreaseHandler}
            >
              <i className="fa-solid fa-angles-left"></i>
            </button>
            <p className={classes.pages}>{pages}</p>
            <button
              disabled={pages === maxPages}
              className={classes.arrow}
              onClick={increaseHandler}
            >
              <i className="fa-solid fa-angles-right"></i>
            </button>
          </div>
          <p>{`Showing ${pages}-${itemPerPage} of ${props.data.length} results`}</p>
        </div>
      </div>
    </div>
  );
}
