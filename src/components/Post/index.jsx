/* eslint-disable react/prop-types */
import styles from "./Post.module.scss";

export const Post = ({ data }) => {
  return (
    <div className={styles.Post}>
      <div className={styles.PostMedia}>
        <img
          loading="lazy"
          src={
            data?.volumeInfo?.imageLinks?.thumbnail
              ? data.volumeInfo.imageLinks.thumbnail
              : "http://fakeimg.pl/200"
          }
          alt=""
        />
      </div>
      <div className={styles.PostContent}>
        <h3>{data?.volumeInfo?.title}</h3>
        {data?.volumeInfo?.authors ? (
          <p>Авторство: {data.volumeInfo.authors.join(", ")}</p>
        ) : (
          ""
        )}
        {data?.volumeInfo?.categories ? (
          <p>Категории: {data.volumeInfo.categories[0]}</p>
        ) : (
          ""
        )}
        <p>{data?.volumeInfo?.description} </p>
      </div>
    </div>
  );
};
