import { Timeline } from "antd";
import ClientDashboard from "./dashboard/ClientDashboard";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/Auth";
import toast from "react-hot-toast";

const ResolvedTcClient = () => {
  const [auth] = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const displayData = data?.map((item) => {
    return {
      children: `created with Name "${item.title}"
      with Desc: "${item.description}"  `,
    };
  });

  console.log(displayData);
  async function getResolvedTc() {
    try {
      setLoading(true);
      const { data } = await axios.get("/resolved-tickets", {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      if (data?.ok) {
        console.log(data);
        setData(data?.tickets);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (auth && auth?.token) {
      getResolvedTc();
    }
  }, [auth && auth?.token]);

  return (
    <ClientDashboard>
      <Timeline items={displayData} />
    </ClientDashboard>
  );
};

export default ResolvedTcClient;
