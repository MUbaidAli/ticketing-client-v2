import Dashboard from "../../components/Dashboard";
import AllUser from "./allUser";
const AllAgents = () => {
  return (
    <Dashboard>
      <AllUser title="All Agents" url={"/all-agent"} />
    </Dashboard>
  );
};

export default AllAgents;
