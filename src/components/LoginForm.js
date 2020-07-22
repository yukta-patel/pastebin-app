import React from "react";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.css";
import "../style/login.css";
import { LoginUser } from "../redux/actions/_action";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required().min(4).max(10),
});

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(FormSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    dispatch(LoginUser(data.username, data.password, history), notify());
  };

  const notify = () =>
    toast.success("Login Success", {
      position: "top-center",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  return (
    <Container className="loginDiv">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Username</Label>
          <Controller
            as={Input}
            control={control}
            name="username"
            type="text"
            placeholder="Enter username"
            defaultValue=""
            className={errors && errors.username ? "is-invalid" : ""}
          />
          {errors.username && (
            <span className="errorMsg">{errors.username.message}</span>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <Controller
            as={Input}
            control={control}
            name="password"
            type="password"
            placeholder="Enter password"
            defaultValue=""
            className={errors && errors.password ? "is-invalid" : ""}
          />
          {errors.password && (
            <span className="errorMsg">{errors.password.message}</span>
          )}
        </FormGroup>

        <Button className="button" color="primary">
          Submit
        </Button>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default Login;
