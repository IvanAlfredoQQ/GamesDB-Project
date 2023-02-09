import React from "react";
import styles from "./Landing.module.css";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className={styles.div}>      
      <h1 className={styles.h1}>Henry Videogames Proyect</h1>
      <Link to="/home"><button className={styles.button}>Ingresar</button></Link>
    </div>
  );
}
