import React from "react";
import styles from "./CardsContainer.module.css";
import Card from "./Card";
import { useSelector } from "react-redux";
import Loading from "./Loading";

export default function CardsContainer(props) {
  const { CurrentPage } = props;

  const games = useSelector((state) => state.games);
  const loading = useSelector((state) => state.isLoading);

  function createPagination(totalGames, CurrentPage) {
    let start = (CurrentPage - 1) * 15;
    let end = start + 15;
    return totalGames.slice(start, end);
  }

  const gamesPerPage = createPagination(games, CurrentPage);
  
  console.log(gamesPerPage)
  if (loading) {
    return <Loading />;
  } else {
    if (gamesPerPage.length > 0) {
      return (
        <div className={styles.container}>
          {gamesPerPage?.map((game) => {
            return (
              <Card
                id={game.id}
                key={game.id}
                name={game.name}
                rating={game.rating}
                background_image={game.background_image}
                genres={game.genres}
                platforms={game.platforms}
              />
            );
          })}
        </div>
      );
    } else {
      return (
        <div className={styles.container}>
          <h1>Filters/Orders selected do not apply with a game in DataBase</h1>
        </div>
      );
    }
  }
}
