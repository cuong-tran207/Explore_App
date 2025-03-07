import { Alert } from "react-native";
import tokenManager from "./tokenManager";

class ApiServer {
  static endpoint = "https://discover-tourism.minhquancao0.workers.dev/api";
  async call(cmd, args = {}, method = "") {
    if (!method) method = Object.keys(args).length === 0 ? "GET" : "POST";
    let url = `${ApiServer.endpoint}/${cmd}`;
    if (Object.keys(args).length && method === "GET") {
      url += "?" + new URLSearchParams(args).toString();
    }

    const token = tokenManager.getToken();
    console.log(" tokenManager.getToken() :", tokenManager.getToken());
    const headers = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const options =
      method === "GET"
        ? { headers }
        : {
            method,
            headers: {
              ...headers,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(args),
          };

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      if (json.error) {
        Alert.alert("Lỗi", json.error.message);
      }
      return json;
    } catch (error) {
      Alert.alert("Lỗi", error.message);
      throw error;
    }
  }
}

const apiServer = new ApiServer();
export default apiServer;
