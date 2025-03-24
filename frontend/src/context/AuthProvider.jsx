import {
  useContext,
  createContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import apiRoutes from "../utils/apiRoutes";
import { toast } from "react-toastify";

const AuthContext = createContext();

function reducer(auth, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...auth,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case "LOGOUT":
      return { ...auth, isAuthenticated: false, user: null };
    case "AUTH_LOADING":
      return { ...auth, loading: true };
    case "AUTH_ERROR":
      return { ...auth, error: action.payload, loading: false };
    default:
      return auth;
  }
}

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

function AuthProvider({ children }) {
  const [auth, dispatch] = useReducer(reducer, initialState);
  const [initialLoad, setInitialLoad] = useState(false);

  useEffect(() => {
    if (!initialLoad) {
      checkAuth();
    }
    setInitialLoad(true);
  }, [initialLoad]);

  const login = async (credential) => {
    dispatch({ type: "AUTH_LOADING" });
    try {
      const res = await axios.post(apiRoutes.loginUrl, credential, {
        withCredentials: true,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
      toast.success(res.data.message);
      setInitialLoad(false);
      return res.data;
    } catch (error) {
      dispatch({ type: "AUTH_ERROR", payload: "Invalid credentials" });
      const msg = error.response?.data?.message || error.message;
      toast.error(msg);
    }
  };

  const signup = async (credential) => {
    dispatch({ type: "AUTH_LOADING" });
    try {
      const res = await axios.post(apiRoutes.signupUrl, credential, {
        withCredentials: true,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
      toast.success(res.data.message);
      setInitialLoad(false);
    } catch (error) {
      dispatch({ type: "AUTH_ERROR", payload: "Invalid credentials" });
      const msg = error.response?.data?.message || error.message;
      toast.error(msg);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await axios.get(apiRoutes.profileUrl, {
        withCredentials: true,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
    } catch (error) {
      dispatch({ type: "LOGOUT" });
    }
  };

  const sendOtp = async () => {
    try {
      const { data } = await axios.post(
        apiRoutes.sendOtpUrl,
        {},
        { withCredentials: true }
      );
      toast.success(data.message);
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      toast.error(msg);
    }
  };

  const verifyEmailOtp = async (otp) => {
    try {
      const { data } = await axios.post(
        apiRoutes.verifyotpUrl,
        { otp },
        { withCredentials: true }
      );
      toast.success(data.message);
      return data;
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      toast.error(msg);
    }
  };

  const logout = async () => {
    const { data } = await axios.post(
      apiRoutes.logoutUrl,
      {},
      { withCredentials: true }
    );
    dispatch({ type: "LOGOUT" });
    toast.success(data.message);
  };

  return (
    <AuthContext.Provider
      value={{ auth, login, logout, signup, verifyEmailOtp, sendOtp }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;

// useEffect(() => {
//   fetchUser();
// }, []);

// async function fetchUser() {
//   try {
//     const { data } = await axios(apiRoutes.profileUrl, {
//       withCredentials: true,
//     });
//     dispatch({ type: "LOGIN", payload: { user: data.user } });
//   } catch (error) {
//     dispatch({ type: "LOGOUT" });
//   }
// }

// const login = async (credential) => {
//   try {
//     const { data } = await axios.post(apiRoutes.loginUrl, credential, {
//       withCredentials: true,
//     });
//     dispatch({ type: "LOGIN", payload: { user: data.user } });
//     toast.success(data.message);
//   } catch (error) {
//     const msg = error.response?.data?.message || error.message;
//     toast.error(msg);
//   }
// };

// const signup = async (credential) => {
//   try {
//     const { data } = await axios.post(apiRoutes.signupUrl, credential, {
//       withCredentials: true,
//     });
//     dispatch({ type: "LOGIN", payload: { user: data.user } });
//     toast.success(data.message);
//   } catch (error) {
//     const msg = error.response?.data?.message || error.message;
//     toast.error(msg);
//   }
// };

// const logout = async () => {
//   try {
//     const { data } = await axios(apiRoutes.logout, {
//       withCredentials: true,
//     });
//     dispatch({ type: "LOGOUT" });
//     toast.success(data.message);
//   } catch (error) {
//     const msg = error.response?.data?.message || error.message;
//     toast.error(msg);
//   }
