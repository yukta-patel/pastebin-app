import axios from "axios";
import { toast } from "react-toastify";

export const LoginUser = (identifier, password, history) => {
  return (dispatch) => {
    dispatch({ type: "LOGIN_PENDING" });

    axios
      .post("https://pastebindemo.herokuapp.com/auth/local", {
        identifier: identifier,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.jwt);
        localStorage.setItem("user_name", res.data.user.username);
        dispatch({
          type: "LOGIN_SUCCESS",
          data: res.data,
        });
        toast.success("successfully Login", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        history.push("/dashboard");
      })
      .catch((error) => {
        dispatch({
          type: "LOGIN_FAILURE",
          message: error.message,
        });
        toast.error(error.response.data.error, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };
};
