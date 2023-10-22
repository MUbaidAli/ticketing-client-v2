import React from "react";

import { Dropdown, Space } from "antd";
// import { AuthContext } from "../context/Auth";

const DropDownFunc = ({ children, items }) => {
  //   const [auth, setAuth] = useContext(AuthContext);
  return (
    <>
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>{children}</Space>
        </a>
      </Dropdown>
    </>
  );
};
export default DropDownFunc;
