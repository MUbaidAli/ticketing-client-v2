import { useContext, useState } from "react";
import ClientDashboard from "../dashboard/ClientDashboard";
import { useCatContext } from "../../../context/CatContext";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../../../context/Auth";
import { useNavigate } from "react-router-dom";

const form = {
  title: "",
  description: "",
  category: "",
  priority: "",
};

const SubmitRequest = () => {
  const [formData, setData] = useState(form);
  const router = useNavigate();

  const [cat] = useCatContext();
  const [auth] = useContext(AuthContext);
  //   const handleSelectInput = (name, value) => {
  //     getData({ target: { name, value } });
  //     // console.log(name, value);
  //   };

  //   function getData({ target: { name, value } }) {
  //     // console.log(name, value);
  //     setData((prev) => ({ ...prev, [name]: value }));
  //   }

  function getData(e) {
    // console.log(e.target.value);
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function submitForm(e) {
    e.preventDefault();
    console.log(formData);
    if (
      !formData.category ||
      !formData.title ||
      !formData.description ||
      !formData.priority
    ) {
      toast.error("All fields are requried");
      return;
    }

    try {
      let { data } = await axios.post("/add/ticket", formData, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      //   console.log(response);

      if (!data.ok) {
        throw new Error(data.message);
      } else {
        console.log(data);
        toast.success("data submited");
        router("/client/open-request");
      }
    } catch (err) {
      toast.error(err.message, "here");
    } finally {
    }
  }

  //   console.log(cat);
  return (
    <ClientDashboard>
      {/* {console.log(formData.title, formData.description, formData.category)}
      {console.log(formData)} */}
      {/* {(formData.title, formData.description)} */}
      <form onSubmit={submitForm}>
        <div className="form-group row my-2">
          <label for="title" className="col-4 col-form-label">
            Title
          </label>
          <div className="col-8">
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={getData}
              placeholder="Enter Title"
              type="text"
              required="required"
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group row">
          <label for="description" className="col-4 col-form-label">
            Description
          </label>
          <div className="col-8">
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={getData}
              cols="40"
              rows="5"
              aria-describedby="descriptionHelpBlock"
              required="required"
              className="form-control"
            ></textarea>
            <span id="descriptionHelpBlock" className="form-text text-muted">
              Enter Your Description
            </span>
          </div>
        </div>
        <div className="form-group row">
          <label for="priority" className="col-4 col-form-label">
            Priority
          </label>
          <div className="col-8">
            <select
              id="priority"
              name="priority"
              required="required"
              className="custom-select"
              onChange={getData}
              value={formData.priority}
            >
              <option value="">Choose</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label for="category" className="col-4 col-form-label">
            Category
          </label>
          <div className="col-8">
            <select
              id="category"
              name="category"
              onChange={getData}
              value={formData.category}
              required="required"
              className="custom-select"
            >
              <option value="">Choose</option>
              {cat.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
              {/* <option value="duck">Duck</option>
              <option value="fish">Fish</option> */}
            </select>
          </div>
        </div>
        <div className="form-group row">
          <div className="offset-4 col-8">
            <button
              name="submit"
              type="submit"
              className="btn btn-primary"
              onSubmit={(e) => {
                submitForm(e);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </ClientDashboard>
  );
};

export default SubmitRequest;
