import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import styles from "./Home.module.css"
import CardsContainer from "./CardsContainer";
import {getGames} from "../redux/actions"


export default function Landing() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getGames())
  },[dispatch])

  return (
    <div className={styles.div}>
      <h1>Estamos en Home!</h1>
      <CardsContainer/>
    </div>
  );
}