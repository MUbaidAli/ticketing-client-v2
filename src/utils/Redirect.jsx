import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
  const [count, setCount] = useState(4);
  const router = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    if (count === 0) router("/");

    return () => clearInterval(intervalId);
  }, [count]);

  return <p> wait please {count} </p>;
};

export default Redirect;
