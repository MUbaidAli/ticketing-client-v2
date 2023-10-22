import React from "react";
import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button, Form, Input } from "antd";
import { AuthContext } from "../context/Auth";
import { useNavigate } from "react-router-dom";

const LOGIN_ENDPOINT = "http://localhost:9000/api/login";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${LOGIN_ENDPOINT}`, values);
      console.log(data);
      if (data.error) throw new Error(data.error);
      else {
        setAuth({ user: data.user, token: data.token });
        localStorage.setItem("auth", JSON.stringify(data));

        console.log(auth);
        toast.success("login Successfull");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }

    console.log("Success:", values, auth);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {isLoading && "loading...."}

      <p>token : {auth?.token}</p>
      {}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default Login;
