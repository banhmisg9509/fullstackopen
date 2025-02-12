export const Input = ({ ...props }) => {
  return (
    <input
      {...props}
      className={`border border-black ml-auto px-1 focus:outline-none ${
        props.className || ""
      }`}
    />
  );
};
