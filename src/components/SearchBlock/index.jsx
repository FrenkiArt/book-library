import { useDispatch, useSelector } from "react-redux";
import styles from "./SearchBlock.module.scss";
import React from "react";
import { MakeUrl } from "../../utils.js/makeurl";

export const SearchBlock = () => {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = React.useState("");
  const [categoryValue, setСategoryValue] = React.useState("");
  const [categoryUrl, setCategoryUrl] = React.useState("");
  const [sortValue, setSortValue] = React.useState(
    useSelector((state) => state.queryObject.sortValue)
  );

  const queryObject = useSelector((state) => state.queryObject);

  const onFormSubmit = (e) => {
    e.preventDefault();

    dispatch({ type: "UPDATE_TOTAL_ITEMS", payload: 0 });
    dispatch({ type: "ADD_LOCAL_POSTS", payload: [] });

    queryObject.paginationIndex = 0;
    queryObject.searchValue = searchValue;
    queryObject.categoryUrl = categoryUrl;
    queryObject.sortValue = sortValue;

    dispatch({
      type: "UPDATE_QUERY_OBJECT",
      payload: {
        ...queryObject,
      },
    });

    const url = MakeUrl(queryObject);

    dispatch({ type: "UPDATE_DATA_URL", payload: url });
    dispatch({ type: "IS_LOADING", payload: true });

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        dispatch({ type: "UPDATE_TOTAL_ITEMS", payload: data.totalItems });
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
