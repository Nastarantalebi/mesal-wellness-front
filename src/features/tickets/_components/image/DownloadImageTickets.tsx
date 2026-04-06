import { ArrowDownIcon, DownloadIcon, XIcon } from "lucide-react";
import { useState } from "react";
type TProps = {
  thumbnail: string;
  image: string;
  captions: string;
};
const DownloadImageTickets = ({ image, thumbnail, captions }: TProps) => {
  const [downloadImg, setDownloadImg] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full p-0.5 mx-auto relative">
      {!downloadImg && (
        <div
          className="absolute inset-0 bg-gray-100/80 flex items-center justify-center m-0.5 rounded-t-2xl"
          onClick={() => setDownloadImg(true)}>
          <ArrowDownIcon className="text-white w-8 h-8 rounded-full bg-gray-900/80 p-1" />
        </div>
      )}
      <div className="w-full mx-auto max-h-[35dvh] min-h-20 bg-white/80 rounded-2xl">
        {downloadImg ? (
          <img
            src={image}
            onClick={() => setOpen(true)}
            alt="image"
            className="block w-full max-h-[35dvh] min-h-[100px] rounded-t-2xl mx-auto cursor-pointer object-cover"
          />
        ) : (
          <img
            src={thumbnail}
            alt="thumbnail"
            className="block w-full max-h-[35dvh] min-h-[100px] rounded-t-2xl mx-auto cursor-pointer object-cover"
          />
        )}
      </div>
      {open && (
        <div
          className="bg-black/85 backdrop-blur fixed inset-0 animate-in fade-in-0 z-[1000]
          zoom-in slide-in-from-top-4 duration-300 ease-out flex items-center justify-center"
          onClick={() => setOpen(false)}>
          <div className="flex items-center justify-center p-2 fixed top-2 left-2">
            <a
              href={image}
              download
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="p-1 flex items-center justify-center cursor-pointer border border-transparent hover:border-blue-500
               transition rounded duration-300">
              <DownloadIcon className="h-5 w-5 text-white" />
            </a>
            <span
              onClick={() => setOpen(false)}
              className="p-1 flex items-center justify-center cursor-pointer border border-transparent hover:border-red-500
               transition rounded duration-300">
              <XIcon className="h-5 w-5 text-white" />
            </span>
          </div>
          <div
            className=" w-[75%] m-auto flex items-center flex-col justify-center p-1"
            onClick={(e) => e.stopPropagation()}>
            <img src={image} alt="image" className="w-fit h-fit object-cover" />
            <p
              className="w-fit p-1 rounded-md mt-1 bg-black/30 overflow-y-auto max-h-28 text-white 
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {captions}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadImageTickets;
