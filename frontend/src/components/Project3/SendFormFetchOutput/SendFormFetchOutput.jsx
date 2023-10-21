import { useState } from "react";
import axios from "axios";
import SharedButton from "../../Shared/Button/SharedButton";

export default function GetEconomicData() {
  const [data, setData] = useState(null);
  const [modelResult, setModelResult] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/fetch-data");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
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
    }
  };

  return (
    <>
      <div className="flex space-x-5">
        <SharedButton
          variant="button1"
          onClick={fetchData}
          label="Fetch Data"
        ></SharedButton>
        {data && <div>Your fetched data: {JSON.stringify(data)}</div>}
      </div>
      <div className="flex space-x-5">
        <SharedButton
          variant="button1"
          onClick={runModel}
          label="Run Model"
        ></SharedButton>
        {modelResult && (
          <div>Your model result: {JSON.stringify(modelResult)}</div>
        )}
      </div>
    </>
  );
}
