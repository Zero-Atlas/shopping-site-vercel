import classes from "./Footer.module.css";
export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes["footer-col"]}>
          <h1>CUSTOMER SERVICES</h1>
          <ul>
            <li>
              <button className={classes["col-item"]}>Help & Contact Us</button>
            </li>
            <li>
              <button className={classes["col-item"]}>Returns & Refunds</button>
            </li>
            <li>
              <button className={classes["col-item"]}>Online Stores</button>
            </li>
            <li>
              <button className={classes["col-item"]}>
                Terms & Conditions
              </button>
            </li>
          </ul>
        </div>
        <div className={classes["footer-col"]}>
          <h1>COMPANY</h1>
          <ul>
            <li>
              <button className={classes["col-item"]}>What We Do</button>
            </li>
            <li>
              <button className={classes["col-item"]}>
                Available Services
              </button>
            </li>
            <li>
              <button className={classes["col-item"]}>Lastest Posts</button>
            </li>
            <li>
              <button className={classes["col-item"]}>FAQs</button>
            </li>
          </ul>
        </div>
        <div className={classes["footer-col"]}>
          <h1>SOCIAL MEDIA</h1>
          <ul>
            <li>
              <button className={classes["col-item"]}>Twitter</button>
            </li>
            <li>
              <button className={classes["col-item"]}>Instagram</button>
            </li>
            <li>
              <button className={classes["col-item"]}>Facebook</button>
            </li>
            <li>
              <button className={classes["col-item"]}>Pinterest</button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
