import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
// import DashboardHeader from "../dashboard/DashboardHeader";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { Layout, theme, Button } from "antd";

// import { Toast } from "bootstrap";
import { toast } from "react-hot-toast";
// import MainArea from "../dashboard/Main";
import { Content, Header } from "antd/es/layout/layout";

import { AuthContext } from "../../../context/Auth";
import AgentNav from "./AgentNav";
import Model from "../../../components/Model";
import DropDownAvatar from "../../../components/DropDownAvatar";

const AgentDashboard = ({ children }) => {
  const [auth, setAuth] = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const items = [
    {
      label: "Profile",
      icon: <UserOutlined />,
      key: "0",
      onClick: () => {
        setIsModalOpen(true);
      },
    },
    {
      label: "LogOut",
      key: "1",
      icon: <LogoutOutlined />,
      onClick: () => {
        localStorage.clear();
        setAuth({});
        navigate("/");
      },
    },
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      <AgentNav collapsed={collapsed} />

      <Layout>
        {isModalOpen && (
          <Model isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        )}

        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          {/* {auth.user.name} */}

          {/* <p>Welcome {role[0].toUpperCase() + role.slice(1)}</p> */}
          <DropDownAvatar items={items} />
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>

        {/* <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {isLoading ? navigate("/") : children}
        </Content> */}
      </Layout>
    </Layout>
  );
};

export default AgentDashboard;
