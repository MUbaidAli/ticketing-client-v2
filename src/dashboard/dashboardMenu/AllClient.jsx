import Dashboard from "../../components/Dashboard";
import AllUser from "./allUser";
const AllClients = () => {
  return (
    <Dashboard>
      <AllUser title="All Clients" url={"/all-client"} />
    </Dashboard>
  );
};

export default AllClients;
