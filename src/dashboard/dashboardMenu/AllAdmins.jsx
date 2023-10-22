import Dashboard from "../../components/Dashboard";
import AllUser from "./allUser";

const AllAdmins = () => {
  return (
    <Dashboard>
      <AllUser title="All Admin" url={"/all-admin"} />
    </Dashboard>
  );
};

export default AllAdmins;
