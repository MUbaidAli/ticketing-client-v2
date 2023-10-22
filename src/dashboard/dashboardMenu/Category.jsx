import Dashboard from "../../components/Dashboard";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { AuthContext } from "../../context/Auth";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Category = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      setIsLoading(true);
      const response = await axios.post("/by/auth/create/category", values, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setCategory([...category, response.data.category]);
        toast.success(response.data.message);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  async function getData() {
    try {
      const response = await axios.get("all/categories", {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      console.log(response);
      if (response.data) setCategory(response.data.categories);
    } catch (err) {
      console.log(err.message);
    } finally {
    }
  }

  async function handleDelete(id) {
    console.log(id);
    let ok = window.confirm("Are You Sure You Want To Delete The Category ? ");
    if (ok) {
      try {
        const response = await axios.delete(`/by/auth/delete/${id}`, {
          headers: { Authorization: `Bearer ${auth?.token}` },
        });

        if (response.data.ok) {
          setCategory(category.filter((curCat) => curCat._id !== id));

          toast.success("Successfully removed");
        }
        console.log(response);
      } catch (err) {
        console.log(err.message);
      } finally {
      }
    }
  }

  useEffect(() => {
    if (auth && auth?.token) {
      getData();
    }
  }, [auth && auth?.token]);

  return (
    <>
      <Dashboard>
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
            label="Category"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input Category Name!",
              },
            ]}
          >
            <Input />
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

        <div className="container">
          <table class="table">
            {category.map((cat, i) => (
              <tr
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "5px 0",
                }}
              >
                <th style={{ flex: "1" }}>{i + 1}</th>
                <td style={{ flex: "3" }}>{cat.name}</td>

                <td
                  className="btn btn-danger "
                  onClick={() => handleDelete(cat._id)}
                  style={{ flex: "1" }}
                >
                  Delete
                </td>
              </tr>
            ))}
          </table>
        </div>
      </Dashboard>
      ;
    </>
  );
};

export default Category;
