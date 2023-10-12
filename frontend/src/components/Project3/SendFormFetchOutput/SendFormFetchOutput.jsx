import { useState } from "react";
import axios from "axios";

export default function SendFormFetchOutput() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchData() {
    setLoading(true);

    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/fetch-data",
        {}
      );
      setData(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button className="bg-red-200" onClick={fetchData} formMethod="GET">
        Fetch Data
      </button>
      {loading && <p>Loading ...</p>}
      {error && <p>Error: {error}</p>}
      {data && <div>{data}</div>}
    </div>
  );
}
