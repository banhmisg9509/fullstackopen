import { updateFilter } from "src/store/slices/filter/action";

const Filter = () => {
  const handleChange = (e) => {
    updateFilter(e.target.value);
  };

  return (
    <div style={{ marginBottom: 8 }}>
      filter <input type="text" onChange={handleChange} />
    </div>
  );
};

export default Filter;
