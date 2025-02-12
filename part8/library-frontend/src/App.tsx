import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Routes, Route, NavLink } from "react-router-dom";

const App = () => {
  return (
    <>
      <div className="flex gap-2">
        <NavLink to="/" className="border px-2">
          authors
        </NavLink>
        <NavLink to="books" className="border px-2">
          books
        </NavLink>
        <NavLink to="add" className="border px-2">
          add book
        </NavLink>
      </div>
      <Routes>
        <Route index element={<Authors />} />
        <Route path="books" element={<Books />} />
        <Route path="add" element={<NewBook />} />
      </Routes>
    </>
  );
};

export default App;
