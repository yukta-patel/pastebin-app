import axios from "axios";

export const LoginUser = (identifier, password, history) => {
  return (dispach) => {
    dispach({ type: "LOGIN_PENDING" });

    axios
      .post("https://pastebindemo.herokuapp.com/auth/local", {
        identifier: identifier,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        dispach({
          type: "LOGIN_SUCCESS",
          identifier: res.data.identifier,
          password: res.data.password,
        });

        history.push("/dashboard");
      });
  };
};
