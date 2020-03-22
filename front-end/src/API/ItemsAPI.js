import axios from "axios";
const API_URL = "http://localhost:8000";

export function getItems() {
  const url = `${API_URL}/api/items/`;
  return axios.get(url).then(response => response.data);
}

export function postItem(data) {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };
  const url = `${API_URL}/sell-item/`;
  let form_data = new FormData();
  form_data.append("image", data.image);
  form_data.append("name", data.name);
  form_data.append("category", data.category);
  form_data.append("description", data.description);
  form_data.append("size", data.size);
  form_data.append("price", data.price);
  form_data.append("brand", data.brand);
  form_data.append("username", data.username);

  return axios.post(url, form_data, config).then(
    response => {
      return response.data;
    },
    error => {
      console.log(error);
      return { error: true };
    }
  );
}

export function getUserItems(username) {
  const url = `${API_URL}/user/item/`;
  const param = { params: { username: username } };
  return axios.get(url, param).then(
    response => {
      return response.data;
    },
    error => {
      console.log(error);
      return { error: true };
    }
  );
}

export function deleteUserItem(username, itemName) {
  const url = `${API_URL}/user/item/`;
  const param = { data: { username: username, item_name: itemName } };
  return axios.delete(url, param).then(
    response => {
      return response.data;
    },
    error => {
      console.log(error);
      return { error: true };
    }
  );
}
