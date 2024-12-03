// Controlled component

import { CrossIcon } from "../Icons/CrossIcon";
import { Button } from "./Button";

export function CreateContentModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div>
      {open && (
        <div className="fixed left-0 top-0 flex h-screen w-screen justify-center bg-slate-500 opacity-80">
          {/* <CrossIcon onClick={() => {}} /> */}
          <div className="flex flex-col justify-center">
            <span className="rounded-lg bg-slate-50 p-5 opacity-100">
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
                  <CrossIcon />
                </div>
              </div>
              <div>
                <Input placeholder={"Title"} />
                <Input placeholder={"Link"} />
              </div>
              <div className="flex justify-center pt-2">
                <Button variant="primary" text="Submit" />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({
  onChange,
  placeholder,
}: {
  onChange?: () => void;
  placeholder: string;
}) {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        className="px-4 py-2"
        onChange={onChange}
      />
    </div>
  );
}
