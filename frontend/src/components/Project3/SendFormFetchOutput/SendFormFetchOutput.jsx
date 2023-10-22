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
    <div className="m-10 space-y-5">
      <div className="flex space-x-5">
        <SharedButton
          variant="button1"
          onClick={fetchData}
          label="Fetch Data"
        ></SharedButton>
        {data && (
          <div className="flex flex-col space-y-2 ml-5">
            <div>
              <strong>CPI:</strong> {data.cpi_data.cpi}
            </div>
            <div>
              <strong>Speech Content:</strong>{" "}
              {data.speech_content && data.speech_content}
            </div>
            <div>
              <strong>Fed expected policy:</strong> {data.interpretation}
            </div>
          </div>
        )}
      </div>
      <div className="flex space-x-5">
        <SharedButton
          variant="button1"
          onClick={runModel}
          label="Run Model"
        ></SharedButton>
        {modelResult && (
          <div className="flex flex-col space-y-2 ml-5">
            <strong>Model Result:</strong> {modelResult}
          </div>
        )}
      </div>
    </div>
  );
}
