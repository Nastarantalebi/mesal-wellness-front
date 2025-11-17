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
      title: "کلیه نوبت ها",
      content: <CalendarRange/>
    },
    {
      key: "3",
      title: "یادداشت های بالینی",
      content:  <></>
    },
  ];
  return { tabItems };
};

export default useTabItems;
