import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import classes from "./ProductForm.module.css";
import { baseUrl } from "../../store/database";
import { useEffect, useState } from "react";
import useInput from "../../hook/use-input";

export default function ProductForm(props) {
  const param = useParams();
  // const submit = useSubmit();
  const [errorMsg, setErrorMsg] = useState(null);
  const oldData = useLoaderData();

  const navigate = useNavigate();
  const {
    value: name,
    changeHandler: nameChange,
    setEnteredValue: setName,
  } = useInput((val) => val.trim().length > 0);
  const {
    value: cat,
    changeHandler: catChange,
    setEnteredValue: setCategory,
  } = useInput((val) => val.trim().length > 0);
  const {
    value: price,
    changeHandler: priceChange,
    setEnteredValue: setPrice,
  } = useInput((val) => val !=='');
  const {
    value: stock,
    changeHandler: stockChange,
    setEnteredValue: setStock,
  } = useInput((val) => val !=='');
  const {
    value: short,
    changeHandler: shortChange,
    setEnteredValue: setShort,
  } = useInput((val) => val.trim().length > 0);
  const {
    value: long,
    changeHandler: longChange,
    setEnteredValue: setLong,
  } = useInput((val) => val.trim().length > 0);

  useEffect(() => {
    if (oldData) {
      setName(oldData.name);
      setPrice(oldData.price);
      setStock(oldData.stock);
      setCategory(oldData.category);
      setShort(oldData.short_desc);
      setLong(oldData.long_desc);
    }
  }, [oldData]);

  const [photoList, setPhotoList] = useState(null);
  const photos = photoList ? [...photoList] : [];
  const fileChangeHandler = (event) => {
    setPhotoList(event.target.files);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const sendData = new FormData();
    if (photoList) {
      photos.forEach((file, i) => {
        sendData.append(`photo`, file, file.name);
      });
    }

    sendData.append("name", name);
    sendData.append("cat", cat);
    sendData.append("price", price);
    sendData.append("stock", stock);
    sendData.append("short", short);
    sendData.append("long", long);

    fetch(
      `${baseUrl}/admin/product/${props.action}${
        props.action === "new" ? "" : "/" + param.productId
      }`,
      {
        method: "post",
        credentials: "include",
        body: sendData, //FormData
      }
    )
      .then((respon) => {
        if (!respon.ok) {
          if (respon.status === 422) return respon.json();
          throw new Error("Could not fetch add product");
        }
        return respon.json();
      })
      .then((data) => {
        if (data.errorMsg) setErrorMsg(data.errorMsg);
        else {
          setErrorMsg(null);
          alert(`Product ${props.action === "new" ? "created" : "updated"}!`);
          return navigate("/admin");
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes["form-control"]}>
        <label htmlFor="name">Product Name</label>
        <input
          name="name"
          id="name"
          type="text"
          placeholder="Enter Product Name"
          value={name}
          onChange={nameChange}
          require="true"
        />
      </div>
      <div className={classes["form-control"]}>
        <label htmlFor="cat">Category</label>
        <input
          name="cat"
          id="cat"
          type="text"
          placeholder="Enter Category"
          value={cat}
          onChange={catChange}
          require="true"
        />
      </div>
      <div className={classes["form-control"]}>
        <label htmlFor="price">Price</label>
        <input
          name="price"
          id="price"
          type="number"
          placeholder="Enter Price"
          value={price}
          onChange={priceChange}
          require="true"
        />
      </div>
      <div className={classes["form-control"]}>
        <label htmlFor="price">Stock</label>
        <input
          name="stock"
          id="stock"
          type="number"
          placeholder="Enter Stock"
          value={stock}
          onChange={stockChange}
          require="true"
        />
      </div>
      <div className={classes["form-control"]}>
        <label htmlFor="short">Short Description</label>
        <textarea
          name="short"
          id="short"
          rows="4"
          placeholder="Enter Short Description"
          value={short}
          onChange={shortChange}
          require="true"
        />
      </div>
      <div className={classes["form-control"]}>
        <label htmlFor="long">Long Description</label>
        <textarea
          name="long"
          id="long"
          rows="6"
          require="true"
          placeholder="Enter Long Description"
          value={long}
          onChange={longChange}
        />
      </div>
      <div className={classes["form-control"]}>
        <label htmlFor="image">Upload image</label>
        <input
          name="image"
          id="image"
          type="file"
          onChange={fileChangeHandler}
          multiple
        />
      </div>
      {errorMsg && <p className={classes.error}>{errorMsg}</p>}
      <button type="submit" className={classes.submit}>
        Submit
      </button>
    </form>
  );
}

export async function loader({ params }) {
  const productId = params.productId;
  const respon = await fetch(`${baseUrl}/product/detail/${productId}`, {
    method: "get",
    credentials: "include",
  });
  if (!respon.ok) {
    throw new Error("Fail to get product data.");
  }
  return await respon.json();
}
