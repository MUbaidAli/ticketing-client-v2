import { useContext, useEffect, useState } from "react";
import ClientDashboard from "../dashboard/ClientDashboard";
import { LinkOutlined } from "@ant-design/icons";
import { AuthContext } from "../../../context/Auth";
import toast from "react-hot-toast";
import axios from "axios";
const ShowRequest = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const [auth] = useContext(AuthContext);

  async function getList() {
    try {
      setLoading(true);

      const response = await axios.get("/my/tickets", {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      console.log(response);
      if (response.data.ok) {
        setList(response.data.tickets);
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (auth && auth?.token) {
      getList();
    }
  }, [auth && auth?.token]);

  return (
    <ClientDashboard>
      <div class="table-responsive">
        <table class="table ">
          <caption>Your open tickets</caption>
          <thead>
            <tr>
              <th scope="col"># {loading && "loading..."}</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col">Priority</th>
              <th scope="col">Created At</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {list?.map((x, index) => (
              <tr>
                <th scope="row">{++index}</th>
                <td>{x.title}</td>
                <td>{x.description}</td>
                <td>{x.category?.name}</td>
                <td>{x.priority}</td>
                <td>{x.createdAt.slice(0, 10)}</td>
                <td>
                  <LinkOutlined />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ClientDashboard>
  );
};

export default ShowRequest;
