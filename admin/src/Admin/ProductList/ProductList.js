import { json, useLoaderData } from "react-router-dom";

import classes from "./ProductList.module.css";
import { useEffect, useState } from "react";
import { baseUrl } from "../../store/database";
import { price } from "../../components/UI/transform-text";

export default function ProductList() {
  const products = useLoaderData();
  const [search, setSearch] = useState("");
  const [showedProduct, setShowedProduct] = useState(products);

  const searchChangeHandler = (event) => {
    setSearch(event.target.value);
  };

  //search function
  useEffect(() => {
    const updateProducts = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    setShowedProduct(updateProducts);
  }, [search, products]);
  return (
    <>
      <h3>Products</h3>
      <input
        className={classes.search}
        name="search"
        value={search}
        onChange={searchChangeHandler}
        placeholder="Enter Search!"
      />

      <table className={classes.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Category</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {showedProduct &&
            showedProduct.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{price(product.price)}</td>
                <td>
                  <div className={classes.image}>
                    <img src={product.img1} alt={product.name} />
                  </div>
                </td>
                <td>{product.category}</td>
                <td className={classes.edit}>
                  <button className={classes["update-btn"]}>Update</button>
                  <button className={classes["delete-btn"]}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export async function loader() {
  const respon = await fetch(`${baseUrl}/product/all`, {
    credentials: "include",
    method: "get",
  });
  if (!respon.ok) {
    throw json({ message: "Could not get product data" }, { status: 500 });
  }
  const data = await respon.json();
  return data;
}

