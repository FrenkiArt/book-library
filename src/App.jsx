import "./App.css";
import { SearchBlock, ResultsBlock } from "./components";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";

/*
TODO:
-Сделать пагинацию;
-Сделать переход на внутренние страницы;
*/

const defaultState = {
  isLoading: false,
  data: null,
};
//const action = { type: "", payload: "" };
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_DATA":
      return { ...state, data: action.payload };
    case "IS_LOADING":
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};
const store = legacy_createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <div className="sec-search">
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
