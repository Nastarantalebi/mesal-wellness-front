import { ArrowDownUp } from "lucide-react";
import { useSearchParams } from "react-router-dom";

interface SortProps {
  field: string;
  className?: string;
  iconSize?: number;
}

const Sort: React.FC<SortProps> = ({ field, className, iconSize = 18 }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const ordering = searchParams.get("ordering");
  const isActiveAsc = ordering === field;
  const isActiveDesc = ordering === `-${field}`;
  const toggleOrdering = () => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev.toString());
      if (ordering === field) {
        params.set("ordering", `-${field}`);
      } else if (ordering === `-${field}`) {
        params.delete("ordering");
      } else {
        params.set("ordering", field);
      }
      return params;
    });
  };
  return (
    <div className={`flex items-center ${className}`}>
      <ArrowDownUp
        className={`cursor-pointer ${
          isActiveDesc
            ? "text-destructive"
            : isActiveAsc
            ? "text-succes"
            : "text-gray-400"
        }`}
        onClick={toggleOrdering}
        size={iconSize}
        role="button"
      />
    </div>
  );
};

export default Sort;
