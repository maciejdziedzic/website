import { useState } from "react";
import axios from "axios";

export default function SendFormFetchOutput() {
  const [t10y2yData, setT10y2yData] = useState(null);
  const [gdpData, setGdpData] = useState(null);
  const [interpretationData, setInterpretationData] = useState(null);
  const [fetchModelOutput, setFetchModelOutput] = useState(null);

  const [loadingT10y2y, setLoadingT10y2y] = useState(false);
  const [loadingGdp, setLoadingGdp] = useState(false);
  const [loadingInterpretation, setLoadingInterpretation] = useState(false);
  const [loadingFetchModelOutput, setLoadingFetchModelOutput] = useState(false);

  const [errorT10y2y, setErrorT10y2y] = useState(null);
  const [errorGdp, setErrorGdp] = useState(null);
  const [errorInterpretation, setErrorInterpretation] = useState(null);
  const [errorFetchModelOutput, setErrorFetchModelOutput] = useState(false);

  async function modelData() {
    setLoadingFetchModelOutput(true);
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/run-model");
      setFetchModelOutput(response.data);
    } catch (err) {
      setErrorFetchModelOutput(err.message);
    } finally {
      setLoadingFetchModelOutput(false);
    }
  }

  async function fetchT10y2y() {
    setLoadingT10y2y(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/fetch-t10y2y"
      );
      setT10y2yData(response.data);
    } catch (err) {
      setErrorT10y2y(err.message);
    } finally {
      setLoadingT10y2y(false);
    }
  }

  async function fetchGdp() {
    setLoadingGdp(true);
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/fetch-gdp");
      setGdpData(response.data);
    } catch (err) {
      setErrorGdp(err.message);
    } finally {
      setLoadingGdp(false);
    }
  }

  async function fetchInterpretation() {
    setLoadingInterpretation(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/fetch-interpretation"
      );
      setInterpretationData(response.data);
    } catch (err) {
      setErrorInterpretation(err.message);
    } finally {
      setLoadingInterpretation(false);
    }
  }

  return (
    <>
      <div>
        {" "}
        <button className="bg-blue-200" onClick={modelData} formMethod="GET">
          Run Model
        </button>
        {loadingFetchModelOutput && <p>Loading GDP...</p>}
        {errorFetchModelOutput && <p>Error: {errorFetchModelOutput}</p>}
        {fetchModelOutput && <div>GDP: {fetchModelOutput}</div>}
      </div>
      <div>
        <button className="bg-red-200" onClick={fetchT10y2y} formMethod="GET">
          T10Y2Y
        </button>
        {loadingT10y2y && <p>Loading T10Y2Y...</p>}
        {errorT10y2y && <p>Error: {errorT10y2y}</p>}
        {t10y2yData && <div>T10Y2YData: {JSON.stringify(t10y2yData)}</div>}

        <button className="bg-blue-200" onClick={fetchGdp} formMethod="GET">
          Fetch GDP
        </button>
        {loadingGdp && <p>Loading GDP...</p>}
        {errorGdp && <p>Error: {errorGdp}</p>}
        {gdpData && <div>GDP: {gdpData}</div>}

        <button
          className="bg-green-200"
          onClick={fetchInterpretation}
          formMethod="GET"
        >
          Get Interpretation
        </button>
        {loadingInterpretation && <p>Loading Interpretation...</p>}
        {errorInterpretation && <p>Error: {errorInterpretation}</p>}
        {interpretationData && <div>Interpretation: {interpretationData}</div>}
      </div>
    </>
  );
}
