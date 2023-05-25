import { NavLink, useSearchParams } from "react-router-dom";
import classes from "./ShopSidebar.module.css";

export default function ShopSidebar() {
  const [searchParams] = useSearchParams();
  const brand = searchParams.get("brand");
  const cat = searchParams.get("cat");
  return (
    <div className={classes.sidebar}>
      <h1 className={classes["side-title"]}>CATEGORIES</h1>
      <nav className={classes["main-nav"]}>
        <ul>
          <li>
            <NavLink
              to="/shop?brand=apple"
              className={brand === "apple" ? classes["main-active"] : undefined}
            >
              APPLE
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop?brand=all"
              className={brand === "all" ? classes["main-active"] : undefined}
            >
              ALL
            </NavLink>
          </li>
        </ul>
        {searchParams.get("brand") === "apple" && (
          <nav className={classes["sub-nav"]}>
            <h2>iPHONE & MAC</h2>
            <ul>
              <li>
                <NavLink
                  className={
                    cat === "iphone" ? classes["sub-active"] : undefined
                  }
                  to="/shop?brand=apple&cat=iphone"
                >
                  iPhone
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={cat === "ipad" ? classes["sub-active"] : undefined}
                  to="/shop?brand=apple&cat=ipad"
                >
                  iPad
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={
                    cat === "macbook" ? classes["sub-active"] : undefined
                  }
                  to="/shop?brand=apple&cat=macbook"
                >
                  Macbook
                </NavLink>
              </li>
            </ul>
            <h2>WIRELESS</h2>
            <ul>
              <li>
                <NavLink
                  className={
                    cat === "airpod" ? classes["sub-active"] : undefined
                  }
                  to="/shop?brand=apple&cat=airpod"
                >
                  Airpod
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={
                    cat === "watch" ? classes["sub-active"] : undefined
                  }
                  to="/shop?brand=apple&cat=watch"
                >
                  Watch
                </NavLink>
              </li>
            </ul>
            <h2>OTHERS</h2>
            <ul>
              <li>
                <NavLink
                  className={
                    cat === "mouse" ? classes["sub-active"] : undefined
                  }
                  to="/shop?brand=apple&cat=mouse"
                >
                  Mouse
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={
                    cat === "keyboard" ? classes["sub-active"] : undefined
                  }
                  to="/shop?brand=apple&cat=keyboard"
                >
                  Keyboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={
                    cat === "others" ? classes["sub-active"] : undefined
                  }
                  to="/shop?brand=apple&cat=others"
                >
                  Others
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </nav>
    </div>
  );
}
