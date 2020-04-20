import axios from "axios";
const API_URL = "http://localhost:8000";

export function login(data) {
  const url = `${API_URL}/login/`;
  return axios.post(url, data).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.log(error);
      return { error: true };
    }
  );
}

export function signup(data) {
  const url = `${API_URL}/signup/`;
  return axios.post(url, data).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.log(error);
      return { error: true };
    }
  );
}

export function getAllUsers() {
  const url = `${API_URL}/users/`;
  return axios.get(url).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.log(error);
      return { error: true };
    }
  );
}
