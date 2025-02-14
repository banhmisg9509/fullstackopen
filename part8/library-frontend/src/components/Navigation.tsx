import { NavLink } from "react-router-dom";
import { clearToken, useLoggedIn } from "src/stores/token";
import { Button } from "./Button";

export const Navigation = () => {
  const isLoggedIn = useLoggedIn();

  return (
    <div className="flex gap-2">
      <NavLink
        to="/"
        className="cursor-pointer border border-black px-2 active:bg-gray-100"
      >
        authors
      </NavLink>
      <NavLink
        to="books"
        className="cursor-pointer border border-black px-2 active:bg-gray-100"
      >
        books
      </NavLink>
      {isLoggedIn && (
        <NavLink
          to="add"
          className="cursor-pointer border border-black px-2 active:bg-gray-100"
        >
          add book
        </NavLink>
      )}
      {isLoggedIn && (
        <NavLink
          to="recommend"
          className="cursor-pointer border border-black px-2 active:bg-gray-100"
        >
          recommend
        </NavLink>
      )}
      {isLoggedIn && <Button onClick={() => clearToken()}>logout</Button>}
      {!isLoggedIn && (
        <NavLink
          to="login"
          className="cursor-pointer border border-black px-2 active:bg-gray-100"
        >
          login
        </NavLink>
      )}
    </div>
  );
};
