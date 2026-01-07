import { useState } from "react";
import type { TChat, TResTicket } from "../_types/type";
import useCreateData from "@/services/useCreateData";
import { TICKETS_QUERY_KEY } from "../_fixtures/data";
import type { TResList } from "../_types/type";
import TicketsInput from "./TicketsInput";
import TicketsMessages from "./TicketsMessages";
import useInfiniteData from "@/services/useInfiniteData";

type TProps = {
  selectedList: string | null;
  selectedTicket?: TResList;
};

const TicketsMain = ({ selectedList, selectedTicket }: TProps) => {
  if (!selectedList)
    return (
      <div className="flex flex-1 items-center justify-center h-full bg-gray-50 dark:bg-neutral-900 text-gray-500 dark:text-gray-400">
        برای شروع یک تیکت را انتخاب کنید
      </div>
    );

  /** 🔹 پیام‌های محلی */
  const [localMessagesMap, setLocalMessagesMap] = useState<
    Record<string, TResTicket[]>
  >({});
  const [message, setMessage] = useState("");
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);

  /** 🔹 دریافت پیام‌ها (pagination) */
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteData<TResTicket>({
      queryKey: [TICKETS_QUERY_KEY, selectedList],
      initialUrl: `/tickets/${selectedList}/comments/?page=1`,
      support: true,
    });

  const serverMessages = data?.pages
    ? data.pages.flatMap((page) => page.results)
    : [];

  /** 🔹 ارسال پیام */
  const { mutate, isPending } = useCreateData<TChat, TResTicket>({
    queryKey: [TICKETS_QUERY_KEY, selectedList],
    url: `/tickets/${selectedList}/comments/`,
    showToast: false,
    support: true,
  });

  const handleSend = () => {
    if (!message.trim()) return;

    const tempId = Date.now().toString();

    const tempMessage: TResTicket = {
      id: Number(tempId),
      message,
      author_type: "admin",
      created_at: new Date().toISOString(),
    };

    /** optimistic update */
    setLocalMessagesMap((prev) => ({
      ...prev,
      [selectedList]: [...(prev[selectedList] || []), tempMessage],
    }));

    setMessage("");
    setIsWaitingResponse(true);

    mutate(
      { message },
      {
        onSuccess: (res) => {
          setLocalMessagesMap((prev) => ({
            ...prev,
            [selectedList]: (prev[selectedList] || []).map((m) =>
              m.id === Number(tempId) ? res : m
            ),
          }));
          setIsWaitingResponse(false);
        },
        onError: () => {
          setLocalMessagesMap((prev) => ({
            ...prev,
            [selectedList]: (prev[selectedList] || []).map((m) =>
              m.id === Number(tempId)
                ? { ...m, message: "❌ خطا در ارسال پیام" }
                : m
            ),
          }));
          setIsWaitingResponse(false);
        },
      }
    );
  };

  /** 🔹 merge پیام‌های لوکال + سرور */
  const allMessages = [
    ...(localMessagesMap[selectedList] || []),
    ...serverMessages.filter(
      (sMsg) =>
        !(localMessagesMap[selectedList] || []).some(
          (lMsg) => lMsg.id === sMsg.id
        )
    ),
  ].sort((a, b) => a.created_at.localeCompare(b.created_at));

  const isOpen = selectedTicket?.status === "OPEN";
  const description = selectedTicket?.description;

  return (
    <div className="flex flex-col h-full">
      <TicketsMessages
        messages={allMessages}
        description={description}
        fetchOldMessages={fetchNextPage}
        canFetchOldMessages={hasNextPage}
        isFetchingOldMessages={isFetchingNextPage}
        key={selectedList}
      />

      <TicketsInput
        isOpen={isOpen}
        message={message}
        setMessage={setMessage}
        handleSend={handleSend}
        isWaitingResponse={isWaitingResponse}
        isPending={isPending}
      />
    </div>
  );
};

export default TicketsMain;
