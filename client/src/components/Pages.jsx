import React from "react";
import { useSelector } from "react-redux";
import styles from "./Pages.module.css"

export default function Pages(props) {
  const { page, setPage } = props;

  const currentGamesToDisplay = useSelector((state) => state.games);
  const totalPages = currentGamesToDisplay.length / 15;

  function pagePreview() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function pageNext() {
    if(page < totalPages)
    setPage(page + 1);
  }

  return <div title="PageContainer" className={styles.pageContainer}>
    <button className={styles.button}  onClick={()=>{pagePreview()}}> {"<"} </button>
    <button className={styles.buttonStatic} disabled="disabled"  type="button">{page}</button>
    <button className={styles.button}  onClick={()=>{pageNext()}}> {">"} </button>
  </div>;
}
