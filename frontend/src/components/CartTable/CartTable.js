import { price } from "../UI/transform-text";
import classes from "./CartTable.module.css";
export default function CartTable(props) {
  const cartList = props.data;
  return (
    <div className={classes.table}>
      <table>
        <thead>
          <tr>
            <th>IMAGE</th>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>TOTAL</th>
            <th>REMOVE</th>
          </tr>
        </thead>
        <tbody>
          {cartList &&
            cartList.map((item, i) => (
              <tr key={item.product._id}>
                <td className={classes.image}>
                  <img src={item.product.img1} alt={item.product.name} />
                </td>
                <td className={classes.name}>{item.product.name}</td>
                <td className={classes.price}>
                  {price(item.product.price)} VND
                </td>
                <td className={classes.quantity}>
                  <div>
                    <button
                      className={classes.arrow}
                      onClick={props.onDecrease.bind(null, i)}
                    >
                      <i className="fa-solid fa-caret-left"></i>
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      disable={(item.quantity>=item.product.stock).toString()}
                      className={classes.arrow}
                      onClick={props.onIncrease.bind(null, i,item.quantity>=item.product.stock)}
                    >
                      <i className="fa-solid fa-caret-right"></i>
                    </button>
                  </div>
                </td>
                <td className={classes.total}>
                  {price(item.product.price * item.quantity)} VND
                </td>
                <td className={classes.remove}>
                  <button onClick={props.onDelete.bind(null, i)}>
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {!cartList && (
        <p className={classes["no-product"]}>You has no product in cart!</p>
      )}
    </div>
  );
}
