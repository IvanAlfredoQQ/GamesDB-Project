import React, { useState, useEffect } from "react";
import styles from "./Form.module.css";
import { validate } from "./FormValidations"; //import validations
import { useDispatch, useSelector } from "react-redux";
import { postGame, changeLoading, getGenres, getPlatforms } from "../redux/actions";


export default function Form() {
  const dispatch = useDispatch();
  const allGenres = useSelector((state)=>state.genres)
  const allPlatforms = useSelector((state)=>state.platforms)
  console.log()
  const [form, setForm] = useState({
    name: "",
    description: "",
    release: "",
    rating: "",
    background_image: "",
    genres: [],
    platforms: [],
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    release: "",
    //rating: "", //This will never get an error / HTML <input> is preventing "no desired" data
    background_image: "",
    genres: [],
    platforms: [],
  });
    
  useEffect( () => {
    dispatch(changeLoading());
    dispatch(getGenres());
    dispatch(getPlatforms());
  },[dispatch]);

  function onChange(event) {
    //setForm({...form, [event.target.name]:event.target.value}) //without destructuring each value
    const property = event.target.name;
    const value = event.target.value;
    //validate(form) //This didn't work well, it's desync because it first validates "form" and after that setForm makes the input change (so the input i just made it's readed by "validate" in the next change)
    setForm({ ...form, [property]: value });
    setErrors(validate({ ...form, [property]: value })); //so.. i gave validate the same state that is going to be set in this cycle, and modularize validate
  }

  function checkboxChange(event) {
    const property = event.target.name;
    const value = event.target.value;
    let checkboxUpdate = [...form[property]]
    if(event.target.checked){
      checkboxUpdate = [...form[property], value]
    }else{
      checkboxUpdate.splice(form[property].indexOf(value),1);
    }
    setForm({...form, [property]:checkboxUpdate})
  }

  function submitHandler(event) {
    event.preventDefault();
    dispatch(postGame(form));
    setForm({
      name: "",
      description: "",
      released: "",
      background_image: "",
      rating: "",
      genres: [],
      platforms: [],
    });
  }

  return (
    <div className={styles.formBox}>
      <h1 className={styles.h1}>Create game</h1>
      <form onSubmit={(e)=>{submitHandler(e)}}>
        <div className={styles.div}>
          <label className={styles.label}>Name</label>
          <input
            className={styles.input}
            placeholder="Videogame name"
            type="text"
            value={form.name}
            onChange={(e)=>onChange(e)}
            name="name"
          />
          {errors.name && (
            <span className={styles.spanError}>{errors.name}</span>
          )}
        </div>

        <div className={styles.div}>
          <label className={styles.label}>Release date</label>
          <input
            placeholder="YYYY-MM-DD"
            className={styles.input}
            type="text"
            value={form.release}
            onChange={(e)=>onChange(e)}
            name="release"
          />
          {errors.release && (
            <span className={styles.spanError}>{errors.release}</span>
          )}
        </div>

        <div className={styles.div}>
          <label className={styles.label}>Rating</label>
          <input
            className={styles.input}
            placeholder="0,00 - 5,00"
            type="number"
            min="0" //restrics input between 0 up to 5
            max="5" //this will restrain submit until this receive a correct value (words aren't allowed either)
            step=".01" //this allows 2 decimals. I used this to simplifies the "validation" so i don't have to use a Regex
            value={form.rating}
            onChange={(e)=>onChange(e)}
            name="rating"
          />
        </div>

        <div className={styles.div}>
          <label className={styles.label}>Background image (URL)</label>
          <input
            className={styles.input}
            type="text"
            value={form.background_image}
            onChange={(e)=>onChange(e)}
            name="background_image"
          />
          {errors.background_image && (
            <span className={styles.spanError}>{errors.background_image}</span>
          )}
        </div>

        <div className={styles.div}>
          <label className={styles.label}>Description</label>
          <textarea
            placeholder="Description of the game..."
            cols="50"
            rows="4"
            className={styles.input}
            type="text"
            value={form.description}
            onChange={(e)=>onChange(e)}
            name="description"
          />
          {errors.description && (
            <span className={styles.spanError}>{errors.description}</span>
          )}
        </div>
        
        <div className={styles.div} title="Container List">
          <label className={styles.label}>Genres</label>
            <div className={styles.div} title="Genres Container">
              {allGenres.map((e)=>(<div id={e.id}><input type="checkbox" name="genres" onChange={(e)=>{checkboxChange(e)}} value={e.name}/><span>{e.name}</span></div>))}
            </div>
            <label className={styles.label}>Platforms</label>
            <div className={styles.div} title="Platforms Container">
              {allPlatforms.map((e)=>(<div id={e.id}><input type="checkbox" name="platforms" onChange={(e)=>{checkboxChange(e)}} value={e.name}/><span>{e.name}</span></div>))}
            </div>
        </div>

        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>

    </div>
  );
}
