import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Home.module.css";
import CardsContainer from "./CardsContainer";
import Pages from "./Pages";
import Header from "../components/Header"
import {
  getGames,
  getGenres,
  getPlatforms,
  orderGamesByName,
  orderGamesByRating,
  changeLoading,
  filterGames,
  filterByGenres,
  reset,
} from "../redux/actions";

export default function Home() {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.genres);
  /*const platforms = useSelector((state) => state.platforms);*/
  //  const displayedGames = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(getGames());
    dispatch(changeLoading());
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);
  

  //Pagination
  const [page, setPage] = useState(1);

  //Selected Values for Order
  function handleSelected(e) {
    const { name, value } = e.target;
    if (name === "order") {
      if (value === "A-Z" || value === "Z-A") {
        dispatch(orderGamesByName(value));
        setPage(1);
      }
      if (value === "0-5" || value === "5-0"){
        dispatch(orderGamesByRating(value))
        setPage(1)
      }
    }
    if (name === "filter") {
      dispatch(filterGames(value));
      setPage(1);
    }
  }

  function genreFilter(e) {
    dispatch(filterByGenres(e.target.value));
  }

  function resetHandler() {
    dispatch(changeLoading());
    dispatch(reset());
    setPage(1);
  }

  return (
    <>
    <div>
        <Header/>
      </div>

    <div className={styles.div}>      
      <h1>Library of Videogames</h1>
      <div className={styles.ordersdiv} title="Container of Filters">
        <div className={styles.order} title="Order div">
        <span className={styles.span}>Order by: </span>
        <select
          className={styles.select}
          name="order"
          defaultValue={"default"}
          onChange={(e) => handleSelected(e)}
        >
          <option value="default" selected disabled hidden>
            Name
          </option>
          <option value="A-Z">A - Z</option>
          <option value="Z-A">Z - A</option>
        </select>
        <select
          className={styles.select}
          name="order"
          defaultValue={"default"}
          onChange={(e) => handleSelected(e)}
        >
          <option value="default" selected disabled hidden>
            Rating
          </option>
          <option value="0-5">0 - 5</option>
          <option value="5-0">5 - 0</option>
        </select></div>
        <div className={styles.filter}>
        <span className={styles.span}>Filter games by: </span>
        <select
          className={styles.select}
          name="filter"
          defaultValue={"default"}
          onChange={(e) => genreFilter(e)}
        >
          <option value="default" selected disabled hidden>
            Genre type
          </option>
          {allGenres?.map((genre) => {
            return <option value={genre.name}>{genre.name}</option>;
          })}
        </select></div>
          <div className={styles.source}>
        <span className={styles.span}>Filter/Source: </span>
        <select
          className={styles.select}
          name="filter"
          defaultValue={"default"}
          onChange={(e) => handleSelected(e)}
        >
          <option value="default" selected disabled hidden>
            My games / Server Games
          </option>
          <option value="ALL">All Games</option>
          <option value="DB">Games created by me</option>
          <option value="API">Games in server</option>
        </select></div>

        <button className={styles.button} onClick={(e) => resetHandler(e)}>
          RESET FILTERS
        </button>
      </div>
      <Pages page={page} setPage={setPage} />
      <CardsContainer CurrentPage={page} />
      <Pages page={page} setPage={setPage} />
    </div>
    </>
  );
}
