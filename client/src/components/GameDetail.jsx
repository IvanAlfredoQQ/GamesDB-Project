import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getGameDetails, changeLoading } from "../redux/actions";
import styles from "./GameDetail.module.css";
import Loading from "./Loading";

export default function GameDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeLoading());
    dispatch(getGameDetails(id));
  }, [dispatch, id]);

  const gameDetails = useSelector((state) => state.gameDetails);
  const loading = useSelector((state) => state.isLoading);

  let gameIdGenres = [], gameIdPlatforms = [];

  //load genres
  if (Array.isArray(gameDetails.genres)) {
    gameIdGenres = gameDetails.genres?.map((e) => e.name);
  }
  //load platforms, from DB or API
  if(id.length > 10){
    gameIdPlatforms = gameDetails.platforms?.map((e)=> e.name)  //From DB
  }else{
    gameIdPlatforms = gameDetails.platforms?.map((e) => e.platform.name); //From API
  }
  
  if (loading) {
    return <Loading />;
  } else { //Render DB GAME
    if (id.length > 10) {
      return (
        <div className={styles.divContainer}>
          <div className={styles.divCard}>
            <div className={styles.divCard2}>
              <div>
                <img
                  alt="Game BG"
                  src={gameDetails.background_image}
                  className={styles.image}
                />
              </div>
              <div className={styles.info}>
                <div className={styles.infocomponents} title="imgspace">
                  <img
                    className={styles.gpimage}
                    alt="Gameplay Screenshot"
                    src={gameDetails.background_image}
                  />
                </div>
                <div
                  className={styles.infocomponents}
                  title="title/rating/released"
                >
                  <h1 className={styles.h1}>{gameDetails.name}</h1>
                  <h3>Released in: {gameDetails.release}</h3>
                  <h3>⭐ Rating: {gameDetails.rating} ⭐</h3>
                </div>
                <div className={styles.tags} title="platforms/genres">
                  <div>
                    <h4>Genres: </h4>
                    {gameIdGenres?.map((e) => (
                      <button type="button" className={styles.buttoninfo}>
                        {e}
                      </button>
                    ))}
                  </div>
                  <div>
                    <h4>Platforms: </h4>
                    {gameIdPlatforms?.map((e) => (
                      <button type="button" className={styles.buttoninfo}>
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.description} title="description">
                  <span>{gameDetails.description}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else { //Render API game
      return (
        <div className={styles.divContainer}>
          <div className={styles.divCard}>
            <div className={styles.divCard2}>
              <div>
                <img
                  alt="Game BG"
                  src={gameDetails.background_image}
                  className={styles.image}
                />
              </div>
              <div className={styles.info}>
                <div className={styles.infocomponents} title="imgspace">
                  <img
                    className={styles.gpimage}
                    alt="Gameplay Screenshot"
                    src={gameDetails.background_image_additional}
                  />
                </div>
                <div
                  className={styles.infocomponents}
                  title="title/rating/released"
                >
                  <h1 className={styles.h1}>{gameDetails.name}</h1>
                  <h3>Released in: {gameDetails.released}</h3>
                  <h3>⭐ Rating: {gameDetails.rating} ⭐</h3>
                </div>
                <div className={styles.tags} title="platforms/genres">
                  <div>
                    <h4>Genres: </h4>
                    {gameIdGenres?.map((e) => (
                      <button type="button" className={styles.buttoninfo}>
                        {e}
                      </button>
                    ))}
                  </div>
                  <div>
                    <h4>Platforms: </h4>
                    {gameIdPlatforms?.map((e) => (
                      <button type="button" className={styles.buttoninfo}>
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.description} title="description">
                  <span>{gameDetails.description_raw}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
