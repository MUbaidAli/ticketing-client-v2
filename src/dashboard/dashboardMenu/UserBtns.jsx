import { NavLink } from "react-router-dom";

const BTN_STYLES = {
  background: "#1677ff",
  color: "#fff",
  padding: "10px 15px",
  margin: "10px",
  display: "inline-block",
  borderRadius: "10px",
  textDecoration: "none",
};

const UserBtns = () => {
  return (
    <>
      <NavLink to="/dashboard/all-clients" style={BTN_STYLES}>
        All Client
      </NavLink>
      <NavLink to="/dashboard/all-agents" style={BTN_STYLES}>
        All Agents
      </NavLink>
      <NavLink to="/dashboard/all-managers" style={BTN_STYLES}>
        {" "}
        All Managers
      </NavLink>
      <NavLink to="/dashboard/all-admins" style={BTN_STYLES}>
        All Admins
      </NavLink>
    </>
  );
};

export default UserBtns;
