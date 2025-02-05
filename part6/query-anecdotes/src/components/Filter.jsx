import { useFilter, setFilter } from "src/stores/filter";

const Filter = () => {
  const filter = useFilter();
  const handleChange = (e) => setFilter(e.target.value);

  return (
    <div style={{ marginBottom: 8 }}>
      filter <input type="text" onChange={handleChange} value={filter} />
    </div>
  );
};

export default Filter;
