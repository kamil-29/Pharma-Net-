import axios from "axios";
import { appApiUrl } from "../environment/config";
import { clearUser } from "../redux/slice/userSlice";
import Swal from "sweetalert2";
import store from "../redux/store";
const service = axios.create({
  baseURL: appApiUrl,
});
// console.log(store.getState().auth);
service.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] =
      "bearer " + store.getState().auth?.token?.access?.token;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      // alert("Session Expired")
      // window.location.href = "/auth/login";
      // swal("Session Expired", `${error.message}`, "error").then(() => {
      //     window.location.href = "/login";
      // });
      window.sessionStorage.clear();
      store.dispatch(clearUser());
      new Swal("Session Expired", `${error.message}`, "error")
      // then(() => {
      //   window.location.href = "/auth";
      // });
    } else if (error.response.status === 500) {
      // alert("Internal Server Error")
      // swal("Internal Server Error", `${error.message}`, "error").then(() => {
      //     window.location.href = "/login";
      // });
      return Promise.reject(error);
    }
  }
);

export const getUserRedux = () => {
  // const tokenState = store.getState();
  const tokenState = "";
  return tokenState;
};

//Global api use...
export const getApiData = async (url) => {
  try {
    const res = await service.get(url);
    return res;
  } catch (error) {
    return error.message;
  }
};
export const postApiData = async (url, data) => {
  try {
    const res = await service.post(url, data);
    return res;
  } catch (error) {
    return error;
  }
};
export const patchApiData = async (url, data) => {
  try {
    const res = await service.patch(url, data);
    return res;
  } catch (error) {
    return error.message;
  }
};
export const deleteApiData = async (url, data) => {
  try {
    const res = await service.delete(url, data);
    return res;
  } catch (error) {
    return error.message;
  }
};

export const getUserRights = async () => {
  const rightsByid = await getApiData(
    `user/member/${store.getState().auth.user.id}`
  );
  const tbm = rightsByid.data?.moduleRights;
  store.dispatch(setUserRights(tbm));
  return tbm;
};
