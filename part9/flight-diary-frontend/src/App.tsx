import { AddDiaryForm } from "./components/AddDiaryForm";
import { DaiaryList } from "./components/DaiaryList";

function App() {
  return (
    <div className="flex flex-col gap-4 container mx-auto">
      <AddDiaryForm />
      <DaiaryList />
    </div>
  );
}

export default App;
