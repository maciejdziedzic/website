import { useState } from "react";
import axios from "axios";

export default function GetEconomicData() {
  const [data, setData] = useState(null);
  const [modelResult, setModelResult] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/fetch-data");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
      // Handle error appropriately for your app
    }
  };

  const runModel = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/run-model",
        data
      );
      setModelResult(response.data);
    } catch (error) {
      console.error("Error running model: ", error);
      // Handle error appropriately for your app
    }
  };

  // ... rest of your component

  return (
    <>
      <button onClick={fetchData}>Fetch Data</button>
      <button onClick={runModel}>Run Model</button>
      {/* Display data and modelResult as needed */}
      {data && <div>Your fetched data: {JSON.stringify(data)}</div>}
      {modelResult && (
        <div>Your model result: {JSON.stringify(modelResult)}</div>
      )}
    </>
  );
}
