import Modal from "@/components/Headless/Dialog/Modal";
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
      <div className="w-full mx-auto max-h-[10dvh] md:max-h-[35dvh] min-h-20 bg-white/80 rounded-2xl">
        {downloadImg ? (
          <img
            src={image}
            onClick={() => setOpen(true)}
            alt="image"
            className="block w-full max-h-[10dvh] md:max-h-[35dvh] min-h-[100px] rounded-t-2xl mx-auto cursor-pointer object-cover"
          />
        ) : (
          <img
            src={thumbnail}
            alt="thumbnail"
            className="block w-full max-h-[10dvh] md:max-h-[35dvh] min-h-[100px] rounded-t-2xl mx-auto cursor-pointer object-cover"
          />
        )}
      </div>
      <Modal
        close={() => setOpen(false)}
        showCloseIcon={false}
        open={open}
        title=""
        size="xxl"
        cancelBtn={false}>
        <div
          className="flex items-center justify-center flex-col bg-black/10 rounded p-1"
          onClick={() => setOpen(false)}>
          <div className="flex items-center justify-end w-full mb-1 gap-2">
            <a
              href={image}
              download
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="p-1 flex items-center justify-center cursor-pointer border  border-blue-900 hover:scale-105
               transition rounded duration-300 ">
              <DownloadIcon className="h-5 w-5 " />
            </a>
            <span
              onClick={() => setOpen(false)}
              className="p-1 flex items-center justify-center cursor-pointer border border-red-900 hover:scale-105
               transition rounded duration-300">
              <XIcon className="h-5 w-5 " />
            </span>
          </div>
          <div
            className="w-full m-auto flex items-center flex-col justify-center"
            onClick={(e) => e.stopPropagation()}>
            <img src={image} alt="image" className="w-fit h-fit object-cover" />
            {captions && (
              <p
                className="w-fit px-2 py-1 rounded-md mt-1 bg-gray-700 overflow-y-auto max-h-28 text-white 
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {captions}
              </p>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DownloadImageTickets;
