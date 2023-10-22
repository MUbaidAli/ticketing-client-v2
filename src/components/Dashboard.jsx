import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import DashboardHeader from "../dashboard/DashboardHeader";
import SideNav from "../dashboard/SIdeNav";
import "./dashboard.css";
import Model from "./Model";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import DropDownAvatar from "../components/DropDownAvatar";
import { Layout, theme, Button } from "antd";

// import { Toast } from "bootstrap";
import { toast } from "react-hot-toast";
// import MainArea from "../dashboard/Main";
import { Content, Header } from "antd/es/layout/layout";
import Redirect from "../utils/Redirect";

const Dashboard = ({ children }) => {
  const [auth, setAuth] = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  //   const colorBgContainer = "#2245dj";
  useEffect(() => {
    if (auth && auth.token) {
      getCurrentAdmin();
    }
  }, []);

  const API_ENDPOINT_URL = "/current-admin";
  async function getCurrentAdmin() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${API_ENDPOINT_URL}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      //   console.log(data);
      if (data) {
        console.log(data);
        toast.success("Welcome");
      } else {
        throw new Error("something wrong");
      }
    } catch (err) {
      toast.error(err.message, "from here");
      navigate("/");
    } finally {
      setIsLoading(false);
      console.log("running");
    }
  }

  // if (isLoading) return <p>Loading....</p>;
  console.log(auth);

  const role = auth?.user?.role;
  // const role = "Admin";
  console.log(auth);
  console.log(role);
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
      <SideNav collapsed={collapsed} />

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
          {isLoading ? <Redirect /> : children}
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

export default Dashboard;
