import React from "react";
import styles from "./Error.module.css"
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>Error 404</h1>
      <h1 className={styles.h1}>What you are looking for... is not here</h1>
      <Link to="/videogames"><button className={styles.button}>Back to "Videogames"</button></Link>
    </div>
  );
}
