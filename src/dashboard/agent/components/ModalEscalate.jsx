import { Button, Input, Modal } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../context/Auth";

const ModalEscalate = ({ open, setOpen, ticketId }) => {
  const [auth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");

  async function esclatingTicket(id) {
    const ok = window.confirm("Are you Sure?");
    if (ok) {
      if (!reason) {
        return toast.error("plase enter reason ");
      }
      try {
        setLoading(true);
        const { data } = await axios.put(
          "/escalated-ticket",
          {
            reason,
            ticketId,
          },
          { headers: { Authorization: `Bearer ${auth?.token}` } }
        );

        if (data?.ok) {
          toast.success(data.message);
        } else {
          throw new Error("Something Went Wrong Try Again!");
        }
        // console.log(response);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setOpen(false);
        setLoading(false);
      }
    }
  }

  return (
    <>
      {" "}
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
          <label>Reason, why you are escalating ticket?</label>
          <Input.TextArea
            // style={textAreaStyle}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <div style={{ width: "100px" }}>
            <Button
              className="clicks "
              onClick={esclatingTicket}
              loading={loading}
            >
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalEscalate;
