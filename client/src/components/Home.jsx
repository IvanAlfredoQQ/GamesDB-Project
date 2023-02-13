import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import styles from "./Home.module.css"
import CardsContainer from "./CardsContainer";
import {changeLoading, getGames, getGenres, getPlatforms } from "../redux/actions"


export default function Home() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(changeLoading())
    dispatch(getGames())
    dispatch(getGenres());
    dispatch(getPlatforms());
  },[dispatch])

  return (
    <div className={styles.div}>
      <h1>Library of Videogames</h1>
      <CardsContainer/>
    </div>
  );
}