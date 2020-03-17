import axios from "axios";
const API_URL = "http://localhost:8000";

export function getItems() {
  const url = `${API_URL}/api/items/`;
  return axios.get(url).then(response => response.data);
}
