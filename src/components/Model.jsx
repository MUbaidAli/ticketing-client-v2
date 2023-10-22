import React, { useContext, useState } from "react";
import { Button, Modal } from "antd";
import ProfileUpdateForm from "../dashboard/dashboardMenu/ProfileForm";
import { AuthContext } from "../context/Auth";

const Model = ({ isModalOpen, setIsModalOpen }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}></Button>
      <Modal
        title="Update Profile"
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        setIsModalOpen={setIsModalOpen}
      >
        <ProfileUpdateForm setIsModalOpen={setIsModalOpen} />
      </Modal>
    </>
  );
};

export default Model;
