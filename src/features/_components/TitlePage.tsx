import { useEffect } from "react";
type TProps = {
  title: string;
  description?: string;
};
const TitlePage = ({ title, description }: TProps) => {
  useEffect(() => {
    document.title = `مجموعه ماساژ آسمان | ${title}`;
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", description);
      else {
        const newMeta = document.createElement("meta");
        newMeta.name = "description";
        newMeta.content = description;
        document.head.appendChild(newMeta);
      }
    }
  }, [title, description]);
  return null;
};

export default TitlePage;
