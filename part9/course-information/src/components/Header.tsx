type Props = {
  name: string;
};

export const Header = (props: Props) => {
  return <h1>{props.name}</h1>;
};
