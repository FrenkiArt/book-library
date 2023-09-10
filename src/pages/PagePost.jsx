import { Link, useParams } from "react-router-dom";
import { FullPost } from "../components";
import { useSelector } from "react-redux";

export const PagePost = () => {
  const { id } = useParams();

  const localPosts = useSelector((state) => state.posts);

  const post = localPosts.find((post) => {
    return post.id === id;
  });

  return (
    <div className="sec-full-post">
      <div className="container">
        <p>
          <Link to={`/`}>На главную</Link>
        </p>

        {post ? <FullPost data={post} /> : <h4>Такой книги не найдено.</h4>}
      </div>
    </div>
  );
};
