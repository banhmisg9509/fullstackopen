import { useQuery } from "@apollo/client";
import { BOOKS } from "src/apollo/queries";

const Books = () => {
  const { data } = useQuery(BOOKS);

  return (
    <div>
      <h2 className="text-2xl font-bold">Books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data?.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
