import { useMutation } from "@apollo/client";
import { LOGIN } from "src/apollo/mutations";
import { Button, Input } from "src/components";
import { useField } from "src/hooks/useField";
import { setToken } from "src/stores/token";

export const Login = () => {
  const username = useField();
  const password = useField("password");

  const [login] = useMutation(LOGIN);

  const onSubmit = async (e) => {
    e.preventDefault();

    const { data } = await login({
      variables: { username: username.value, password: password.value },
    });

    setToken(data.login.value);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="max-w-72 flex flex-col gap-2 mt-4">
        <label className="flex">
          username
          <Input {...username} />
        </label>
        <label className="flex">
          password
          <Input {...password} />
        </label>
        <div>
          <Button type="submit">Login</Button>
        </div>
      </form>
    </>
  );
};
