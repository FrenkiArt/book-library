import "./App.css";
import { SearchBlock, ResultsBlock } from "./components";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";

/*
TODO:
-Сделать переход на внутренние страницы;
*/

const defaultState = {
  isLoading: false,
  data: null,
  posts: [],
  paginationIndex: 0,
  paginationCount: 30,
  dataUrl: "",
};

//const action = { type: "", payload: "" };
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "UPDATE_DATA":
      return { ...state, data: action.payload };
    case "ADD_LOCAL_POSTS":
      return { ...state, posts: action.payload };
    case "IS_LOADING":
      return { ...state, isLoading: action.payload };
    case "UPDATE_PAGINATION_INDEX":
      return { ...state, paginationIndex: action.payload };
    case "UPDATE_PAGINATION_COUNT":
      return { ...state, paginationCount: action.payload };
    case "UPDATE_DATA_URL":
      return { ...state, dataUrl: action.payload };

    default:
      return state;
  }
};
const store = legacy_createStore(reducer);

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
