import _ from "lodash";
import DashboardItem from "./items/_components/DashboardItem";
import TitlePage from "../_components/TitlePage";

function Dashboard() {
  return (
    <div>
      <TitlePage title="داشبورد" />
      <DashboardItem />
    </div>
  );
}

export default Dashboard;
