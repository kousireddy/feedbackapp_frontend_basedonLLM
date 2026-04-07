// api.js
import axios from "axios";

const API = "http://127.0.0.1:8000";

export const sendMessage = async (message) => {
  const res = await axios.post(`${API}/chat`, {
    message
  });
  return res.data;
};