import { useEffect, useState } from "react";

export const useStates = () => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    fetch("https://brasilapi.com.br/api/ibge/uf/v1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setStates(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return {
    states
  }
};
