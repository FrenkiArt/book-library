import styles from "./ResultsBlock.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../../components";
import { MakeUrl } from "../../utils.js/makeurl";

export const ResultsBlock = () => {
  const dispatch = useDispatch();
  const totalItems = useSelector((state) => state.totalItems);
  const isLoading = useSelector((state) => state.isLoading);
  const localPosts = useSelector((state) => state.posts);
  /* const dataUrl = useSelector((state) => state.dataUrl); */
  const queryObject = useSelector((state) => state.queryObject);

  const onLoadMore = () => {
    queryObject.paginationIndex =
      queryObject.paginationIndex + queryObject.paginationCount;

    dispatch({
      type: "UPDATE_QUERY_OBJECT",
      payload: {
        ...queryObject,
      },
    });

    const newUrl = MakeUrl(queryObject);

    dispatch({ type: "UPDATE_DATA_URL", payload: newUrl });

    dispatch({ type: "IS_LOADING", payload: true });

    fetch(newUrl)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        dispatch({
          type: "ADD_LOCAL_POSTS",
          payload: [...localPosts, ...data.items],
        });
        dispatch({ type: "IS_LOADING", payload: false });
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      {/* {<p>{dataUrl}</p>} */}

      {isLoading ? <p>Данные загружаются</p> : ""}

      {totalItems === 0 && !isLoading ? <p>Не найдено таких книг.</p> : ""}

      {!isLoading &&
      totalItems > queryObject.paginationCount &&
      totalItems !== localPosts.length ? (
        <>
          <p>
            <button
              onClick={onLoadMore}
              type="button"
            >
              Load more
            </button>
          </p>
        </>
      ) : (
        ""
      )}

      {localPosts && localPosts.length > 0 ? (
        <>
          <p>Всего постов = {totalItems}</p>
          <p>Здесь постов {localPosts.length}</p>

          <div className={styles.listResults}>
            {localPosts.map((post, index) => (
              <Post
                key={index}
                data={post}
              />
            ))}
          </div>
        </>
      ) : (
        ""
      )}

      {!isLoading &&
      totalItems > queryObject.paginationCount &&
      totalItems !== localPosts.length ? (
        <>
          <p>
            <button
              onClick={onLoadMore}
              type="button"
            >
              Load more
            </button>
          </p>
        </>
      ) : (
        ""
      )}

      {localPosts && totalItems === localPosts.length && !isLoading ? (
        <>
          <p>Вы достигли конца</p>
          <p>Все {localPosts.length} книжек здесь.</p>
          <p>
            <a href="#sec-search">Всплыть</a>
          </p>
        </>
      ) : (
        ""
      )}
    </>
  );
};
