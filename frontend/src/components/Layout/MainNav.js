import { NavLink, useNavigate, useRouteLoaderData } from "react-router-dom";
import classes from "./MainNav.module.css";
import { useEffect, useState } from "react";
import { baseUrl } from "../../store/database";

export default function MainNav() {
  const userData = useRouteLoaderData("root");
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (userData) setIsAuth(true);
  }, [userData]);
  
  const navigate = useNavigate();
  const logoutHandler = async () => {
    const respon = await fetch(`${baseUrl}/logout`, {
      method: "post",
      credentials: "include",
    });
    const data = await respon.json();
    if (!respon.ok) {
      console.log(data.errorMsg);
    } else {
      console.log(data.message);
      setIsAuth(false);
      navigate("/login");
    }
  };
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <nav className={classes.navbar}>
          <ul className={classes.list}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/history"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                History
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={classes.logo}>BOUTIQUE</div>
        <nav className={classes.navbar}>
          <ul className={classes.list}>
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <i className="fa-solid fa-cart-flatbed"></i> Cart
              </NavLink>
            </li>
            {!isAuth && (
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  <i className="fa-solid fa-user"></i> Login
                </NavLink>
              </li>
            )}
            {isAuth && (
              <li>
                <button onClick={logoutHandler}>
                  <i className="fa-solid fa-user"></i>
                  {` ${userData.name} (Logout)`}
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
