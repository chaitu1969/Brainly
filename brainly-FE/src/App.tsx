import { Button } from "./components/Button";
import { PlusIcon } from "./Icons/PlusIcon";
import { ShareIcon } from "./Icons/ShareIcons";

function App() {
  return <div> 
    <Button variant="primary" text="Add Content" startIcon={<PlusIcon/>}></Button> 
    <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon/>}></Button>
    </div>;
}

export default App;
