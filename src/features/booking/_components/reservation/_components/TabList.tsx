import { Tab } from "@/components/Headless";
import useTabItems from "../_hooks/useTabItems";
import TitlePage from "@/features/_components/TitlePage";

function TabList() {
  const { tabItems } = useTabItems();
  return (
    <div className="w-full">
      <TitlePage title="نوبت‌های رزرو شده" />
      <Tab.Group className="flex flex-col gap-y-7">
        <div className="flex flex-col p-2 box box--stacked">
          <Tab.List
            variant="boxed-tabs"
            className="bg-transparent border-transparent">
            {tabItems.map(({ key, title }) => (
              <Tab
                key={key}
                className="first:rounded-s-[0.6rem] last:rounded-e-[0.6rem] [&[aria-selected='true']_button]:text-current [&[aria-selected='true']_button]:text-primary [&[aria-selected='true']_button]:font-medium [&[aria-selected='true']_button]:shadow-sm [&[aria-selected='true']_button]:bg-primary/[0.04] [&[aria-selected='true']_button]:border-primary/[0.15]">
                <Tab.Button
                  className="w-full text-slate-500 whitespace-nowrap rounded-[0.6rem] py-3 flex items-center gap-2 justify-center"
                  as="button">
                  {title}
                </Tab.Button>
              </Tab>
            ))}
          </Tab.List>
        </div>
        <div className="flex flex-col p-5 box box--stacked">
          <Tab.Panels>
            {tabItems.map(({ key, content }) => (
              <Tab.Panel key={key}>{content}</Tab.Panel>
            ))}
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  );
}

export default TabList;
