import axios from "axios";
const API_URL = "http://localhost:8000";
const token = localStorage.getItem("access");
export function postPayment(data) {
  const url = `${API_URL}/checkout/`;
  const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };
  console.log(data);
  return axios.post(url, data, config).then(
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
  const param = {
    params: { username: username },
    headers: { Authorization: "Bearer " + token }
  };
  return axios.get(url, param).then(response => response.data);
}
