import Button from "@/components/Button";
import { SendHorizontal } from "lucide-react";
import { useEffect, useRef } from "react";

interface TicketsInputProps {
  isOpen: boolean;
  message: string;
  setMessage: (msg: string) => void;
  handleSend: () => void;
  isWaitingResponse: boolean;
  isPending: boolean;
}

const TicketsInput = ({
  isOpen,
  message,
  setMessage,
  handleSend,
  isWaitingResponse,
  isPending,
}: TicketsInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // تنظیم ارتفاع اتوماتیک
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // ابتدا ارتفاع صفر شود
      textarea.style.height = textarea.scrollHeight + "px"; // سپس بر اساس محتوای متن
    }
  }, [message]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-shrink-0 mb-11 lg:mb-1">
      {isOpen ? (
        <div className="flex items-end bg-gray-300 dark:bg-neutral-800 rounded-xl p-2">
          <textarea
            ref={textareaRef}
            dir="rtl"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="چیزی بپرسید..."
            className="flex-1 resize-none max-h-60 overflow-y-auto py-1 place-content-center pr-4 bg-transparent transition-all placeholder-gray-700 dark:placeholder-gray-400 outline-none dark:text-gray-100 rounded-xl scrollbar-none"
            style={{ scrollbarWidth: "none" }} // Firefox
          />
          <Button
            type="button"
            onClick={handleSend}
            disabled={!message.trim() || isWaitingResponse || isPending}
            className="w-10 mx-1 my-auto h-10 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 active:scale-95 transition-transform shadow rounded-xl">
            <SendHorizontal className="w-5 h-5 text-white" />
          </Button>
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
          این تیکت بسته شده است و نمی‌توانید پیام جدید ارسال کنید.
        </div>
      )}
      <style>{`
        textarea::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Edge */
        }
      `}</style>
    </div>
  );
};

export default TicketsInput;
