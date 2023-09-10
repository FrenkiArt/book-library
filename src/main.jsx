import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";

const defaultState = {
  isLoading: false,
  totalItems: null,
  posts: [],
  dataUrl: "",
  queryObject: {
    paginationIndex: 0,
    paginationCount: 30,
    bookApiUrl: "https://www.googleapis.com/books/v1/volumes/",
    searchValue: "",
    categoryUrl: "",
    sortValue: "relevance",
    apiKey: "AIzaSyC4l95VMvkKs4z7z-e2tAYySUwpeSgu1iM",
  },
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "UPDATE_TOTAL_ITEMS":
      return { ...state, totalItems: action.payload };
    case "ADD_LOCAL_POSTS":
      return { ...state, posts: action.payload };
    case "IS_LOADING":
      return { ...state, isLoading: action.payload };
    case "UPDATE_DATA_URL":
      return { ...state, dataUrl: action.payload };
    case "UPDATE_QUERY_OBJECT":
      return { ...state, queryObject: action.payload };

    default:
      return state;
  }
};
const store = legacy_createStore(reducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
