import { useDispatch, useSelector } from "react-redux";
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
  const [startPaginationIndex, setStartPaginationIndex] = React.useState(0);

  const maxPaginationResults = useSelector((state) => state.paginationCount);
  const dataUrl = `${bookApiUrl}?q=intitle:${searchValue}${categoryUrl}&langRestrict=ru&startIndex=${String(
    startPaginationIndex
  )}&maxResults=${String(
    maxPaginationResults
  )}&orderBy=${sortValue}&key=${apiKey}`;

  dispatch({ type: "UPDATE_DATA_URL", payload: dataUrl });

  const onFormSubmit = (e) => {
    e.preventDefault();

    setStartPaginationIndex(0);

    dispatch({
      type: "UPDATE_PAGINATION_INDEX",
      payload: startPaginationIndex,
    });
    dispatch({ type: "IS_LOADING", payload: true });

    fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch({ type: "UPDATE_DATA", payload: data });
        dispatch({ type: "ADD_LOCAL_POSTS", payload: data?.items });
        dispatch({ type: "IS_LOADING", payload: false });
      })
      .catch((error) => console.error(error));
  };

  return (
    <form
      className={styles.form}
      onSubmit={onFormSubmit}
      autoComplete="off"
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
