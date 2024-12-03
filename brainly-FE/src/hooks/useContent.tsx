import axios from "axios";
import { useEffect, useState } from "react";
import { BEURL } from "../config";

export function useContent() {
  const [contents, setContents] = useState([]);

  function refresh() {
    axios
      .get(`${BEURL}/api/v1/content`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setContents(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    refresh();
    const timer = setInterval(refresh, 10 * 1000);
    return () => clearTimeout(timer);
  }, []);

  return contents;
}
