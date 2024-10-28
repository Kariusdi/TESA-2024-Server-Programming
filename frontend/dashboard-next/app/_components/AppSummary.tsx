import { FC } from "react";
import AppHeader from "./AppHeader";
import AppHealthStatus from "./AppHealthStatus";

const healthStatusData = [
  { name: "Machine 1", status: "Good" },
  { name: "Machine 2", status: "Needs Maintenance" },
  { name: "Machine 3", status: "Critical" },
  { name: "Machine 4", status: "Good" },
  { name: "Machine 5", status: "Needs Maintenance" },
  { name: "Machine 6", status: "Good" },
  { name: "Machine 7", status: "Critical" },
];

const AppSummary: FC = () => {
  return (
    <section className="min-h-screen w-[250px] overflow-auto">
      <div className="bg-white shadow-lg flex flex-col items-center p-3 rounded-tl-[50px] min-h-full">
        <AppHeader title="Summary" />
        <div className="w-full h-auto space-y-10 mt-10 flex-grow mb-5">
          {healthStatusData.map((ele, idx) => (
            <AppHealthStatus key={idx} name={ele.name} status={ele.status} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppSummary;
