import React from "react";
import styles from "./CardContainer.module.css";
import Card from "./Card";
import { useSelector } from "react-redux";
import Loading from "./Loading";

export default function CardsContainer() {
  const games = useSelector((state) => state.games);
  const loading = useSelector((state) => state.isLoading);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className={styles.container}>
        {games.map((game) => {
          return (
            <Card
              key={game.id}
              name={game.name}
              rating={game.rating}
              background_image={game.background_image}
            />
          );
        })}
      </div>
    );
  }
}
