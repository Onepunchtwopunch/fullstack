import { KeyboardReturnOutlined } from "@material-ui/icons";
import axios from "axios";
import React, { useReducer } from "react";

const INIT_STATE = {
  login: [],
  registration: [],
};

const reducer = (state = INIT_STATE, action) => {
  console.log(state);
  switch (action.type) {
    default:
      return state;
  }
};

export const authContext = React.createContext();
const { REACT_APP_API_URL: URL } = process.env;

export default function AuthContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const setLogin = async ({ email, password }) => {
    await axios.post(`${URL}/accounts/login/`, {
      email,
      password,
    })
      .then((res) => {
        console.log(res);
        if (res.data.access) {
          localStorage.setItem("user", JSON.stringify(res.data));
          localStorage.setItem("access_token", res.data.access);
          localStorage.setItem("refresh_token", res.data.refresh);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const setRegistration = async ({ email, password, password2 }) => {
    await axios.post(`${URL}/accounts/register/`, {
      email,
      password,
      password2,
    })
      .then((res) => {
        console.log(res);
        if (res.data.access) {
          localStorage.setItem("user", JSON.stringify(res.data));
          localStorage.setItem("access_token", res.data.access);
          localStorage.setItem("refresh_token", res.data.refresh);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const logOut = async () => {
    await axios.post(`${URL}/accounts/logout/`);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  // const addInterceptor = () => {
  //   axios.interceptors.request.use(
  //     (config) => {
  //       const user = JSON.parse(localStorage.getItem("user"));
  //       const token = JSON.parse(localStorage.getItem("access_token"));
  //       if (user && token) {
  //         config.headers.authorization = "Bearer " + token;
  //       }
  //       return config;
  //     },
  //     (error) => {
  //       Promise.reject(error);
  //     }
  //   );
  // };

  return (
    <authContext.Provider
      value={{
        login: state.login,
        registration: state.registration,
        setLogin,
        setRegistration,
        logOut,
        getCurrentUser,
        // addInterceptor,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
}
