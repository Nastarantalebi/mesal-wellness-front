import { useEffect, useMemo, useRef, useState } from "react";
import type { TResTicket } from "../../_types/type";
import { toPersianDateTimeISO } from "@/utils/convertDate";
import DownloadImageTickets from "../image/DownloadImageTickets";

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
  const groupedMessages = useMemo(() => {
    const groups: Record<string, TResTicket[]> = {};
    messages.forEach((item) => {
      const time = toPersianDateTimeISO(item.created_at);
      const date = time?.split(" ")?.at(1)?.trim() || "نامشخص";
      if (date && date !== "نامشخص") {
        groups[date] ??= [];
        groups[date].push(item);
      }
    });
    return Object.entries(groups).map(([date, msgs]) => ({
      date,
      messages: msgs,
    }));
  }, [messages]);

  return (
    <div
      onScroll={handleScroll}
      ref={containerRef}
      className="flex-1 overflow-y-auto p-1.5 md:p-3 space-y-3 bg-gray-50 dark:bg-neutral-900 relative">
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

      {groupedMessages.length === 0 ? (
        <div className="text-center text-gray-400 dark:text-gray-500 flex items-center justify-center h-[80%]">
          هنوز پیامی وجود ندارد
        </div>
      ) : (
        <div className="space-y-4">
          {groupedMessages.map(({ date, messages }) => (
            <div key={date} className="w-full">
              <div className="sticky select-none left-1/2 right-1/2 mx-auto w-fit my-4 z-10">
                <span className="rounded-xl bg-black/70 px-3 py-1 text-white text-sm shadow-lg">
                  {date}
                </span>
              </div>
              <div className="space-y-3">
                {messages.map((item, index) => {
                  const {
                    author_type,
                    created_at,
                    id,
                    image,
                    message,
                    thumbnail,
                  } = item;
                  const isUser = author_type === "user";
                  const time = toPersianDateTimeISO(created_at)?.split(" ")[0];
                  return (
                    <div key={id}>
                      <div
                        className={`flex w-full my-3 transition-all duration-300 ease-in-out ${
                          isUser ? "justify-start" : "justify-end"
                        }`}
                        style={{
                          animation: `fadeInUp 0.25s ease ${index * 0.05}s both`,
                        }}>
                        <div
                          className={`relative max-w-[60%] md:max-w-[40%]  rounded-2xl shadow-sm text-sm md:text-[15px]
                   whitespace-pre-wrap break-words leading-relaxed ${
                     isUser
                       ? "bg-blue-600 text-white rounded-br-none"
                       : "bg-gray-200 dark:bg-neutral-800 text-gray-900 dark:text-gray-100 rounded-bl-none"
                   } ${image && "w-[85%] md:w-[50%]"}`}>
                          {!!image && thumbnail && (
                            <DownloadImageTickets
                              image={image}
                              captions={message}
                              thumbnail={thumbnail}
                            />
                          )}
                          <div className="p-2">
                            <span className="mt-1.5">{message}</span>
                            <div className="flex items-center justify-end gap-2 text-[11px] opacity-70">
                              {time && (
                                <div
                                  className={
                                    isUser
                                      ? "text-gray-100 dark:text-gray-400"
                                      : "text-gray-900"
                                  }>
                                  {time}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketsMessages;
