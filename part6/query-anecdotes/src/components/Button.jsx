import PropType from "prop-types";

export const Button = ({ children, ...rest }) => {
  return (
    <button {...rest} className={`border rounded-md px-2  ${rest.className}`}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropType.node,
};
