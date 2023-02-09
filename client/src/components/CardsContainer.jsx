import React from "react";
import styles from "./CardContainer.module.css";
import Card from "./Card";
import { useSelector } from "react-redux";

export default function CardsContainer() {
  const games = useSelector((state) => state.games);

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
