import { Button, Input, Modal } from "antd";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/Auth";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HandoverModal = ({ open, setOpen, ticketId }) => {
  const [handoverTicket, setHandoverTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [agentsLoading, setAgentsLoading] = useState(false);
  const [agent, setAgent] = useState("");
  const [reason, setReason] = useState("");
  const [agentList, setAgentList] = useState([]);
  const [auth] = useContext(AuthContext);
  const currentAgent = auth?.user?._id;
  console.log(reason, "--------", ticketId, "--------", agent, "curr");
  const router = useNavigate();

  //   console.log(reason, agent, "test");
  const handleHandoverTicket = async () => {
    const ok = window?.confirm("Are you sure?");

    if (ok) {
      if (!reason || !agent) {
        toast.error(
          "Please write reason and choose agent to handover this ticket!"
        );
      } else if (reason && agent) {
        try {
          setLoading(true);
          const { data } = await axios.put(
            "/handover-ticket",
            { reason, ticketId, newAgentId: agent },
            { headers: { Authorization: `Bearer ${auth?.token}` } }
          );
          if (data.ok) {
            console.log(data, "data arived");
            toast.success(data.message);
            router("/agent/picked-request");
          } else {
            console.log(data, "data arived");
          }
        } catch (err) {
          toast.error(err.message);
          //   toast.error(error.message);
        } finally {
          setLoading(false);
        }
      }
    }

    // if (ok) {
    //   if (!reason || !agent) {
    //     toast.error(
    //       "Please write reason and choose agent to handover this ticket!"
    //     );
    //   } else if (reason && agent) {
    //     try {
    //       setLoading(true);
    //       const { data } = await axios.put(
    //         "/handover-ticket",
    //         {
    //           reason,
    //           ticketId,
    //           newAgentId: agent,
    //         },
    //         { headers: { Authorization: `Bearer ${auth?.token}` } }
    //       );
    //       // const data = await PutRequest(
    //       //   "/handover-ticket",
    //       //   { reason, ticketId, newAgentId: agent },
    //       //   auth
    //       // );
    //       if (data.ok) {
    //         console.log(data, "data arived");
    //         toast.success(data.message);
    //         router("/agent/picked-request");
    //       } else {
    //         console.log(data, "data arived");
    //       }
    //     } catch (error) {
    //       toast.error(error.message);
    //     } finally {
    //       setLoading(false);
    //       //   setAgentsLoading(false);
    //     }
    //   }
    // }
  };

  async function getAgentsList() {
    try {
      setAgentsLoading(true);
      const { data } = await axios.get("/available-agents", {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });

      if (data?.ok) {
        console.log(data, "check agent");
        setAgentList(data?.agents);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setAgentsLoading(false);
    }
  }

  useEffect(() => {
    if (auth && auth?.token) {
      getAgentsList();
    }
  }, [auth && auth?.token]);

  return (
    <Modal
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={1000}
      footer={null}
      className="my-custom-modal"
    >
      <div className="d-flex flex-column align-items-start gap-2">
        <label>Handover Modal</label>
        <Input.TextArea
          //   style={textAreaStyle}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="col-md-12">
          <div className="form-group py-2">
            <label> Available Agents {agentsLoading && "loading..."} </label>
            <select
              className="form-control"
              name="agent"
              value={agent}
              onChange={(e) => setAgent(e.target.value)}
            >
              <option value={""}>Choose Agent</option>
              {agentList?.map((x, index) => {
                return (
                  currentAgent !== x._id && (
                    <option key={index} value={x._id}>
                      {x.name}
                    </option>
                  )
                );
              })}
              {/* {availableAgents?.map((x, index) => (
                <option key={index} value={x._id}>
                  {x.name}
                </option>
              ))} */}
            </select>
          </div>
        </div>
        <div style={{ width: "100px" }}>
          <Button
            className="clicks "
            onClick={handleHandoverTicket}
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default HandoverModal;
