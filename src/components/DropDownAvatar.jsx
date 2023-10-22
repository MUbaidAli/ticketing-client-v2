import React, { useState } from "react";
import { Avatar, Button } from "antd";
import DropDownFunc from "./DropDownFunc";
const UserList = ["U", "Lucy", "Tom", "Edward"];
const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];

const DropDownAvatar = ({ items }) => {
  const [user, setUser] = useState(UserList[0]);
  const [color, setColor] = useState(ColorList[0]);

  const changeUser = () => {
    const index = UserList.indexOf(user);
    setUser(index < UserList.length - 1 ? UserList[index + 1] : UserList[0]);
    setColor(
      index < ColorList.length - 1 ? ColorList[index + 1] : ColorList[0]
    );
  };

  return (
    <>
      <DropDownFunc items={items}>
        <Avatar
          style={{
            backgroundColor: color,
            verticalAlign: "middle",
            margin: "15px",
            cursor: "pointer",
          }}
          size="large"
        >
          {user}
        </Avatar>
      </DropDownFunc>
    </>
  );
};
export default DropDownAvatar;
