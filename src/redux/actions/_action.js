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
        console.log(res.data.jwt);
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

export const AddPaste = (newpaste, expiration, exposure, title, setModal) => {
  let token = localStorage.getItem("token");
  console.log(token);
  return (dispatch) => {
    dispatch({ type: "ADDPASTE_PENDING" });
    axios
      .post(
        "https://pastebindemo.herokuapp.com/pastes",
        {
          content: newpaste,
          Expiration: expiration,
          Exposure: exposure,
          title: title,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        dispatch({
          type: "ADDPASTE_SUCCESS",
        });
        dispatch(FetchPastes());
        toast.success("Paste added successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setModal(false);
      })

      .catch((error) => {
        setModal(true);
        console.log(error.response.data.message);
        toast.error(error.response.data.message, {
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

export const FetchPastes = () => {
  let token = localStorage.getItem("token");
  console.log(token);
  return (dispatch) => {
    dispatch({ type: "FETCHPASTES_PENDING" });
    axios
      .get("https://pastebindemo.herokuapp.com/pastes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch({ type: "FETCHPASTES_SUCCESS", pastes: res.data });
      });
  };
};
