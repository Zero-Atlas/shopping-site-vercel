import { useEffect, useState } from "react";
import { json, useLoaderData, useParams } from "react-router-dom";
import DetailForm from "../components/DetailForm/DetailForm";
import ProductList from "../components/ProductList/ProductList";
import { price } from "../components/UI/transform-text";
import classes from "./Detail.module.css";
import { baseUrl } from "../store/database";

export default function DetailPage() {
  const data = useLoaderData();
  const params = useParams();
  const product = data.filter((p) => p._id === params.productId)[0];
  const relatatedProducts = data.filter((p) => p.category === product.category);

  const [currentImg, setCurrentImg] = useState(product.img1);
  useEffect(() => {
    setCurrentImg(product.img1);
  }, [product]);

  const imageList = [product.img1, product.img2, product.img3, product.img4];

  const [showDescription, setShowDescription] = useState(false);

  const descBtnHandler = () => {
    setShowDescription((prev) => !prev);
  };

  const clickImgListHandler = (event) => {
    setCurrentImg(event.target.src);
  };
  return (
    <div className={classes.detail}>
      <div className={`container`}>
        <section className={classes["product-detail"]}>
          {/* review images */}
          <div className={classes.review}>
            <ul className={classes["img-list"]}>
              {imageList.map((url, i) => (
                <li key={i}>
                  <img
                    src={url}
                    alt={product.name}
                    onClick={clickImgListHandler}
                  />
                </li>
              ))}
            </ul>
            <div className={classes["current-img"]}>
              <img src={currentImg} alt={product.name} />
            </div>
          </div>

          {/* Product details */}
          <div className={classes.textbox}>
            <h1>{product.name}</h1>
            <p className={classes.price}>{price(product.price)} VND</p>
            <p className={classes["short-desc"]}>{product.short_desc}</p>
            <p className={classes.category}>
              CATEGORY: <span>{product.category}</span>
            </p>
            <DetailForm product={product} />
          </div>
        </section>
        <section className={classes.description}>
          <button onClick={descBtnHandler}>DESCRIPTION</button>
          {showDescription && <h2>PRODUCT DESCRIPTION</h2>}
          {showDescription && (
            <ul className={classes["desc-list"]}>
              {product.long_desc.split("•").map((p, i) => (
                <li key={i}>
                  <p>{p}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className={classes.related}>
          <h2>RELATED PRODUCTS</h2>
          <ProductList products={relatatedProducts} />
        </section>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  // const response = await fetch(
  //   "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
  // );
  const response = await fetch(`${baseUrl}/product/all`, {
    credentials: "include",
    method: "get",
  });

  if (!response.ok) {
    throw json({ message: "Could not get product data" }, { status: 500 });
  }
  const data = await response.json();
  return data;
}
