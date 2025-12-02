import { PlusIcon, SearchIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";

const BookingDescription = () => {
  const [showDescription, setShowDescription] = useState<boolean>(true);
  return (
    showDescription && (
      <div className="mb-4 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-7 text-gray-700 shadow-sm">
        <div className="flex flex-row items-center justify-between">
          <h3 className="mb-3 font-semibold text-gray-900 text-base flex items-center gap-1">
            📌 توضیحات بخش رزرو
          </h3>
          <button
            title="دیگر نمایش نده"
            onClick={() => setShowDescription(false)}>
            <XCircleIcon className="text-danger cursor-pointer" />
          </button>
        </div>

        <p>
          در این بخش می‌توانید اطلاعات مربوط به رزرو را وارد یا ویرایش کنید.
          لطفاً مراحل زیر را با دقت انجام دهید:
        </p>

        <ul className="mt-3 list-disc pr-5 space-y-2">
          <li>
            برای یافتن مشتری، نام یا شماره تلفن او را در فیلد جستجو وارد کرده و
            روی آیکون{" "}
            <span className="inline-block text-blue-500 align-middle">
              <SearchIcon className="h-4 w-4 inline-block" />
            </span>{" "}
            کلیک کنید تا لیست مشتریان موجود نمایش داده شود. در صورتی که مشتری در
            سیستم ثبت نشده باشد، با کلیک روی دکمه{" "}
            <span className="inline-block text-blue-500 align-middle">
              <PlusIcon className="h-4 w-4 inline-block" />
            </span>{" "}
            می‌توانید مشتری جدید اضافه کنید.
          </li>

          <li>
            برای هر آیتم، ابتدا تاریخ، سپس ساعت شروع و پایان را وارد کنید. بعد
            از تکمیل این موارد، روی آیکون{" "}
            <span className="inline-block text-blue-500 align-middle">
              <SearchIcon className="h-4 w-4 inline-block" />
            </span>{" "}
            روبه‌روی فیلد ساعت پایان کلیک کنید تا فهرست درمانگرها و اتاق‌های
            خالی در آن تاریخ و ساعت نمایش داده شود.
          </li>

          <li>
            در صورتی که در زمان انتخاب‌شده درمانگری موجود باشد، خدمات مربوط به
            آن درمانگر به‌همراه مبلغ خدمت و مبلغ قابل پرداخت، به‌صورت خودکار
            نمایش داده می‌شود.
          </li>

          <li>
            در بخش پایین صفحه می‌توانید مبلغ بیعانه را مشاهده و در صورت نیاز
            تغییر دهید. جمع مبالغ آیتم‌های انتخابی نیز در همان بخش نمایش داده
            می‌شود.
          </li>
        </ul>

        <p className="mt-4 text-gray-800 font-medium">
          پس از تکمیل تمام بخش‌ها، روی دکمه «ثبت نوبت» کلیک کنید.
        </p>
      </div>
    )
  );
};

export default BookingDescription;
