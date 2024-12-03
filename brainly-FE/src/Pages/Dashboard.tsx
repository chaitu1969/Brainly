import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { CreateContentModal } from "../components/CreateContentModel";
import { Button } from "../components/Button";
import { PlusIcon } from "../Icons/PlusIcon";
import { ShareIcon } from "../Icons/ShareIcons";
import { Card } from "../components/Card";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BEURL } from "../config";
// import { Button } from "./components/Button";
// import { Card } from "./components/Card";
// import { CreateContentModal } from "./components/CreateContentModel";
// import { PlusIcon } from "./Icons/PlusIcon";
// import { ShareIcon } from "./Icons/ShareIcons";
// import { Sidebar } from "./components/Sidebar";

async function share() {
  const response = await axios.post(
    `${BEURL}/api/v1/brain/share`,
    {
      share: true,
    },
    { headers: { Authorization: localStorage.getItem("token") } },
  );
  const url = `http://localhost:5173/share/${response.data.hash}`;
  alert(url);
}

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const contents = useContent();
  return (
    <div className="flex">
      <aside>
        <Sidebar />
      </aside>
      <main className="h-screen w-screen bg-gray-100">
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
            onClick={async () => {
              share();
            }}
            variant="secondary"
            text="Share Brain"
            startIcon={<ShareIcon />}
          ></Button>
        </div>
        <div className="flex flex-wrap">
          {contents.map(({ type, link, title }, index) => (
            <Card type={type} link={link} title={title} key={index} />
          ))}
        </div>
      </main>
    </div>
  );
}
