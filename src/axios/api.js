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

export const bannerList = () => getData("/api/banner", { type: 2 });
export const remdSongs = () => getData("/api/personalized", { limit: 6 });
export const remdNewSongs = () => getData("/api/personalized/newsong"); 
export const hotList = () => getData("/api/top/list?idx=1");
export const hotSearch = () => getData("/api/search/hot");
export const searchMultimatch = (val) => getData(`/api/search/multimatch?keywords=${val}`)
export const searchkeyWords = (val,offset) => getData(`/api//search?keywords=${val}&limit=10&offset=${offset}`)
export const playlist = (id) => getData(`/api/playlist/detail?id=${id}`)

