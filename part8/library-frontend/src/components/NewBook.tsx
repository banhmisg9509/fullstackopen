import { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import { ADD_BOOK } from "src/apollo/mutations";
import { useMutation } from "@apollo/client";
import { AUTHORS, BOOKS } from "src/apollo/queries";

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: BOOKS }, { query: AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    await addBook({
      variables: { title, author, published: Number(published), genres },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <>
      <h2 className="text-2xl font-bold">Add books</h2>
      <form onSubmit={submit} className="flex flex-col gap-2 max-w-72">
        <div className="flex">
          title
          <Input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="flex">
          author
          <Input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className="flex">
          published
          <Input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div className="flex">
          <Input
            className="mr-auto ml-0"
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <Button onClick={addGenre} type="button">
            add genre
          </Button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <div>
          <Button type="submit">create book</Button>
        </div>
      </form>
    </>
  );
};

export default NewBook;
