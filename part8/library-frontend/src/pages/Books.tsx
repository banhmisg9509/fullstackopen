import { useQuery, useSubscription } from "@apollo/client";
import { useState } from "react";
import { BOOKS, GENRES } from "src/apollo/queries";
import { ADDED_BOOK } from "src/apollo/subscription";
import { BooksTable, Button } from "src/components";
import { Notification } from "src/components/Notification";
import { pushNotification } from "src/stores/notifaction";
import { useLoggedIn } from "src/stores/token";

export const Books = () => {
  const isLoggedIn = useLoggedIn();
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

  useSubscription(ADDED_BOOK, {
    onData: ({ data, client }) => {
      if (!isLoggedIn) return;

      pushNotification(`New book ${data.data.bookAdded.title} added`);
      client.cache.updateQuery(
        {
          query: BOOKS,
          variables: { genre },
        },
        ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(data.data.bookAdded),
          };
        }
      );
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold">Books</h2>
      <Notification />
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
