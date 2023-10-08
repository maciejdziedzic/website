import Papa from "papaparse";

async function fetchData(fileName) {
  const response = await fetch(`/${fileName}`);
  const reader = response.body.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder("utf-8");
  const csv = decoder.decode(result.value);
  const results = Papa.parse(csv, { header: true, skipEmptyLines: true });
  return results.data;
}

export default fetchData;
