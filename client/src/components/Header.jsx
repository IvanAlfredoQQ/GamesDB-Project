import React from "react";
import styles from "./Header.module.css"

export default function Header(props) {

function alerta(){
  alert("Funciona")
}

  return (
    <div className={styles.div}>
      <input></input>
      <button onSubmit={alerta}>Buscar juego</button>
    </div>
  );
}