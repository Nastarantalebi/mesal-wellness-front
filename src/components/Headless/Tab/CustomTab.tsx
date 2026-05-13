import { Tab } from "@/components/Headless";
import TitlePage from "@/features/_components/TitlePage";

export interface TabItem {
  key: string | number;
  title: string;
  content: React.ReactNode;
}

interface CustomTabsProps {
  items: TabItem[];
  title?: string;
}

export default function CustomTabs({ items, title }: CustomTabsProps) {
  return (
    <div className="w-full">
      {title && <TitlePage title={title} />}

      <Tab.Group className="flex flex-col gap-y-7">
        {/* Tab List */}
        <div className="flex flex-col p-2 box box--stacked">
          <Tab.List
            variant="boxed-tabs"
            className="bg-transparent border-transparent">
            {items.map(({ key, title }) => (
              <Tab
                key={key}
                className="first:rounded-s-[0.6rem] last:rounded-e-[0.6rem] 
                [&[aria-selected='true']_button]:text-primary 
                [&[aria-selected='true']_button]:font-medium 
                [&[aria-selected='true']_button]:shadow-sm 
                [&[aria-selected='true']_button]:bg-primary/[0.04] 
                [&[aria-selected='true']_button]:border-primary/[0.15]">
                <Tab.Button
                  className="w-full text-slate-500 whitespace-nowrap rounded-[0.6rem] py-3 flex items-center gap-2 justify-center"
                  as="button">
                  {title}
                </Tab.Button>
              </Tab>
            ))}
          </Tab.List>
        </div>

        {/* Tab Panels */}
        <div className="flex flex-col p-5 box box--stacked">
          <Tab.Panels>
            {items.map(({ key, content }) => (
              <Tab.Panel key={key}>{content}</Tab.Panel>
            ))}
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  );
}
