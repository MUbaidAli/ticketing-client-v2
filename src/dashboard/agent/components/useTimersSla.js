import { useEffect, useState } from "react";

function useTimersSla(pickedAt) {
  const [timer, settimer] = useState(timeDifference(pickedAt));
  function timeDifference(created) {
    return Math.floor((new Date() - new Date(created)) / 1000);
  }
  //   console.log(timeDifference(item.createdAt));

  useEffect(() => {
    const timers = setInterval(() => {
      settimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timers);
  }, []);

  function formateTime(timer) {
    const min = Math.floor(timer / 60);
    const sec = timer % 60;
    // console.log(min, sec);
    return `${min}:${sec}`;
  }

  return formateTime(timer);
}

export default useTimersSla;
