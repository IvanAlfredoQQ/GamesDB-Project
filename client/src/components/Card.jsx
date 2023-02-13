import React from 'react'
import styles from "./Card.module.css"
import {NavLink} from "react-router-dom"
export default function Card(props) {
    const {id, name, rating, background_image, genres, /*platforms*/} = props
    //let displayGenres
    //displayGenres = genres.map((e)=>e.name).toString().replaceAll(","," ");
    //The same could be done with platforms
    //let displayPlatforms
    //displayGenres = genres.map((e)=>e.name).toString()

  return (
    <div key={id} className={styles.card}>
      <img className={styles.cardimg} src={background_image} alt="Game IMG" />
        <p>Name: {name}</p>
        <p>Rating: {rating}</p>
        <label>Genres: </label>
        {genres.map((e)=>{return(<button id={e.id}>{e.name}</button>)})}
        {/*<p>Platforms: {platforms}</p>*/}
        <div><NavLink to={`/videogame/${id}`} className={styles.detailLink}>
        More Details
      </NavLink></div>
        
    </div>
  )
}

