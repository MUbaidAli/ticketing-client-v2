import { useContext, useEffect } from "react";
import { AuthContext } from "../context/Auth";
import { Link } from "react-router-dom";

const Home = () => {
  const [auth] = useContext(AuthContext);

  // useEffect(() => {
  //   if (auth) return console.log("check");
  // }, [auth]);

  console.log(auth);
  return (
    <>
      <h1>Home</h1>
      {auth?.user?.role}
      <p>test</p>
      {/* {!auth?.user && <Link to="login">Login</Link>} */}
      {auth?.user?.role && `Welcome ${auth.user.role}`}
      {auth && auth?.user?.role === "admin" && (
        <Link to="/dashboard">{auth.user.role} Dashboard</Link>
      )}
    </>
  );
};

export default Home;
