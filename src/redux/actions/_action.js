import axios from "axios";
import { toast } from "react-toastify";

export const LoginUser = (identifier, password, history) => {
  // axios.post("/",{},{headers:{'Authorization':`Bearer ${token}`}})
  return (dispach) => {
    dispach({ type: "LOGIN_PENDING" });

    axios
      .post("https://pastebindemo.herokuapp.com/auth/local", {
        identifier: identifier,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.jwt);
        console.log(res.data.jwt);
        dispach({
          type: "LOGIN_SUCCESS",
          // identifier: res.data.identifier,
          // password: res.data.password,
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
        console.log(error.response.data.error);
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
