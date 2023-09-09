import styles from "./ResultsBlock.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../../components";

export const ResultsBlock = () => {
  const data = useSelector((state) => state.data);
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();
  const startPaginationIndex = useSelector((state) => state.paginationIndex);
  const maxPaginationResults = useSelector((state) => state.paginationCount);
  const localPosts = useSelector((state) => state.posts);
  const dataUrl = useSelector((state) => state.dataUrl);

  const onLoadMore = () => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({
      type: "UPDATE_PAGINATION_INDEX",
      payload: startPaginationIndex + 1,
    });

    fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "UPDATE_DATA", payload: data });
        dispatch({
          type: "ADD_LOCAL_POSTS",
          payload: [...localPosts, ...data.items].splice(0, data?.totalItems),
        });
        dispatch({ type: "IS_LOADING", payload: false });
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      {<p>{dataUrl}</p>}

      {isLoading ? <p>Данные загружаются</p> : ""}

      {data?.totalItems === 0 && !isLoading ? (
        <p>Не найдено таких книг.</p>
      ) : (
        ""
      )}

      {data?.totalItems && data?.totalItems > 0 ? (
        <>
          <p>Всего постов = {data?.totalItems}</p>
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

      {localPosts &&
      !isLoading &&
      data?.totalItems > maxPaginationResults &&
      data?.totalItems !== localPosts.length ? (
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

      {data?.totalItems === localPosts.length && !isLoading ? (
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
