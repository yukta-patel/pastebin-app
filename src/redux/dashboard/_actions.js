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
        dispatch({
          type: "ADDPASTE_FAILURE",
          message: error.message,
        });
        setModal(true);
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

export const DeletePaste = (id) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch({ type: "DELETEPASTE_PENDING" });
    axios
      .delete(`https://pastebindemo.herokuapp.com/pastes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({ type: "DELETEPASTE_SUCCESS" });
        dispatch(FetchPastes());
        toast.success("Paste deleted successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((error) => {
        dispatch({
          type: "DELETEPASTE_FAILURE",
          message: error.message,
        });
      });
  };
};

export const FetchSinglePaste = (id) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch({ type: "FETCHSINGLEPASTES_PENDING" });
    axios
      .get(`https://pastebindemo.herokuapp.com/pastes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch({ type: "FETCHSINGLEPASTES_SUCCESS", pastes: res.data });
      })
      .catch((error) => {
        dispatch({
          type: "FETCHSINGLEPASTES_FAILURE",
          message: error.message,
        });
      });
  };
};

export const UpdatePaste = (
  newpaste,
  expiration,
  exposure,
  title,
  seteditModal,
  id
) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch({ type: "UPDATEPASTE_PENDING" });
    axios
      .put(
        `https://pastebindemo.herokuapp.com/pastes/${id}`,
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
          type: "UPDATEPASTE_SUCCESS",
        });
        dispatch(FetchPastes());
        toast.success("Paste updated successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        seteditModal(false);
      })

      .catch((error) => {
        dispatch({
          type: "UPDATEPASTE_FAILURE",
          message: error.message,
        });
        seteditModal(true);
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
