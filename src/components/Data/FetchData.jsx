import { useEffect, useState, useStateconst } from "react";

const API_KEY = "d2e080f60c01434b9a92c3d37932169f";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${"Delhi"}&appid=${API_KEY}&units=metric`;

const FetchData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(API_URL);
        const data = await resp.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return <h1>Data</h1>;
};

export default FetchData;
