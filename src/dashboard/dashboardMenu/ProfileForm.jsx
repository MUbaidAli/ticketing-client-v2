import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/Auth";
import { toast } from "react-hot-toast";
import axios from "axios";

const ProfileUpdateForm = ({ setIsModalOpen }) => {
  let [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);

  useEffect(() => {
    if (auth && auth?.token) {
      setName(auth.user.name);
      setEmail(auth.user.email);
    }
  }, [auth, auth.token]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("click");
    if (password !== password2) {
      console.log("inside pass");
      toast.error("Password is Not Matched");
    } else {
      try {
        console.log("start");
        setIsLoading(true);
        const { data } = await axios.put(
          "/update-user",
          {
            id: auth?.user?._id,
            name,
            password,
          },
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        console.log(data);
        if (data.error) toast.error("someThing went Wrong");

        if (auth?.user?._id === data._id) {
          setAuth({ ...auth, user: data });
          // localStorage.setItem("auth", JSON.stringify(data));
          let fromLocalStorage = JSON.parse(localStorage.getItem("auth"));
          fromLocalStorage.user = data;
          localStorage.setItem("auth", JSON.stringify(fromLocalStorage));
          setIsModalOpen(false);
          console.log(auth);
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      {name}

      <div className="form-row">
        <div className="form-group col-md-6">
          <label for="inputEmail5">Name</label>
          <input
            type="name"
            className="form-control"
            id="inputEmail5"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        </div>
        <div className="form-group col-md-6">
          <label for="inputEmail4">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="inputEmail4"
            placeholder="Email"
          />
        </div>
        <div className="form-group col-md-5">
          <label for="inputPassword4">Password</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <label for="inputPassword5">Confirm password</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword5"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="Confirm Password"
          />
        </div>
      </div>
      <button isLoading={isLoading} onClick={(e) => handleSubmit(e)}>
        Submit
      </button>
    </>
  );
};

export default ProfileUpdateForm;
