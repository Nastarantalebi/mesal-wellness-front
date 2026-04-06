import { useRef, type Dispatch, type SetStateAction } from "react";
import { PaperclipIcon, SendHorizontalIcon } from "lucide-react";
import type { TChat } from "../../_types/type";
import Modal from "@/components/Headless/Dialog/Modal";
type TProps = {
  handleSend: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  preview: string | null;
  inputValue: TChat;
  setPreview: Dispatch<SetStateAction<string | null>>;
  setInputValue: Dispatch<SetStateAction<TChat>>;
};
export default function UploadImageTickets({
  handleSend,
  handleKeyDown,
  preview,
  setPreview,
  inputValue,
  setInputValue,
}: TProps) {
  const fileInputRef = useRef(null);
  const handleFileSelect = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setInputValue((prev) => ({ ...prev, image: file }));
    // فقط عکس
    if (!file.type.startsWith("image/")) {
      alert("فقط عکس مجاز است!");
      return;
    }
    // پیش‌نمایش بساز
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as SetStateAction<string | null>);
    };
    reader.readAsDataURL(file);

    // input رو پاک کن
    e.target.value = "";
  };

  const removePreview = () => {
    setPreview(null);
    setInputValue((prev) => ({ ...prev, image: null }));
    if (fileInputRef.current) {
      //@ts-ignore
      fileInputRef.current.value = "";
    }
  };
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  return (
    <div className="space-y-3 p-1.5">
      {/* پیش‌نمایش عکس */}
      {preview && (
        <Modal
          open={!!preview}
          close={removePreview}
          title=""
          size="lg"
          cancelBtn={false}>
          <div className="flex flex-col">
            <div className="relative w-full mx-auto bg-gray-50 p-1 rounded-lg border">
              <img
                src={preview}
                alt="پیش‌نمایش"
                className="w-full h-auto object-cover rounded-md"
              />

              <div className="absolute bottom-0 left-0 right-0 flex items-end bg-black/60 dark:bg-neutral-800 rounded-md">
                <button
                  type="button"
                  onClick={handleSend}
                  className="bg-transparent mx-1 mb-3 active:scale-95 transition-transform border-none hover:bg-transparent hover:scale-105 my-1">
                  <SendHorizontalIcon className="text-white h-6 w-6" />
                </button>
                <textarea
                  ref={textareaRef}
                  value={inputValue.message}
                  dir="rtl"
                  onChange={(e) =>
                    setInputValue((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  onKeyDown={handleKeyDown}
                  placeholder="چیزی بنویسید..."
                  className="flex-1 !ring-0 resize-none max-h-10 text-white overflow-y-auto pt-1 pr-1 bg-transparent transition-all outline-none
                   dark:text-gray-100 rounded-xl scrollbar-none placeholder-gray-300 scrollbar-none border-none"
                  style={{ scrollbarWidth: "none" }} // Firefox
                />
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* دکمه Paperclip */}
      <div>
        <button
          type="button"
          className="bg-transparent active:scale-95 transition-transform border-none hover:bg-transparent
           hover:scale:105 my-1 active:border-none active:outline-none"
          //@ts-ignore
          onClick={() => fileInputRef.current?.click()}>
          <PaperclipIcon className=" text-gray-700 dark:text-white h-5 w-5" />
        </button>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
}
