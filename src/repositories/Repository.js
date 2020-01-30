import axios from "axios";
import variables from "../variables";

const baseURL = variables.baseUrl;

export default axios.create({
  baseURL
});
