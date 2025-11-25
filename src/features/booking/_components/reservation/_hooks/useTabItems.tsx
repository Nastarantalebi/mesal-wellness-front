import CalendarMatrix from "../_components/calendar-matrix/_components/CalendarMatrix";
import CalendarRange from "../_components/calendar-range/_components/CalendarRange";
import CalendarDate from "../_components/calender/CalendarDate";

const useTabItems = () => {
  const tabItems = [
    {
      key: "1",
      title: "نوبت‌های امروز",
      content: <CalendarDate/>
    },
    {
      key: "2",
      title: "کلیه نوبت‌ها",
      content: <CalendarRange/>
    },
    {
      key: "3",
      title: "تقویم ماتریسی رزروها",
      content:  <CalendarMatrix/>
    },
  ];
  return { tabItems };
};

export default useTabItems;
