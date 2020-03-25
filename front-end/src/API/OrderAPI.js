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

export function getUserOrders(username) {
  const url = `${API_URL}/user/orders/`;
  const param = { params: { username: username } };
  return axios.get(url, param).then(response => response.data);
}
