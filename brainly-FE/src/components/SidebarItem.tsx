import { ReactElement } from "react";

export function Sidebaritem({
  text,
  icon,
}: {
  text: string;
  icon: ReactElement;
}) {
  return (
    <div className="flex max-w-44 cursor-pointer items-center rounded-lg text-gray-800 transition duration-150 hover:bg-gray-300 hover:text-black">
      <div className="items-center p-2">{icon}</div>
      {text}
    </div>
  );
}
