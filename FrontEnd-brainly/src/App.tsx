import "./App.css";
import { PlusIcon } from "./components/icons/Plusicon";
import { Button } from "./components/ui/Button";

function App() {
  return (
    <div className="flex">
      <Button
        startIcon={<PlusIcon size="md" />}
        varient={"secondary"}
        size={"sm"}
        text={"First"}
      />
      <Button varient={"primary"} size={"md"} text={"Second"} />
      <Button varient={"secondary"} size={"lg"} text={"Third"} />
    </div>
  );
}

export default App;
