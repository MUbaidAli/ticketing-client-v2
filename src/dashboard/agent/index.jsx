import { useContext, useEffect, useState } from "react";
import AgentDashboard from "./dashboard/AgentDashboard";
import { AuthContext } from "../../context/Auth";
import axios from "axios";
import toast from "react-hot-toast";
import SingleTicket from "./components/SingleTicket";

const Agent = () => {
  const [auth] = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isPickedLoading, setPickedIsLoading] = useState(false);
  async function getTickets() {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/by/agent/category/list", {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      // console.log(response);
      if (!data?.ok) {
        throw new Error("something went wrong");
      } else {
        // console.log(response);
        setTickets(data?.tickets);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  console.log(isLoading);
  useEffect(() => {
    const count = setInterval(() => {
      setCounter((prevCount) => prevCount + 1);
      getTickets();
    }, 1 * 60 * 1000);
    return () => clearInterval(count);
  }, [counter]);

  useEffect(() => {
    if (auth && auth?.token) {
      getTickets();
    }
  }, [auth && auth?.token]);

  async function handlePickedTicket(id) {
    console.log(id);
    try {
      // setPickedIsLoading(true)
      const { data } = await axios.put(
        "/by/agent/pick",
        { ticketId: id },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      console.log(data);
      if (data?.ticket) {
        getTickets();
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <AgentDashboard>
      <table className="table">
        {isLoading && "loading..."}
        {!isLoading && (
          <>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Priority</th>
                <th scope="col">Created On</th>
                <th scope="col">1st SLA</th>
                {/* <th scope="col">2nd SLA</th> */}
                <th scope="col">Open</th>
              </tr>
            </thead>
            <tbody>
              {tickets?.map((item, i) => (
                <SingleTicket
                  key={i}
                  item={item}
                  i={i}
                  handlePickedTicket={handlePickedTicket}
                />
              ))}
            </tbody>
          </>
        )}
      </table>
    </AgentDashboard>
  );
};

export default Agent;
