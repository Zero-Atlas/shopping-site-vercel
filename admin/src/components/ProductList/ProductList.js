import { useDispatch } from "react-redux";
import { popupActions } from "../../store/popup";
import { price } from "../UI/transform-text";
import { useSelector } from "react-redux";
import classes from "./ProductList.module.css";
import DetailModal from "../Modal/DetailModal";

export default function ProductList(props) {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.popup.popupIsShow);

  const showModalHandler = (product) => {
    // set showModal to true and passing product for DetailModal use
    dispatch(popupActions.show(product));
  };
  return (
    <ul className={classes.products}>
      {props.products.map((product, i) => (
        <li className={classes.product} key={product._id}>
          <div onClick={showModalHandler.bind(null, product)}>
            <img src={product.img1} alt={product.name} />
            <p className={classes["product-name"]}>{product.name}</p>
            <p className={classes.price}>{price(product.price)} VND</p>
          </div>
        </li>
      ))}
      {showModal && <DetailModal />}
    </ul>
  );
}
