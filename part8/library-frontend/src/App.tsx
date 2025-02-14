import { Route, Routes } from "react-router-dom";
import { Authors, Books, Login, NewBook } from "./pages";
import { Navigation, ProtectedRoute, PublicRoute } from "./components";
import { Recommend } from "./pages/Recommend";

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route index element={<Authors />} />
        <Route path="books" element={<Books />} />
        <Route element={<ProtectedRoute />}>
          <Route path="add" element={<NewBook />} />
          <Route path="recommend" element={<Recommend />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
