import axios from "axios";

const axiosClient = axios.create({
  //PROD
  baseURL: "https://web-production-5f69.up.railway.app/",
  //DEVO
  // baseURL: "http://localhost:3200",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response;
    } else {
      return response;
    }
  },
  (err) => {
    return err.response;
  }
);

export default axiosClient;
