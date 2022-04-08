import { useState } from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

const NewTicket = (props) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: {
      title,
      price,
    },
    onSuccess: (ticket) => Router.push("/"),
  });

  const onBlur = () => {
    const value = parseFloat(price);
    if (isNaN(value)) {
      return;
    }
    setPrice(value.toFixed(2));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    doRequest();
  };

  return (
    <div>
      <h1>New Ticket</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Price</label>
          <input
            type="text"
            className="form-control"
            name="Price"
            onBlur={onBlur}
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {errors}
          <button className="btn btn-primary">Create Ticket</button>
        </div>
      </form>
    </div>
  );
};

export default NewTicket;
