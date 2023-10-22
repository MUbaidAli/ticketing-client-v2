import Dashboard from "../../components/Dashboard";
import AllUser from "./allUser";
const AllManagers = () => {
  return (
    <Dashboard>
      <AllUser title="All Managers" url={"/all-manager"} />
    </Dashboard>
  );
};

export default AllManagers;
