import axios from "axios";

export default axios.create({
  baseURL: "https://caabackend.herokuapp.com/",
  headers: {
    "Content-type": "application/json"
  }
});
