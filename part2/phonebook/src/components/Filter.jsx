import PropTypes from "prop-types";

const Filter = ({ filterValue, setFilterValue }) => {
  return (
    <form>
      filter shown with:
      <input
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      />
    </form>
  );
};

Filter.propTypes = {
  filterValue: PropTypes.string,
  setFilterValue: PropTypes.func,
};

export default Filter;
