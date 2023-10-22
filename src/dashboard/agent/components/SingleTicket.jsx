import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const SingleTicket = ({ i, item, handlePickedTicket }) => {
  const [timer, settimer] = useState(timeDifference(item.createdAt));

  function timeDifference(created) {
    return Math.floor((new Date() - new Date(created)) / 1000);
  }
  //   console.log(timeDifference(item.createdAt));

  useEffect(() => {
    const timers = setInterval(() => {
      settimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timers);
  }, []);

  function formateTime(timer) {
    const min = Math.floor(timer / 60);
    const sec = timer % 60;
    // console.log(min, sec);
    return `${min}:${sec}`;
  }
  //   const [checktime, setCheckTime] = useState(600);
  //   useEffect(() => {
  //     const timers = setInterval(() => {
  //       setCheckTime((prev) => prev + 1);
  //     }, 1000);

  //     return () => clearInterval(timers);
  //   }, []);

  //   formateTime(checktime);

  //   console.log(timer);
  return (
    <>
      <tr>
        <td>{i + 1}</td>
        <td>{item.title}</td>
        <td>{item.description}</td>
        <td>{item.priority}</td>
        <td>{item.createdAt.slice(0, 10)}</td>
        <td className={timer > 600 ? "bg-danger" : ""}>
          <span>
            {timer > 600 ? (
              <p style={{ color: "#fff", fontWeight: "bolder" }}>Yes</p>
            ) : (
              formateTime(timer)
            )}
          </span>
        </td>

        <td style={{ textAlign: "center", cursor: "pointer" }}>
          <PlusOutlined onClick={() => handlePickedTicket(item._id)} />
        </td>
      </tr>
    </>
  );
};

export default SingleTicket;
