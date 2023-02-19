import React from "react";
import styles from "./Card.module.css";
import { NavLink } from "react-router-dom";
export default function Card(props) {
  const { id, name, rating, background_image, genres /*platforms*/ } = props;
  
  return (
    <div key={id} className={styles.card}>
      <div className={styles.divCard}>
        <div className={styles.divCard2}>
          <img
            className={styles.cardimg}
            src={background_image}
            alt="Game IMG"
          />
          <h3 className={styles.h3}>{name}</h3>
          <h4>⭐{rating}⭐</h4>
          {genres?.map((e) => {   
            return (
              <button className={styles.tag} key={id}>
                {e}
              </button>
            );
          })} 
          <div style={{ padding: "10px" }}>
            <NavLink to={`/videogame/${id}`} className={styles.detailLink}>
              More Details
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
