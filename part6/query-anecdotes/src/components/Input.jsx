import PropType from "prop-types";

export const Input = ({ children, ...rest }) => {
  return (
    <input {...rest} className="border rounded-md px-2 py-1 h-7 focus:outline-none" />
  );
};

Input.propTypes = {
  children: PropType.node,
};
