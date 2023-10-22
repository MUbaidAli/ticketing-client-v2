import { useState } from "react";
import { Layout, Menu, Button, theme } from "antd";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  UploadOutlined,
  UserOutlined,
  DashboardOutlined,
  UsergroupAddOutlined,
  DiffOutlined,
} from "@ant-design/icons";
const { Header, Sider, Content } = Layout;

const ClientNav = ({ collapsed }) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  console.log(pathname, "rrd");
  return (
    <Sider
      className={collapsed ? "navColaps" : ""}
      // style={{
      //   background: "green",
      // }}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        items={[
          {
            key: "1",
            icon: <DashboardOutlined />,
            label: <NavLink to="/client">Dashboard</NavLink>,
            // onClick: () => navigate("/dashboard"),
            // style: { backgroundColor: "green" },
            // className: {`${pathname == "/admin" ? "ant-menu-item-selected" : ""} `}
            className: `${
              pathname === "/client" ? "ant-menu-item-selected" : ""
            }`,
          },
          {
            key: "2",
            icon: <UsergroupAddOutlined />,
            label: <NavLink to="/client/new-request">Submit request</NavLink>,
            // onClick: () => navigate("all-clients"),
            className: `${
              pathname === "/client/new-request" ? "ant-menu-item-selected" : ""
            }`,
          },
          {
            key: "3",
            icon: <DiffOutlined />,
            label: <NavLink to="/client/open-request">Open request</NavLink>,
            // onClick: () => navigate("category"),
            // onClick: () => <Link to="category">c</Link>,
            className: `${
              pathname === "/client/open-request"
                ? "ant-menu-item-selected"
                : ""
            }`,
          },
          {
            key: "4",
            icon: <DiffOutlined />,
            label: (
              <NavLink to="/client/resolved-client-tickets">
                Resolved Tickets
              </NavLink>
            ),
            // onClick: () => navigate("category"),
            // onClick: () => <Link to="category">c</Link>,
            className: `${
              pathname === "/client/resolved-client-tickets"
                ? "ant-menu-item-selected"
                : ""
            }`,
          },
        ]}
      />
    </Sider>
  );
};

export default ClientNav;
