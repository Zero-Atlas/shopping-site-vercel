import { NavLink, useNavigate, useRouteLoaderData } from "react-router-dom";
import classes from "./MainNav.module.css";
import { useEffect, useState } from "react";
import { baseUrl } from "../../store/database";

export default function MainNav() {
  const navigate = useNavigate();
  const userData = useRouteLoaderData("root");
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // load dashboard data if valid user logged in
  useEffect(() => {
    if (userData) setIsAuth(true);

    //check if level is admin
    fetch(`${baseUrl}/admin/check-level`, {
      method: "get",
      credentials: "include",
    })
      .then((respon) => {
        if (!respon.ok) {
          throw Error("Fail to check level");
        }
        return respon.json();
      })
      .then((data) => {
        if (data.level === 2) {
          return setIsAdmin(true)
        }
      })
      .catch((err) => console.log(err));
  }, [userData, navigate]);

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
                to={isAdmin?"/":"/chat"}
                disabled={!isAdmin}
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/chat"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Chat
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={classes.logo}>BOUTIQUE</div>
        <nav className={classes.navbar}>
          <ul className={classes.list}>
            {isAuth && (
              <li>
                <NavLink
                  disabled={!isAdmin}
                  to={isAdmin?"/admin":"/chat"}
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Products
                </NavLink>
              </li>
            )}

            {!isAuth && (
              <li>
                <NavLink
                  to="/"
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
