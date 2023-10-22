import { useContext, useEffect, useState } from "react";
import AgentDashboard from "../dashboard/AgentDashboard";
import { AuthContext } from "../../../context/Auth";
import toast from "react-hot-toast";
import axios from "axios";

const AssignedTc = () => {
  const [loading, setLoading] = useState(false);
  const [auth] = useContext(AuthContext);
  const [assignedTc, setAssignedTc] = useState([]);
  async function getResolvedTickets() {
    try {
      setLoading(true);
      const { data } = await axios.get("/assign-to-me", {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });

      if (data?.ok) {
        setAssignedTc(data?.tickets);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (auth && auth?.token) {
      getResolvedTickets();
    }
  }, [auth && auth?.token]);
  return (
    <AgentDashboard>
      <div className="table-responsive">
        <table className="table mt-1 agent-table">
          <thead>
            <tr>
              <th scope="col"># {loading && "loading"}</th>
              <th scope="col">Title</th>
              <th scope="col">Picket At</th>
              <th scope="col">Priority</th>
              <th scope="col">Created At</th>
              <th scope="col ">1st SLA</th>
              <th scope="col ">2nd SLA</th>
              <th scope="col "></th>
            </tr>
          </thead>

          <tbody>
            {assignedTc?.map((x, index) => (
              <tr>
                <th scope="row">{++index}</th>
                <th scope="row">{x.title}</th>
                <th scope="row">{x.createdAt.slice(0, 10)}</th>
                <th scope="row">{x.pickedAt.slice(0, 10)}</th>
                <th scope="row">{x.pickedBy}</th>
                <th scope="row">{x.resolvedAt}</th>
                <th scope="row">{x.resolvedBy}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AgentDashboard>
  );
};

export default AssignedTc;
