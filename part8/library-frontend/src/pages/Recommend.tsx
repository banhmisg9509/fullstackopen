import { useQuery } from "@apollo/client";
import { BOOKS, ME } from "src/apollo/queries";
import { BooksTable } from "src/components";

export const Recommend = () => {
  const { data: meData } = useQuery(ME);
  const { data: booksData } = useQuery(BOOKS, {
    variables: {
      genre: meData?.me.favoriteGenre,
    },
    skip: !meData?.me,
  });
  return (
    <>
      <h2 className="text-2xl font-bold">recommendatinos</h2>
      <p className="my-2">
        books in your favorite genre <strong>{meData?.me.favoriteGenre}</strong>
      </p>
      <BooksTable books={booksData?.allBooks} />
    </>
  );
};
