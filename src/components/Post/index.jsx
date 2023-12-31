/* eslint-disable react/prop-types */
import styles from "./Post.module.scss";
import { Link } from "react-router-dom";

export const Post = ({ data }) => {
  return (
    <Link
      to={`/post/${data.id}`}
      className={styles.Post}
    >
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
    </Link>
  );
};
