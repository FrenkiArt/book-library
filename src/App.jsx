import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, PagePost } from "./pages";

export const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/post/:id"
        element={<PagePost />}
      />
      <Route
        path="/*"
        element={<Home />}
      />
    </Routes>
  );
};
