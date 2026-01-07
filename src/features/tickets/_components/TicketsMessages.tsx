import { useEffect, useRef, useState } from "react";
import type { TResTicket } from "../_types/type";
import { toPersianDateTimeISO } from "@/utils/convertDate";

interface IProps {
  messages: TResTicket[];
  description?: string;
  fetchOldMessages?: () => Promise<any>;
  canFetchOldMessages?: boolean;
  isFetchingOldMessages?: boolean;
}

const TicketsMessages = ({
  messages,
  description,
  fetchOldMessages,
  canFetchOldMessages,
  isFetchingOldMessages,
}: IProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [hasScrolledUp, setHasScrolledUp] = useState(false);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior,
      });
      setHasScrolledUp(false);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    if (isInitialLoad) {
      scrollToBottom("auto");
      setIsInitialLoad(false);
      return;
    }
    if (!hasScrolledUp) scrollToBottom("smooth");
  }, [messages, isInitialLoad, hasScrolledUp]);

  const handleScroll = async () => {
    const el = containerRef.current;
    if (!el) return;
    const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;

    if (el.scrollTop < 10 && canFetchOldMessages && !isFetchingOldMessages) {
      const prevHeight = el.scrollHeight;
      try {
        await fetchOldMessages?.();
        setTimeout(() => {
          el.scrollTop = el.scrollHeight - prevHeight;
        }, 0);
      } catch (e) {
        console.error("Failed to fetch old tickets:", e);
      }
    }

    if (distanceToBottom > 10) setHasScrolledUp(true);
    else setHasScrolledUp(false);
  };

  return (
    <div
      onScroll={handleScroll}
      ref={containerRef}
      className="flex-1 overflow-y-auto p-3 md:p-6 space-y-3 bg-gray-50 dark:bg-neutral-900 relative">
      {isFetchingOldMessages && (
        <div className="flex justify-center items-center py-2 mt-4">
          <span className="animate-spin w-6 h-6 border-2 border-blue-500 rounded-full" />
        </div>
      )}

      {description && (
        <div className="bg-gray-100/80 rounded dark:bg-neutral-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-neutral-700 p-3 md:p-4 flex items-start gap-2 shadow-sm">
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            توضیحات تیکت: {description}
          </p>
        </div>
      )}

      {messages.length === 0 ? (
        <div className="text-center text-gray-400 dark:text-gray-500">
          هنوز پیامی وجود ندارد
        </div>
      ) : (
        messages.map((msg, index) => {
          const isUser = msg.author_type === "user";
          const time = toPersianDateTimeISO(msg.created_at)?.split(" ")[1];
          return (
            <div
              key={msg.id}
              className={`flex w-full my-3 transition-all duration-300 ease-in-out ${
                isUser ? "justify-start" : "justify-end"
              }`}
              style={{
                animation: `fadeInUp 0.25s ease ${index * 0.05}s both`,
              }}>
              <div
                className={`relative max-w-[80%] md:max-w-[70%] p-2 rounded-2xl shadow-sm text-sm md:text-base whitespace-pre-wrap break-words leading-relaxed ${
                  isUser
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-200 dark:bg-neutral-800 text-gray-900 dark:text-gray-100 rounded-bl-none"
                }`}>
                <div className="m-1">{msg.message}</div>
                {time && (
                  <div
                    className={`text-[11px] md:text-xs opacity-70 text-right ${
                      isUser
                        ? "text-gray-200"
                        : "text-gray-600 dark:text-gray-400"
                    }`}>
                    {time}
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default TicketsMessages;
