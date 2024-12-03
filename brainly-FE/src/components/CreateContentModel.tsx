import { useRef, useState } from "react";
import { CrossIcon } from "../Icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BEURL } from "../config";

enum ContentType {
  Youtube = "youtbue",
  Twitter = "twitter",
}

export function CreateContentModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const titleRef = useRef<HTMLInputElement>();
  const linkRef = useRef<HTMLInputElement>();

  const [type, setType] = useState(ContentType.Youtube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(
      `${BEURL}/api/v1/content`,
      { title, link, type },
      { headers: { Authorization: localStorage.getItem("token") } },
    );

    onClose();
  }

  return (
    <div>
      {open && (
        <div className="fixed left-0 top-0 flex h-screen w-screen justify-center bg-slate-500 bg-opacity-50 backdrop-blur-sm">
          <div className="flex flex-col justify-center">
            <span className="rounded-lg bg-slate-50 p-5">
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
                  <CrossIcon />
                </div>
              </div>
              <div>
                <Input referance={titleRef} placeholder={"Title"} />
                <Input referance={linkRef} placeholder={"Link"} />
              </div>
              <h1 className="text-center">Types</h1>
              <div className="flex text-center">
                <Button
                  text="Youtube"
                  variant={
                    type === ContentType.Youtube ? "primary" : "secondary"
                  }
                  onClick={() => {
                    setType(ContentType.Youtube);
                  }}
                />
                <Button
                  text="Twitter"
                  variant={
                    type === ContentType.Twitter ? "primary" : "secondary"
                  }
                  onClick={() => {
                    setType(ContentType.Twitter);
                  }}
                />
              </div>
              <div className="flex justify-center pt-2">
                <Button onClick={addContent} variant="primary" text="Submit" />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
