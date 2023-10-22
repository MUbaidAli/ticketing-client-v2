import React, { useEffect, useState } from "react";

import { Button, Card, Input, Select } from "antd";
import { IoCreate, IoHome, IoSendOutline } from "react-icons/io5";

import Dashboard from "../../components/Dashboard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth";
import { useCatContext } from "../../context/CatContext";

const data = [
  { name: "Mon", accounts: 3 },
  { name: "Tue", accounts: 4 },
  { name: "Wed", accounts: 2 },
  { name: "Thu", accounts: 5 },
  { name: "Fri", accounts: 3 },
  { name: "Sat", accounts: 3 },
  { name: "Sun", accounts: 3 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          padding: "5px",
          color: "#0b3d91",
          border: "1px solid #0b3d91",
          background: "rgba(255, 255, 255, 0.6)",
        }}
      >
        <p>{`${payload[0].value} accounts on ${payload[0].payload.name}`}</p>
      </div>
    );
  }
  return null;
};

const { Option } = Select;

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    category: "",
    role: "",
    password: "",
    password2: "",
  });

  // console.log(cat);
  console.log("formData", formData);

  const handleSelectInput = (name, value) => {
    handleChange({ target: { name, value } });
  };

  const handleChange = ({ target: { name, value } }) => {
    // const { name, value } = e.target;
    // const formData[e.target.name] = e.target.value

    // formData[e.target.name] = e.target.value;

    // console.log(name, value);
    // setFormData((prevState) => ({
    //   ...prevState,
    //   [e.target.name]: formData[e.target.name],
    // }));
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("click");
    if (formData.password !== formData.password2) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("/register/a/user", formData, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      if (response.data.error) throw new Error(response.data.error);
      else {
        console.log(response);
        toast.success("Form data submitted:", formData);
        console.log("Form data submitted:", formData);
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  const totalAccounts = data.reduce((acc, curr) => acc + curr.accounts, 0);
  const [auth] = useContext(AuthContext);
  const [cat, setCat, isLoading] = useCatContext();
  const [catLoading, setCatLoading] = useState(true);
  const [catState, setCatState] = useState([]);
  useEffect(() => {
    if (auth && auth?.token) {
      setCatState(cat);
      setCatLoading(false);
    }
  }, [auth && auth?.token]);

  return (
    <Dashboard>
      {formData?.name}
      {formData?.email}
      {formData?.password}
      {formData?.password2}
      {formData?.role}
      {formData?.category}
      {console.log(cat)}
      {catLoading && "loading..."}
      {!catLoading && (
        <Card
          className="cardStyle mt-3"
          // style={{ background: "linear-gradient(45deg, #0b3c913a, #00000033)" }}
        >
          <div className="row">
            <div className="col-md-6">
              <div className="form-group py-2">
                <label for="exampleFormControlInput1"> Email</label>
                <Input
                  type="email"
                  style={{ border: "none" }}
                  placeholder="example@hadiraza.com "
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group py-2">
                <label for="exampleFormControlInput1">Name</label>
                <Input
                  type="text"
                  style={{ border: "none" }}
                  placeholder="User's name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group py-2">
                <label for="exampleFormControlInput1"> Password</label>
                <Input
                  type="password"
                  style={{ border: "none" }}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group py-2">
                <label for="exampleFormControlInput1">Confrim Password</label>
                <Input
                  type="password"
                  style={{ border: "none" }}
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group py-2">
                <label>
                  Choose Role<span className="text-danger">*</span>
                </label>

                <Select
                  required
                  // style={{ border: "none" }}

                  value={formData.role}
                  onChange={(value) => handleSelectInput("role", value)}
                  // value={formData.role}
                  // name="role"
                  // onChange={handleChange}
                  style={{ width: "100%" }}
                  // className="form-select"
                >
                  <Option value="choose">Choose</Option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="agent">Agent</option>
                  <option value="client">Client</option>
                </Select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group py-2">
                <label>
                  Choose Category<span className="text-danger">*</span>
                </label>

                {isLoading && "Loading..."}
                {!isLoading && (
                  <Select
                    required
                    value={formData.category}
                    name="category"
                    onSelect={(value) => handleSelectInput("category", value)}
                    style={{ width: "100%" }}
                    // className="form-select"
                  >
                    <Option value="choose">Choose</Option>

                    {catState?.map((item) => (
                      <option value={item._id}>{item.name}</option>
                    ))}

                    {/* <option value="manager">Manager</option>
                <option value="agent">Agent</option>
                <option value="client">Client</option> */}
                  </Select>
                )}
              </div>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="clicks mt-3"
            icon={<IoSendOutline />}
          >
            Submit
          </Button>
        </Card>
      )}
      <div className="d-flex gap-3">
        <div
          style={{
            width: "50%",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            background: "linear-gradient(45deg, #000000 ,#0b3d91)",
            color: "white",
            borderRadius: "10px",
          }}
        >
          <div>
            <strong>{totalAccounts}</strong> agents accounts created
          </div>
          <div style={{ width: "40%", height: 100 }}>
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" />
                <XAxis dataKey="name" tick={{ fill: "#ffffff" }} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="accounts"
                  stroke="#ffffff"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          style={{
            width: "50%",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            background: "linear-gradient(45deg, #000000 ,#0b3d91)",
            color: "white",
            borderRadius: "10px",
          }}
        >
          <div>
            <strong>{totalAccounts}</strong> manager accounts created
          </div>
          <div style={{ width: "40%", height: 100 }}>
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" />
                <XAxis dataKey="name" tick={{ fill: "#ffffff" }} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="accounts"
                  stroke="#ffffff"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default CreateAccount;
