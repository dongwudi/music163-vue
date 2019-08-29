import axios from "./index";

function getData(url, data = null) {
  return axios.get(url, {
    params: data
  });
}

function postData(url, data) {
  return axios.post(url, data);
}

export const RES_OK = 200;

export const remdSongs = () => getData("/api/personalized", { limit: 6 });
export const remdNewSongs = () => getData("/api/personalized/newsong");
