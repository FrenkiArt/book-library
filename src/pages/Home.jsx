import { SearchBlock, ResultsBlock } from "../components";

export const Home = () => {
  return (
    <>
      <div
        id="sec-search"
        className="sec-search"
      >
        <div className="container">
          <SearchBlock />
        </div>
      </div>

      <div className="sec-results">
        <div className="container">
          <ResultsBlock />
        </div>
      </div>
    </>
  );
};
