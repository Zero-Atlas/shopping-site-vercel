import { Link, json, useLoaderData, useNavigate } from "react-router-dom";

import classes from "./ProductList.module.css";
import { useEffect, useState } from "react";
import { baseUrl } from "../../store/database";
import { price } from "../../components/UI/transform-text";

export default function ProductList() {
  const products = useLoaderData();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showedProduct, setShowedProduct] = useState(products);

  const searchChangeHandler = (event) => {
    setSearch(event.target.value);
  };

  const deleteProductHandler = (prodId) => {

    if (window.confirm("Are you sure to delete this product?")) {
      fetch(`${baseUrl}/admin/product/delete/${prodId}`, {
        method: "delete",
        credentials: "include",
      })
        .then((respon) => {
          if (!respon.ok) {
            throw new Error("Fail to delete.");
          }
          return respon.json();
        })
        .then((data) => {
          alert(data.message);
          return navigate("/admin");
        })
        .catch((err) => {
          console.error(err);
        });
    }
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
                  <Link
                    to={`/admin/edit/${product._id}`}
                    className={classes["update-btn"]}
                  >
                    Update
                  </Link>
                  <button
                    onClick={deleteProductHandler.bind(null, product._id)}
                    className={classes["delete-btn"]}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Link to="/admin/new" className={classes.new}>
        Add New
      </Link>
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
