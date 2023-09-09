import styles from "./ResultsBlock.module.scss";
import { useSelector } from "react-redux";
import { Post } from "../../components";

export const ResultsBlock = () => {
  const data = useSelector((state) => state.data);
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <>
      {isLoading ? <p>Данные загружаются</p> : ""}

      {data?.items ? <p>Всего постов = {data?.items.length}</p> : ""}

      {data?.totalItems === 0 ? (
        "Не найдено таких книг."
      ) : (
        <div className={styles.listResults}>
          {data?.items.map((post, index) => (
            <Post
              key={index}
              data={post}
            />
          ))}
        </div>
      )}
    </>
  );
};
