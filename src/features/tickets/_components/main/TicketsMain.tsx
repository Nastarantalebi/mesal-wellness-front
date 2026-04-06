import { useState } from "react";
import type { TChat, TResTicket } from "../../_types/type";
import useCreateData from "@/services/useCreateData";
import useInfiniteData from "@/services/useInfiniteData";
import { TICKETS_QUERY_KEY } from "../../_fixtures/data";
import type { TResList } from "../../_types/type";
import TicketsInput from "./TicketsInput";
import TicketsMessages from "./TicketsMessages";
import { showToastify } from "@/components/Headless/Toast";

type TProps = {
  selectedList: string | null;
  selectedTicket: TResList | null;
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
  const [inputValue, setInputValue] = useState<TChat>({
    message: "",
    image: null,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);

  const imageUrl = inputValue.image
    ? URL.createObjectURL(inputValue.image)
    : "";
  /** 🔹 دریافت پیام‌ها (pagination) */
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteData<TResTicket>({
      queryKey: [TICKETS_QUERY_KEY, selectedList],
      initialUrl: `/tickets/${selectedList}/comments/`,
      support: true,
      refetchInterval: 15000,
      refetchIntervalInBackground: true,
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
    setPreview(null);
    if (!inputValue.message.trim() && !inputValue.image) return;
    const tempId = Date.now().toString();

    const tempMessage: TResTicket = {
      id: Number(tempId),
      message: inputValue.message,
      image: imageUrl,
      thumbnail: imageUrl,
      author_type: "user",
      created_at: new Date().toISOString(),
    };

    /** optimistic update */
    setLocalMessagesMap((prev) => ({
      ...prev,
      [selectedList]: [...(prev[selectedList] || []), tempMessage],
    }));

    setInputValue({ image: null, message: "" });
    setIsWaitingResponse(true);
    const hasFile = inputValue.image instanceof File;
    if (hasFile) {
      const currentInput = { ...inputValue };
      const formData = new FormData();
      Object.entries(inputValue).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      });
      mutate(formData as any, {
        onSuccess: (res) => {
          setLocalMessagesMap((prev) => ({
            ...prev,
            [selectedList]: (prev[selectedList] || []).map((m) =>
              m.id === Number(tempId) ? res : m,
            ),
          }));
          setIsWaitingResponse(false);
        },
        onError: () => {
          showToastify({ message: "خطا در ارسال پیام", type: "error" });
          setInputValue(currentInput);
          setLocalMessagesMap((prev) => ({
            ...prev,
            [selectedList]: (prev[selectedList] || []).filter(
              (m) => m.id !== Number(tempId),
            ),
          }));
          setIsWaitingResponse(false);
        },
      });
    } else {
      mutate(
        { message: inputValue.message, image: inputValue.image },
        {
          onSuccess: (res) => {
            setLocalMessagesMap((prev) => ({
              ...prev,
              [selectedList]: (prev[selectedList] || []).map((m) =>
                m.id === Number(tempId) ? res : m,
              ),
            }));
            setIsWaitingResponse(false);
          },
          onError: (_err, req) => {
            showToastify({ message: "خطا در ارسال پیام", type: "error" });
            setInputValue(req);
            setLocalMessagesMap((prev) => ({
              ...prev,
              [selectedList]: (prev[selectedList] || []).filter(
                (m) => m.id !== Number(tempId),
              ),
            }));
            setIsWaitingResponse(false);
          },
        },
      );
    }
  };

  /** 🔹 merge پیام‌های لوکال + سرور */
  const allMessages = [
    ...(localMessagesMap[selectedList] || []),
    ...serverMessages.filter(
      (sMsg) =>
        !(localMessagesMap[selectedList] || []).some(
          (lMsg) => lMsg.id === sMsg.id,
        ),
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
        setPreview={setPreview}
        preview={preview}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSend={handleSend}
        isWaitingResponse={isWaitingResponse}
        isPending={isPending}
      />
    </div>
  );
};

export default TicketsMain;
