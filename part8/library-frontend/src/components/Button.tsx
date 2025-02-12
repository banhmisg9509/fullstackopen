export const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`border border-black px-2 active:bg-gray-100 ${props.className}`}
    >
      {children}
    </button>
  );
};
