import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

export default function Header() {

  return (
    <div className={styles.divContainer}>
      <div title="Search Bar" className={styles.divSearch}>
        <input
        className={styles.input}
          placeholder="Search a game by (name)"
        ></input>
        <button className={styles.button}>Search</button>
      </div>
      <Link to="/Form"><button className={styles.button}>¡Add a game!</button></Link>
    </div>
  );
}
