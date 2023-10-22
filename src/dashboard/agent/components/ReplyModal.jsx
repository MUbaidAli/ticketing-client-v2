import { Avatar, Button, Input, List, Modal } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../context/Auth";

const ReplyModal = ({ open, setOpen, ticketId, currentComment }) => {
  const [auth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState("");
  const [list, setList] = useState([]);
  console.log(reply);
  async function submitReply(id) {
    try {
      const { data } = await axios.post(
        "/add/reply",
        {
          content: reply,
          commentId: currentComment._id,
        },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );

      if (data?.ok) {
        console.log(data);
        setList([...list, data?._reply]);
        setReply("");
      } else {
        throw new Error("Something went wrong");
      }
      //   console.log(response);
    } catch (error) {
      toast.error(error.message);
    }

    console.log("test");
  }

  async function getRepliesData(id) {
    try {
      const { data } = await axios.get(`/replies/${id}`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      if (data?.ok) {
        // console.log(response);
        setList(data._replies);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (auth && auth?.token) {
      getRepliesData(currentComment._id);
    }
  }, [auth && auth?.token, currentComment._id]);

  async function handleDelete(id) {
    try {
      const response = await axios.put(
        `/remove/reply/${id}`,
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      console.log(response);

      setList(list.filter((item) => item._id !== id));
      toast.success("Comment Deleted");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      {console.log(list, "list from reply modal")}
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
          <label>Enter Replies</label>
          <Input.TextArea
            // style={textAreaStyle}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
          <div style={{ width: "100px" }}>
            <Button className="clicks " onClick={submitReply} loading={loading}>
              Submit
            </Button>
          </div>
        </div>

        <List
          dataSource={list}
          renderItem={(item, index) => (
            <List.Item key={item.email}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                  />
                }
                title={<a>{item.createdBy}</a>}
                description={[<span>{item.content}</span>]}
              />

              <a
                className="text-danger btn "
                onClick={() => handleDelete(item._id)}
              >
                Delete Reply
              </a>
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
};

export default ReplyModal;
