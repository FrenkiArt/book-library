/* eslint-disable react/prop-types */
import styles from "./FullPost.module.scss";

export const FullPost = ({ data }) => {
  return (
    <div className={styles.FullPost}>
      <p className={styles.PostMedia}>
        <img
          loading="lazy"
          src={
            data?.volumeInfo?.imageLinks?.thumbnail
              ? data.volumeInfo.imageLinks.thumbnail
              : "http://fakeimg.pl/200"
          }
          alt=""
        />
      </p>
      <div className={styles.PostContent}>
        <h3>{data?.volumeInfo?.title}</h3>
        {data?.volumeInfo?.authors ? (
          <p>Авторство: {data.volumeInfo.authors.join(", ")}</p>
        ) : (
          ""
        )}
        {data?.volumeInfo?.categories ? (
          <p>Категории: {data.volumeInfo.categories.join(", ")}</p>
        ) : (
          ""
        )}
        <p>{data?.volumeInfo?.description} </p>
      </div>
    </div>
  );
};
