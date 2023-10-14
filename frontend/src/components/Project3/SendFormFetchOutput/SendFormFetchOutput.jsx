import { useState } from "react";
import axios from "axios";

export default function GetEconomicData() {
  const [data, setData] = useState(null);
  const [modelResult, setModelResult] = useState(null);
  const [text, setText] = useState(null);
  const [interpretation, setInterpretation] = useState(null);

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

  const fetchText = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/fetch-text");
      setText(response.data);
    } catch (error) {
      console.error("Error fetching text: ", error);
    }
  };

  const fetchInterpretation = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/fetch-interpretation",
        text
      );
      setInterpretation(response.data);
    } catch (error) {
      console.error("Error fetching interpretation: ", error);
    }
  };

  return (
    <>
      <div>
        <div className="flex space-x-5">
          <button onClick={fetchData}>Fetch Data</button>
          {data && <div>Your fetched data: {JSON.stringify(data)}</div>}
        </div>
        <div className="flex space-x-5">
          <button onClick={runModel}>Run Model</button>
          {modelResult && (
            <div>Your model result: {JSON.stringify(modelResult)}</div>
          )}
        </div>
        <div>
          <div className="flex space-x-5">
            <button className="" onClick={fetchText}>
              Get Text
            </button>
            {text && <div>Your text: {JSON.stringify(text)}</div>}
          </div>
        </div>
        <div>
          <button onClick={fetchInterpretation}>Get Interpretation</button>
          {interpretation && (
            <div>Your interpretation: {JSON.stringify(interpretation)}</div>
          )}
        </div>
      </div>
    </>
  );
}
