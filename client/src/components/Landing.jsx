import React from "react";
import styles from "./Landing.module.css";
import { Link } from "react-router-dom";

export default function Landing(props) {
  return (
    <div className={styles.div}>      
      <h1 className={styles.h1}>Henry Videogames Proyect</h1>
      <Link to="/videogames"><button onClick={()=>props.login} className={styles.button}>Ingresar</button></Link>
    </div>
  );
}
