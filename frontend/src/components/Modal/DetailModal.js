import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { popupActions } from "../../store/popup";
import { price } from "../UI/transform-text";
import classes from "./DetailModal.module.css";

const Overlay = (props) => (
  <div className={classes.overlay} onClick={props.onClose}></div>
);

const Modal = (props) => {
  const detailData = useSelector((state) => state.popup.detailData);

  return (
    <div className={classes.modal}>
      <img src={detailData.img1} alt={detailData.name} />
      <div className={classes.detail}>
        <button className={classes.close} onClick={props.onClose}>
          X
        </button>
        <div className={classes.textbox}>
          <h2>{detailData.name}</h2>
          <p className={classes.price}>{price(detailData.price)} VND</p>
          <p className={classes.desc}>{detailData.short_desc}</p>
          <Link to={`/detail/${detailData._id}`} onClick={props.onClose}>
            <i className="fa-solid fa-cart-shopping"></i> View Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function DetailModal() {
  const dispatch = useDispatch();
  const closeHandler = () => {
    dispatch(popupActions.hide());
  };
  return (
    <>
      {createPortal(
        <Overlay onClose={closeHandler} />,
        document.getElementById("overlay")
      )}
      {createPortal(
        <Modal onClose={closeHandler} />,
        document.getElementById("modal")
      )}
    </>
  );
}
