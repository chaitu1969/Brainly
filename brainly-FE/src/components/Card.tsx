import { ShareIcon } from "../Icons/ShareIcons";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function Card({ link, title, type }: CardProps) {
  return (
    <div>
      <div className="min-w-74 m-3 min-h-48 rounded-md border border-slate-200 bg-white p-2 shadow">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <div className="pr-2 text-gray-500">
              <ShareIcon />
            </div>
            {title}
          </div>
          <div className="flex">
            <div className="pr-2 text-gray-500">
              <a href={link} target="_blank"></a>
              <ShareIcon />
            </div>
            <div className="pr-2 text-gray-500">
              <ShareIcon />
            </div>
          </div>
        </div>

        <div className="pt-4">
          {type === "youtube" && (
            <iframe
              className="w-full"
              src={link.replace("watch", "embed").replace("?v=", "/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoply; modestbranding;  clipboard-write; encrypted-media;  picture-in-picture;"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
}
