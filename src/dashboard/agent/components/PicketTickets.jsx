import { useContext, useState } from "react";
import AgentDashboard from "../dashboard/AgentDashboard";
import { AuthContext } from "../../../context/Auth";
import axios from "axios";
import toast from "react-hot-toast";
import SinglePickedTicket from "./SinglePickedTicket";

const PickedTickets = () => {
  const [pickedTickets, setPickedTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [auth] = useContext(AuthContext);

  console.log(auth);
  async function getPickedTickets() {
    try {
      console.log("started");
      setIsLoading(true);
      const { data } = await axios.get("/by/agent/picks", {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });

      console.log(data);
      if (data?.tickets) {
        setPickedTickets(data.tickets);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useState(() => {
    if (auth && auth?.token) {
      console.log("ok");
      return getPickedTickets();
    }
  }, [auth && auth?.token]);

  return (
    <AgentDashboard>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"> {isLoading ? "Loading..." : "Title"}</th>
            <th scope="col">Description</th>
            <th scope="col">PickedAt</th>
            <th scope="col">Priority</th>
            <th scope="col">Created At</th>
            <th scope="col">1st SLA</th>
            <th scope="col">2st SLA</th>
            {/* <th scope="col">2nd SLA</th> */}
            <th scope="col">Open</th>
          </tr>
        </thead>
        <tbody>
          {pickedTickets.map((item, i) => (
            <SinglePickedTicket i={i} item={item} />
          ))}
        </tbody>
      </table>
    </AgentDashboard>
  );
};

export default PickedTickets;
