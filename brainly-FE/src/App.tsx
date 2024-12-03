import { useState } from "react";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { CreateContentModal } from "./components/CreateContentModel";
import { PlusIcon } from "./Icons/PlusIcon";
import { ShareIcon } from "./Icons/ShareIcons";

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-end">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(!modalOpen)}
        />

        <Button
          variant="primary"
          text="Add Content"
          startIcon={<PlusIcon />}
          onClick={() => {
            setModalOpen(!modalOpen);
          }}
        ></Button>

        <Button
          variant="secondary"
          text="Share Brain"
          startIcon={<ShareIcon />}
        ></Button>
      </div>
      <div className="flex">
        <Card
          type="twitter"
          link="https://twitter.com/Shefali__J/status/1861298542645780506?ref_src=twsrc%5Etfw"
          title="A Twitter post"
        />
        <Card
          type="youtube"
          link="https://www.youtube.com/embed/Nt-AsZh5woE?si=jswXJzaeQgqrxG3z"
          title="A Youtube Link"
        />
      </div>
    </div>
  );
}

export default App;
