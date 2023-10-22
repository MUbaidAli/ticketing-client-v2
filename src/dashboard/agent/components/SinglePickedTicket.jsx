import { PlusOutlined } from "@ant-design/icons";
import useTimersSla from "./useTimersSla";
import { Link } from "react-router-dom";

const SinglePickedTicket = ({ i, item }) => {
  const secondSlaTime = useTimersSla(item.pickedAt);
  return (
    <tr>
      <th>{i + 1}</th>
      <th>{item?.title}</th>
      <th>{item?.description}</th>
      <th>{item?.pickedAt.slice(2, 10)}</th>
      <th>{item?.priority}</th>
      <th>{item?.createdAt.slice(2, 10)}</th>
      <th>
        {item?.firstSLABreach ? (
          <p
            style={{
              color: "white",
              fontWeight: "bold",
              background: "red",
              borderRadius: "20px",
              textAlign: "center",
            }}
          >
            Yes
          </p>
        ) : (
          <p
            style={{
              color: "",
              fontWeight: "bold",
              borderRadius: "20px",
              textAlign: "center",
            }}
          >
            No
          </p>
        )}
      </th>
      <th>
        <span
          className={`${secondSlaTime >= 600 && "bg-danger"} text-center px-3`}
        >
          {/* {formatTime(elapsedTime)} */}

          {secondSlaTime}
        </span>
      </th>
      <th style={{ textAlign: "center", cursor: "pointer" }}>
        <Link to={`/agent/single/${item._id}`}>
          <PlusOutlined />
        </Link>
      </th>
    </tr>
  );
};

export default SinglePickedTicket;
