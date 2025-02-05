import { useFilter, setFilter } from "src/stores/filter";
import { Input } from "./Input";

const Filter = () => {
  const filter = useFilter();
  const handleChange = (e) => setFilter(e.target.value);

  return (
    <div className="mb-2 flex items-center">
      <label className="inline-flex gap-1">
        Filter
        <Input type="text" onChange={handleChange} value={filter} />
      </label>
    </div>
  );
};

export default Filter;
