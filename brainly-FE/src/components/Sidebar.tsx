import { BrainIcon } from "../Icons/BrainIcon";
import { TwitterIcon } from "../Icons/TwiterIcon";
import { YoutubeIcon } from "../Icons/YoutubeIcon";
import { Sidebaritem } from "./SidebarItem";

export function Sidebar() {
  return (
    <div className="left-0 top-0 h-screen w-56 border-r bg-white">
      <div className="mr-5 flex items-center justify-center pt-10 text-2xl">
        {<BrainIcon />} Brainly
      </div>
      <div>
        <div className="items-center pl-5 pt-4">
          <Sidebaritem text="Twitter" icon={<TwitterIcon />} />
          <Sidebaritem text="Youtube" icon={<YoutubeIcon />} />
        </div>
      </div>
    </div>
  );
}
