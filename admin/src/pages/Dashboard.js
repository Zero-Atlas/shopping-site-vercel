import { useNavigate, useRouteLoaderData } from "react-router-dom";
import classes from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import { baseUrl } from "../store/database";
import { price } from "../components/UI/transform-text";

export default function Dashboard() {
  const userData = useRouteLoaderData("root");
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  let totalEarn = 0;
  if (dashboardData) {
    totalEarn = dashboardData.OrderList.reduce(
      (sum, order) => (sum += order.total),
      0
    );
  }
  console.log(dashboardData);

  // load dashboard data if valid user logged in
  useEffect(() => {
    if (!userData) {
      return navigate("/login");
    }
    //check if level is adviser
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
        if (data.level === 1) {
          alert("Adviser account can only use chat function.");
          return navigate("/chat");
        }
      })
      .catch((err) => console.log(err));

    //load data
    fetch(`${baseUrl}/admin/dashboard`, {
      method: "get",
      credentials: "include",
    })
      .then((respon) => {
        if (!respon.ok) {
          throw Error("Fail to fetch dashboard");
        }
        return respon.json();
      })
      .then((data) => {
        setDashboardData(data);
      })
      .catch((err) => console.log(err));
  }, [userData, navigate]);

  return (
    <div className={classes.container}>
      <h1>Dashboard</h1>
      {dashboardData && (
        <div className={classes.infoBoard}>
          <div className={classes.info}>
            <p>
              {dashboardData.ClientCounter}
              <span>Clients</span>
            </p>
            <div className={classes.icon}>
              <i className="fa-solid fa-user-plus"></i>
            </div>
          </div>

          <div className={classes.info}>
            <div>
              <p className={classes.earning}>
                {price(totalEarn)}
                <span>VND</span>
              </p>
              <span>Earnings of Month</span>
            </div>
            <div className={classes.icon}>
              <i className="fa-solid fa-dollar-sign"></i>
            </div>
          </div>

          <div className={classes.info}>
            <p>
              {dashboardData.OrderList.length}
              <span>New Order</span>
            </p>
            <div className={classes.icon}>
            <i className="fa-regular fa-file"></i>
            </div>
          </div>
        </div>
      )}
      {dashboardData && (
        <div className={classes.history}>
          <h2>History</h2>
          <table>
            <thead>
              <tr>
                <th>ID User</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Total</th>
                <th>Delivery</th>
                <th>Status</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.OrderList.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.name}</td>
                  <td>{order.phone}</td>
                  <td>{order.address}</td>
                  <td>{price(order.total)}</td>
                  <td>Not delivery</td>
                  <td>Not pay</td>
                  <td>
                    <button className={classes.view}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
