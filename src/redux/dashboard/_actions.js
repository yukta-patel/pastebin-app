import axios from "axios";
import { toast } from "react-toastify";

export const AddPaste = (newpaste, expiration, exposure, title, setModal) => {
  let token = localStorage.getItem("token");
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
        dispatch({
          type: "ADDPASTE_FAILURE",
          message: error.message,
        });
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
  return (dispatch) => {
    dispatch({ type: "FETCHPASTES_PENDING" });
    axios
      .get("https://pastebindemo.herokuapp.com/pastes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch({ type: "FETCHPASTES_SUCCESS", pastes: res.data });
      })
      .catch((error) => {
        dispatch({
          type: "FETCHPASTES_FAILURE",
          message: error.message,
        });
      });
  };
};
