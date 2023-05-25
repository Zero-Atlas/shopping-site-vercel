import classes from "./Other.module.css";

export default function Others() {
  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <section>
      {/* other services */}
      <div className={classes.services}>
        <div className={classes.shipping}>
          <h2>FREE SHIPPING</h2>
          <p>Free shipping worldwide</p>
        </div>
        <div className={classes.shipping}>
          <h2>24 X 7 SERVICE</h2>
          <p>Free shipping worldwide</p>
        </div>
        <div className={classes.shipping}>
          <h2>FESTIVAL OFFER</h2>
          <p>Free shipping worldwide</p>
        </div>
      </div>

      {/* call to action */}
      <div className={classes.cta}>
        <div className={classes["cta-text"]}>
          <h1>LET'S BE FRIEND</h1>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
        </div>
        <form onSubmit={submitHandler} className={classes["cta-form"]}>
          <input
            name="email"
            type="email"
            placeholder="Enter your email address"
          />
          <button type="submit">Subcribe</button>
        </form>
      </div>
    </section>
  );
}
