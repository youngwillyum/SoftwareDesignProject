import axios from "axios";

export default axios.create({
  baseURL: "https://mern-restaurant-backend-g82x.onrender.com/api/v1",
  headers: {
    "Content-type": "application/json"
  }
});