import React, { useContext, useEffect, useState } from "react";
import { Space, Table, Avatar } from "antd";
import { AuthContext } from "../../context/Auth";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "../../components/Loader";
import { Button, Modal } from "antd";
import Dashboard from "../../components/Dashboard";
import UserBtns from "./UserBtns";
// import Dashboard from "../components/Dashboard";

// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"],
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ["loser"],
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sydney No. 1 Lake Park",
//     tags: ["cool", "teacher"],
//   },
// ];
const AllUser = ({ url, title }) => {
  const [auth, setAuth] = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "",
      key: "avatar",
      render: (avatar) => (
        <Avatar
          src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${Math.random()}`}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" onClick={showModal}>
          <a style={{ color: "blue" }}>Edit</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (auth && auth?.token) getUserData();
  }, [auth, auth.token]);

  async function getUserData() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setData(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  console.log(auth, "auth");
  console.log(data, "data");
  return (
    <>
      {isLoading && <Loader />}
      <UserBtns />
      <h2>{title}</h2>
      {!isLoading && <Table columns={columns} dataSource={data} />}

      {/* model to update data */}
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
export default AllUser;
