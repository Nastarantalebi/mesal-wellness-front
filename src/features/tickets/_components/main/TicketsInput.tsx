import { SendHorizontalIcon } from "lucide-react";
import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import UploadImageTickets from "../image/UploadImageTickets";
import type { TChat } from "../../_types/type";

interface IProps {
  isOpen: boolean;
  inputValue: TChat;
  setInputValue: Dispatch<SetStateAction<TChat>>;
  handleSend: () => void;
  isWaitingResponse: boolean;
  isPending: boolean;
  preview: string | null;
  setPreview: Dispatch<SetStateAction<string | null>>;
}

const TicketsInput = ({
  isOpen,
  inputValue,
  setInputValue,
  handleSend,
  isWaitingResponse,
  isPending,
  preview,
  setPreview,
}: IProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // تنظیم ارتفاع اتوماتیک
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // ابتدا ارتفاع صفر شود
      textarea.style.height = textarea.scrollHeight + "px"; // سپس بر اساس محتوای متن
    }
  }, [inputValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const isDisabled =
    (!inputValue.message?.trim() && !inputValue.image) ||
    isWaitingResponse ||
    isPending;
  return (
    <div className="shrink-0 mb-11 lg:mb-1 dark:bg-neutral-900">
      {isOpen ? (
        <div className="flex items-end bg-black/30 dark:bg-neutral-800 rounded-xl md:ml-1.5">
          <button
            type="button"
            onClick={handleSend}
            disabled={isDisabled}
            className="bg-transparent mx-1 mb-3 active:scale-95 transition-transform border-none hover:bg-transparent hover:scale-105 my-1">
            <SendHorizontalIcon className="text-blue-700 h-6 w-6" />
          </button>
          <textarea
            dir="rtl"
            ref={textareaRef}
            value={inputValue.message}
            onChange={(e) =>
              setInputValue((prev) => ({ ...prev, message: e.target.value }))
            }
            onKeyDown={handleKeyDown}
            placeholder="چیزی بنویسید..."
            className="!ring-0 max-h-12 flex-1 resize-none  overflow-y-auto pt-1 pr-1 bg-transparent transition-all placeholder-gray-700
           dark:placeholder-gray-400 outline-none dark:text-gray-100 rounded-xl scrollbar-none border-none"
            style={{ scrollbarWidth: "none" }}
          />
          <UploadImageTickets
            handleSend={handleSend}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleKeyDown={handleKeyDown}
            setPreview={setPreview}
            preview={preview}
          />
        </div>
      ) : (
        <div className="text-center py-4 text-danger text-sm">
          این تیکت بسته شده است و نمی‌توانید پیام جدید ارسال کنید.
        </div>
      )}
      <style>{`
        textarea::-webkit-scrollbar {
          display: none; 
        }
      `}</style>
    </div>
  );
};

export default TicketsInput;
