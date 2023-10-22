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

const SideNav = ({ collapsed }) => {
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
            label: <NavLink to="/dashboard">Dashboard</NavLink>,
            // onClick: () => navigate("/dashboard"),
            // style: { backgroundColor: "green" },
            // className: {`${pathname == "/admin" ? "ant-menu-item-selected" : ""} `}
            className: `${
              pathname === "/dashboard" ? "ant-menu-item-selected" : ""
            }`,
          },
          {
            key: "2",
            icon: <UsergroupAddOutlined />,
            label: <NavLink to="/dashboard/all-clients">All Users</NavLink>,
            // onClick: () => navigate("all-clients"),
            className: `${
              pathname === "/dashboard/all-clients"
                ? "ant-menu-item-selected"
                : ""
            }`,
          },
          {
            key: "3",
            icon: <DiffOutlined />,
            label: <NavLink to="/dashboard/category">Category</NavLink>,
            // onClick: () => navigate("category"),
            // onClick: () => <Link to="category">c</Link>,
            className: `${
              pathname === "/dashboard/category" ? "ant-menu-item-selected" : ""
            }`,
          },
          {
            key: "4",
            icon: <UploadOutlined />,
            label: (
              <NavLink to="/dashboard/create-account">Create Account</NavLink>
            ),
            className: `${
              pathname === "/dashboard/create-account"
                ? "ant-menu-item-selected"
                : ""
            }`,
          },
        ]}
      />
    </Sider>
  );
};

export default SideNav;
