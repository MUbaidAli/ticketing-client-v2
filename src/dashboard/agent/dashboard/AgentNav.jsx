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

const AgentNav = ({ collapsed }) => {
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
            label: <NavLink to="/agent">Dashboard</NavLink>,
            // onClick: () => navigate("/dashboard"),
            // style: { backgroundColor: "green" },
            // className: {`${pathname == "/admin" ? "ant-menu-item-selected" : ""} `}
            className: `${
              pathname === "/agent" ? "ant-menu-item-selected" : ""
            }`,
          },
          {
            key: "2",
            icon: <DashboardOutlined />,
            label: <NavLink to="/agent/picked-tickets">Picked Tickets</NavLink>,
            // onClick: () => navigate("/dashboard"),
            // style: { backgroundColor: "green" },
            // className: {`${pathname == "/admin" ? "ant-menu-item-selected" : ""} `}
            className: `${
              pathname === "/agent/picked-tickets"
                ? "ant-menu-item-selected"
                : ""
            }`,
          },
          {
            key: "3",
            icon: <DashboardOutlined />,
            label: (
              <NavLink to="/agent/resolved-tickets">Resolved Tickets</NavLink>
            ),
            // onClick: () => navigate("/dashboard"),
            // style: { backgroundColor: "green" },
            // className: {`${pathname == "/admin" ? "ant-menu-item-selected" : ""} `}
            className: `${
              pathname === "/agent/resolved-tickets"
                ? "ant-menu-item-selected"
                : ""
            }`,
          },
          {
            key: "4",
            icon: <DashboardOutlined />,
            label: (
              <NavLink to="/agent/assigned-tickets">Assigned Tickets</NavLink>
            ),
            // onClick: () => navigate("/dashboard"),
            // style: { backgroundColor: "green" },
            // className: {`${pathname == "/admin" ? "ant-menu-item-selected" : ""} `}
            className: `${
              pathname === "/agent/assigned-tickets"
                ? "ant-menu-item-selected"
                : ""
            }`,
          },
          {
            key: "5",
            icon: <DashboardOutlined />,
            label: (
              <NavLink to="/agent/handover-tickets">Handover Tickets</NavLink>
            ),
            // onClick: () => navigate("/dashboard"),
            // style: { backgroundColor: "green" },
            // className: {`${pathname == "/admin" ? "ant-menu-item-selected" : ""} `}
            className: `${
              pathname === "/agent/handover-tickets"
                ? "ant-menu-item-selected"
                : ""
            }`,
          },
        ]}
      />
    </Sider>
  );
};

export default AgentNav;
