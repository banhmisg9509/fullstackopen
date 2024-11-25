import PropTypes from "prop-types";

const Header = (props) => {
  return <h1>{props.name}</h1>;
};

Header.propTypes = {
  name: PropTypes.string,
};

export default Header;
