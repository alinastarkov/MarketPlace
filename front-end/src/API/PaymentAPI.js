import axios from "axios";
const API_URL = "http://localhost:8000";

export function postPayment(data) {
  const url = `${API_URL}/checkout/`;
  console.log(data);
  return axios.post(url, data).then(
    response => {
      return response.data;
    },
    error => {
      console.log(error);
      return { error: true };
    }
  );
}
