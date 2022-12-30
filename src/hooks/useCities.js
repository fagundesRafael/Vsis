import { useEffect, useState } from "react";

export const useCities = ({ siglaUF }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (!siglaUF) {
      return;
    }
    fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${siglaUF}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCities(data);
      })
      .catch((err) => console.log(err));
  }, [siglaUF]);

  return {
    cities,
  };
};
