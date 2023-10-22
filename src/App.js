import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import Home from "./system";
import Register from "./system/Register";
import Login from "./system/Login";
import ForgotPassword from "./system/ForgotPassword";
import PageNotFound from "./components/PageNotFound";
import Dashboard from "./components/Dashboard";
import AllUsers from "./components/AllUsers";
import AllUser from "./dashboard/dashboardMenu/allUser";
import AllClient from "./dashboard/dashboardMenu/AllClient";
import AllManagers from "./dashboard/dashboardMenu/AllManagers";
import AllAgents from "./dashboard/dashboardMenu/AllAgents";
import AllAdmins from "./dashboard/dashboardMenu/AllAdmins";
import DashBoardAnalytics from "./dashboard/dashboardMenu/DashBoarAnalytics";
import Category from "./dashboard/dashboardMenu/Category";
import CreateAccount from "./dashboard/dashboardMenu/CreateAccount";
import Client from "./dashboard/client";
import SubmitRequest from "./dashboard/client/clientDashboardnav/SubmitRequest";
import ShowRequests from "./dashboard/client/clientDashboardnav/ShowRequests";
import Agent from "./dashboard/agent";
import PickedTickets from "./dashboard/agent/components/PicketTickets";
import Single from "./dashboard/agent/components/single";
import ResolvedTc from "./dashboard/agent/components/ResolvedTc";
import AssignedTc from "./dashboard/agent/components/AsignedTc";
import HandoverTc from "./dashboard/agent/components/HandoverTc";
import ResolvedTcClient from "./dashboard/client/ResolvedTcClient";
// import SubmitRequest from "./dashboard/client/"
const App = () => {
  return (
    <>
      <Routes>
        <Route index to="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<DashBoardAnalytics />} />
        <Route path="/dashboard/category" element={<Category />} />
        <Route path="/dashboard/create-account" element={<CreateAccount />} />
        {/* <Route path="allusers" element={<AllUsers />} /> */}
        {/* users Routes */}
        {/* <Route path="dashboard/alluser" element={<AllUser />} /> */}
        <Route path="/dashboard/all-clients" element={<AllClient />} />
        <Route path="/dashboard/all-admins" element={<AllAdmins />} />
        <Route path="/dashboard/all-managers" element={<AllManagers />} />
        <Route path="/dashboard/all-agents" element={<AllAgents />} />

        {/* Client Dashboard */}
        <Route path="/client" element={<Client />} />
        <Route path="/client/new-request" element={<SubmitRequest />} />
        <Route path="/client/open-request" element={<ShowRequests />} />
        <Route
          path="/client/resolved-client-tickets"
          element={<ResolvedTcClient />}
        />

        {/* Agent Dashboard */}
        <Route path="/agent" element={<Agent />} />
        <Route path="/agent/picked-tickets" element={<PickedTickets />} />
        <Route path="/agent/single/:id" element={<Single />} />
        <Route path="/agent/resolved-tickets" element={<ResolvedTc />} />
        <Route path="/agent/assigned-tickets" element={<AssignedTc />} />
        <Route path="/agent/handover-tickets" element={<HandoverTc />} />

        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
