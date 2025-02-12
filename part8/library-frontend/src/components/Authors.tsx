import { useMutation, useQuery } from "@apollo/client";
import { AUTHORS } from "src/apollo/queries";
import { Input } from "./Input";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { EDIT_AUTHOR } from "src/apollo/mutations";

const Authors = () => {
  const [name, setName] = useState("");
  const [year, setYear] = useState(1970);

  const { data } = useQuery(AUTHORS);
  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: AUTHORS }],
  });

  const handleUpdateAuthor = async (e) => {
    e.preventDefault();

    await updateAuthor({
      variables: {
        name,
        setBornTo: Number(year),
      },
    });

    setName(data.allAuthors[0].name);
    setYear(1970);
  };

  useEffect(() => {
    if (data) {
      setName(data.allAuthors[0].name);
    }
  }, [data]);

  return (
    <div>
      <h2 className="text-2xl font-bold">Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data?.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="text-xl font-bold mt-4">Set birthyear</h3>
      <form
        className="flex flex-col gap-2 max-w-72"
        onSubmit={handleUpdateAuthor}
      >
        <label className="flex gap-1">
          <span>name</span>
          <select
            className="w-52 ml-auto border border-black px-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          >
            {data?.allAuthors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex gap-1">
          <span> year</span>
          <Input
            className="w-52"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </label>
        <div>
          <Button type="submit">update author</Button>
        </div>
      </form>
    </div>
  );
};

export default Authors;
