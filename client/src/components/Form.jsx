import React, { useState } from "react";
import axios from "axios";
import styles from "./Form.module.css";
import {validate} from "./FormValidations" //import validations

export default function Form() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    release: "",
    rating: "",
    background_image: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    release: "",
    rating: "",
    background_image: "",
  });

  function onChange(event) {
    //setForm({...form, [event.target.name]:event.target.value}) //without destructuring each value
    const property = event.target.name;
    const value = event.target.value;
    //validate(form) //This didn't work well, it's desync because it first validates "form" and after that setForm makes the input change (so the input i just made it's readed by "validate" in the next change)
    setForm({ ...form, [property]: value });
    setErrors(validate({ ...form, [property]: value })); //so.. i gave validate the same state that is going to be set in this cycle, and modularize validate 
  }

  

  function submitHandler(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3001/videogames", form) //i send form to my backend, with the obj "form"
      .then((res) => alert(res.data))
      .catch((err) => alert(err));
  }

  return (
    <div className={styles.formBox}>
      <h1 className={styles.h1}>Create game</h1>
      <form onSubmit={submitHandler}>
        <div className={styles.div}>
          <label className={styles.label}>Name</label>
          <input
            className={styles.input}
            type="text"
            value={form.name}
            onChange={onChange}
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
            onChange={onChange}
            name="release"
          />{errors.release && (
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
            onChange={onChange}
            name="rating"
          />
        </div>

        <div className={styles.div}>
          <label className={styles.label}>Background image</label>
          <input
            className={styles.input}
            type="text"
            value={form.background_image}
            onChange={onChange}
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
            onChange={onChange}
            name="description"
          />{errors.description && (
            <span className={styles.spanError}>{errors.description}</span>
          )}
        </div>

        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}
