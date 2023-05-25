import { json, useLoaderData } from "react-router-dom";
import PageHeader from "../components/ShopHeader/PageHeader";

import classes from "./History.module.css";
import { useState } from "react";
import { baseUrl } from "../store/database";

export default function HistoryPage() {
  const orders = useLoaderData();
  const [showDetail, setShowDetail] = useState(false);
  const [selectOrder, setSelectOrder] = useState(undefined);

  const viewHandler = (orderId) => {
    setShowDetail((prev) => !prev);
    orders.forEach((order) => {
      if (order._id === orderId) {
        setSelectOrder(order);
      }
    });
  };
  return (
    <div className="container">
      <PageHeader page="HISTORY" />
      <section className={classes.content}>
        {!showDetail && (
          <table className={`${classes.all} ${classes.table}`}>
            <thead>
              <tr>
                <th>id order</th>
                <th>id user</th>
                <th>name</th>
                <th>phone</th>
                <th>address</th>
                <th>total</th>
                <th>delivery</th>
                <th>status</th>
                <th>detail</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const total = order.productList.reduce(
                  (sum, p) => (sum += p.quantity * p.productId.price),
                  0
                );
                return (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.userId}</td>
                    <td>{order.name}</td>
                    <td>{order.phone}</td>
                    <td>{order.address}</td>
                    <td>{priceString(total)} VND</td>
                    <td>Waiting for progressing</td>
                    <td>Waiting for pay</td>
                    <td>
                      <button
                        className={classes.view}
                        onClick={viewHandler.bind(null, order._id)}
                      >
                        View &rarr;
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {showDetail && (
          <div className={classes.detail}>
            <div className={classes.info}>
              <h1>INFORMATION ORDER</h1>
              <p>ID User: {selectOrder.userId}</p>
              <p>Full Name: {selectOrder.name}</p>
              <p>Phone: {selectOrder.phone}</p>
              <p>Address: {selectOrder.address}</p>
              <p>
                Total:{" "}
                {priceString(
                  selectOrder.productList.reduce(
                    (sum, p) => (sum += p.quantity * p.productId.price),
                    0
                  )
                )}{" "}
                VND
              </p>
            </div>
            <div className={classes.table}>
              <table>
                <thead>
                  <tr>
                    <th>PRODUCT ID</th>
                    <th>IMAGE</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>COUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {selectOrder.productList.map((item) => (
                    <tr key={item.productId._id}>
                      <td>{item.productId._id}</td>
                      <td className={classes.image}>
                        <img
                          src={item.productId.img1}
                          alt={item.productId.name}
                        />
                      </td>
                      <td className={classes.name}>{item.productId.name}</td>
                      <td className={classes.price}>
                        {priceString(item.productId.price)} VND
                      </td>
                      <td className={classes.quantity}>
                        <div>
                          <p>{item.quantity}</p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className={classes.back} onClick={viewHandler}>
              Back to all order
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export async function loader() {
  const response = await fetch(`${baseUrl}/order/all`, {
    credentials: "include",
    method: "get",
  });
  if (!response.ok) {
    throw json({ message: "Could not get products data" }, { status: 500 });
  }
  const data = await response.json();
  return data;
}

function priceString(price) {
  return price
    .toString()
    .split("")
    .map((c, i, arr) => ((arr.length - i) % 3 === 0 && i !== 0 ? `.${c}` : c))
    .join("");
}
