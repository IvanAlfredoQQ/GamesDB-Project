import React from 'react'
import styles from "./Card.module.css"

export default function Card(props) {
    const {id, name, rating, background_image} = props
  return (
    <div id={id}className={styles.card}>
        <p>Name: {name}</p>
        <p>Rating: {rating}</p>
        <img className={styles.cardimg} src={background_image} alt="Character IMG" />
    </div>
  )
}

