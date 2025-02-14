import { useQuery } from "@apollo/client";
import { useState } from "react";
import { BOOKS, GENRES } from "src/apollo/queries";
import { BooksTable, Button } from "src/components";

export const Books = () => {
  const [genre, setGenre] = useState("");

  const { data: bookData } = useQuery(BOOKS, {
    variables: {
      genre,
    },
    fetchPolicy: "cache-and-network",
  });
  const { data: genresData } = useQuery(GENRES, {
    fetchPolicy: "cache-and-network",
  });

  return (
    <div>
      <h2 className="text-2xl font-bold">Books</h2>
      <BooksTable books={bookData?.allBooks} />
      <h2 className="text-xl font-bold my-2">Filter</h2>
      <div className="flex gap-1">
        {genresData?.allGenres.map((name) => (
          <Button onClick={() => setGenre(name)} key={name}>
            {name}
          </Button>
        ))}
        <Button onClick={() => setGenre("")}>all genres</Button>
      </div>
    </div>
  );
};
