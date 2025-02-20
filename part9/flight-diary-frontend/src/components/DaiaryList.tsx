import { useDairy } from "src/stores/dairy";

export const DaiaryList = () => {
  const { data } = useDairy();

  return (
    <div>
      <h2 className="text-xl font-bold">Dairy Entries</h2>
      <div className="flex flex-col gap-4 mt-2">
        {data?.map((dairy) => (
          <div key={dairy.id}>
            <p className="text-lg font-bold">{dairy.date}</p>
            <div className="mt-2">
              <p>visibility: {dairy.visibility}</p>
              <p>weather: {dairy.weather}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
