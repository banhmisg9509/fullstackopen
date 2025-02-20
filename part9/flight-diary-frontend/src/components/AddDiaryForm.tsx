import { FormEventHandler, useState } from "react";
import { useAddDairy } from "src/stores/dairy";
import { Visibility, Weather } from "src/types";

export const AddDiaryForm = () => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const { mutateAsync: addDairy } = useAddDairy();

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    const newDairyEntry = {
      date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment,
    };

    await addDairy(newDairyEntry);
  };
  return (
    <div>
      <h2 className="text-xl font-bold">Add new entry</h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-1 mt-2 max-w-md">
        <label className="flex items-center gap-10">
          <span className="min-w-16">date</span>
          <input
            type="date"
            className="border pl-2 flex-1"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <div className="flex items-center gap-10">
          <span className="min-w-16">visibility</span>
          <div className="flex gap-2">
            {["great", "good", "ok", "poor"].map((option) => (
              <label key={option} className="flex items-center gap-1">
                {option}
                <input
                  type="radio"
                  name="visibility"
                  value={option}
                  checked={visibility === option}
                  onChange={(e) => setVisibility(e.target.value)}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-10">
          <span className="min-w-16">weather</span>
          <div className="flex gap-2">
            {["sunny", "rainy", "cloudy", "stormy", "windy"].map((option) => (
              <label key={option} className="flex items-center gap-1">
                {option}
                <input
                  type="radio"
                  name="weather"
                  value={option}
                  checked={weather === option}
                  onChange={(e) => setWeather(e.target.value)}
                />
              </label>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-10">
          <span className="min-w-16">comment</span>
          <input
            type="text"
            className="pl-2 border flex-1"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>

        <button type="submit" className="mt-2 border px-4 py-1">
          Submit
        </button>
      </form>
    </div>
  );
};
