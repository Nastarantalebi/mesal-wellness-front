import type { TResponse } from "../_types/type";

type TProps = { data?: TResponse };
const CalendarMatrixList = ({ data }: TProps) => {
  console.log(data);
  return <div>CalendarMatrixList</div>;
};

export default CalendarMatrixList;
