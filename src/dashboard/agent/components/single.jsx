import { useParams } from "react-router-dom";
import AgentDashboard from "../dashboard/AgentDashboard";
import Card from "antd/es/card/Card";
import Input from "antd/es/input/Input";
import { Avatar, Button } from "antd";
import { List } from "antd";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/Auth";
import axios from "axios";
import toast from "react-hot-toast";
import { BsCheck2All, BsCheckAll } from "react-icons/bs";
import ModalEscalate from "./ModalEscalate";
import ReplyModal from "./ReplyModal";
import HandoverModal from "./HandoverModal";

const Single = () => {
  const { id } = useParams();

  const [comment, setComment] = useState(
    "I have recieved your ticket, i'm working onit. If you have any query please do comment here."
  );
  const [currentComment, setCurrentComment] = useState({});
  const [commentLoading, setCommentLoading] = useState(false);
  const [single, setSingle] = useState({});
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [escalateModal, setEscalateModal] = useState(false);
  const [handTicket, sethandTicket] = useState(false);

  const [auth] = useContext(AuthContext);

  // const currentAgent = auth;

  // console.log(currentAgent);
  async function deleteComment(id) {
    try {
      setCommentLoading(true);
      const response = await axios.delete(`/delete/comment/${id}`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });

      if (response?.data?.ok) {
        toast.success("Comment Deleted");
        setList(list.filter((item) => item._id !== id));
      } else {
        throw new Error("Not Deleted");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCommentLoading(false);
    }
  }

  function addComment() {}
  async function getSingleTicket(id) {
    try {
      const response = await axios.get(`/by/agent/single/${id}`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });

      console.log(response);
      setSingle(response.data);
      setList(response.data.comments);
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function addComment() {
    try {
      setCommentLoading(true);
      const { data } = await axios.put(
        "/by/agent/add/comment",
        {
          ticketId: id,
          content: comment,
        },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );

      // console.log(response.data.ok, "comment");

      if (data) {
        setList([...list, data.comments]);
        toast.success("Comment Added Successfully");
      } else {
        throw new Error("something went wrong");
      }
      // console.log(data, "comment");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCommentLoading(false);
    }
  }

  function handleEscalateTicket(id) {
    const ok = window.confirm("Are You Sure You Want To Escalate This Ticket?");

    if (ok) {
      setEscalateModal(true);
      // setOpen(true);
    }
  }

  function handleHandoverTicket() {
    sethandTicket(true);
  }

  async function handleResolveTicket() {
    const { data } = await axios.put(
      `/resolved-tc/${id}`,
      {},
      { headers: { Authorization: `Bearer ${auth?.token}` } }
    );

    if (data?.ok) {
      toast.success("ticket Resolved");
    }
  }

  useEffect(() => {
    toast.success("please ready The Default Message First", {
      position: "bottom-center",
      icon: <BsCheckAll size={22} color="#99196a" />,
      style: {
        borderRadius: "10px",
        background: "#191c24",
        color: "#fff",
      },
    });

    if (auth && auth?.token) {
      getSingleTicket(id);
    }
  }, [auth && auth?.token]);

  return (
    <AgentDashboard>
      <div className="row ">
        <h4 className="col-md-5">
          {id}{" "}
          <span>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 576 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M128 160h320v192H128V160zm400 96c0 26.51 21.49 48 48 48v96c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48v-96c26.51 0 48-21.49 48-48s-21.49-48-48-48v-96c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48v96c-26.51 0-48 21.49-48 48zm-48-104c0-13.255-10.745-24-24-24H120c-13.255 0-24 10.745-24 24v208c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24V152z"></path>
            </svg>
          </span>
        </h4>
        <div className="col-7">
          {" "}
          <button
            onClick={() => handleHandoverTicket(id)}
            className="btn  btn-outline-secondary col-3  small m-1 "
          >
            Handover Ticket
          </button>
          <button
            onClick={() => handleEscalateTicket(id)}
            className="btn  btn-outline-secondary col-3 m-1"
          >
            Escalate Ticket
          </button>
          {/* <button
            onClick={() => handleResolve()}
            className="btn btn-outline-warning col-3 m-1"
          >
            <BsCheck2All size={20} color="green" /> Resolve
          </button> */}
          {/* <button onClick={() => cookBtn()}>test</button> */}
          <button
            onClick={() => handleResolveTicket(id)}
            className="btn btn-outline-warning col-3 m-1"
          >
            <BsCheck2All size={20} color="green" /> Resolve
          </button>
        </div>
      </div>
      {/* ticket Data */}
      <div className="dataSection row my-3">
        <div class="col-auto  bg-dark text-white py-3 m-1">
          {console.log(single, "singleData")}
          Created By : {single?.createdBy?.name}
        </div>
        <div class="col-auto bg-dark text-white py-3 m-1">
          Created At : {single?.pickedAt?.slice(2, 10)}
        </div>
        <div class="col-auto bg-dark text-white py-3 m-1">
          Priority : {single.priority}
        </div>
        <div class="col-auto bg-dark text-white py-3 m-1">
          Category : {single?.category?.name}
        </div>
      </div>
      {/* commentin section */}
      <>
        <Card className="blackCard  mt-2">
          <div className="row">
            <div className="col-md-11">
              <Input.TextArea
                style={{
                  backgroundColor: "transparent",
                  color: "black",
                  fontWeight: "600",
                }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="col-md-1 mt-2">
              <Button
                loading={commentLoading}
                className="clicks"
                onClick={addComment}
              >
                {commentLoading ? "loading..." : "Submit"}
              </Button>
            </div>
          </div>
        </Card>
        {console.log(list, "list from single")}
      </>
      {/* {list start} */}
      <List
        style={{ backgroundColor: "#191c24", borderRadius: "10px" }}
        className=" mt-2 p-2"
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <span
                className="text-white"
                role="button"
                onClick={() => {
                  setOpen(true);
                  setCurrentComment(item); // single comment: Item {content: "hello", _id : "aslkdjsakh3i242"}
                }}
              >
                reply
              </span>,
              <>
                {item.createdBy === auth?.user?._id && (
                  <a
                    className="text-danger"
                    onClick={() => deleteComment(item._id)}
                  >
                    delete
                  </a>
                )}
              </>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                />
              }
              title={<a className="text-white">{item.createdBy}</a>}
              description={[<span className="text-white">{item.content}</span>]}
            />
          </List.Item>
        )}
      />
      {/* <ModalEscalate open={escalateModal} /> */}
      <ModalEscalate
        open={escalateModal}
        setOpen={setEscalateModal}
        ticketId={id}
      />

      {open && (
        <ReplyModal
          open={open}
          setOpen={setOpen}
          currentComment={currentComment}
        />
      )}

      <HandoverModal open={handTicket} setOpen={sethandTicket} ticketId={id} />
    </AgentDashboard>
  );
};

export default Single;
