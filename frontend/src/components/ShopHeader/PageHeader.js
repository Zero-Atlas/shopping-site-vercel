import classes from "./PageHeader.module.css";

export default function PageHeader(props) {
  return (
    <section className={classes.header}>
      <div className={classes.logo}>{props.page}</div>
      <div className={classes.page}>{props.page}</div>
    </section>
  );
}
