import { useDispatch } from "react-redux";
import styles from "./SearchBlock.module.scss";
import React from "react";

export const SearchBlock = () => {
  const bookApiUrl = "https://www.googleapis.com/books/v1/volumes/";
  const [searchValue, setSearchValue] = React.useState("");
  const [categoryValue, setСategoryValue] = React.useState("");
  const [categoryUrl, setCategoryUrl] = React.useState("");
  const [sortValue, setSortValue] = React.useState("relevance");
  const apiKey = "AIzaSyC4l95VMvkKs4z7z-e2tAYySUwpeSgu1iM";
  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();

    dispatch({ type: "IS_LOADING", payload: true });

    fetch(
      `${bookApiUrl}?q=intitle:${searchValue}${categoryUrl}&langRestrict=ru&maxResults=40&orderBy=${sortValue}&key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        /* console.log(data); */
        dispatch({ type: "ADD_DATA", payload: data });
        dispatch({ type: "IS_LOADING", payload: false });
      })
      .catch((error) => console.error(error));
  };

  return (
    <form
      className={styles.form}
      onSubmit={onFormSubmit}
    >
      <div className={styles.blockInputSearch}>
        <input
          className={styles.search}
          type="search"
          name="search"
          placeholder="search"
          required
          value={searchValue}
          onInput={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit">Submit</button>
      </div>

      <div className={styles.blockSelect}>
        <div>Категория</div>
        <select
          name="category"
          value={categoryValue}
          onChange={(e) => {
            if (e.target.value === "all") {
              setСategoryValue("");
              setCategoryUrl("");
            } else {
              setСategoryValue(e.target.value);
              setCategoryUrl(`+subject:${e.target.value}`);
            }
          }}
        >
          <option value="all">All</option>
          <option value="art">Art</option>
          <option value="biography">Biography</option>
          <option value="computers">Computers</option>
          <option value="history">History</option>
          <option value="medical">Medical</option>
          <option value="poetry">Poetry</option>
        </select>
      </div>

      <div className={styles.blockSelect}>
        <div>Сортировка</div>
        <select
          name="sort"
          value={sortValue}
          onChange={(e) => {
            setSortValue(e.target.value);
          }}
        >
          <option value="relevance">Relevance</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </form>
  );
};
