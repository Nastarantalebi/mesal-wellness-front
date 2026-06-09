import { useEffect } from "react";
// import { useAuthStore } from "../auth/store/authStore";
type TProps = {
  title: string;
  description?: string;
};
const TitlePage = ({ title, description }: TProps) => {
  // const organization = useAuthStore((s) => s.userData?.organization);

  useEffect(() => {
    document.title =
      //  organization?.title
      //   ? `${organization.title} | ${title}`
      //   :
      title;
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
