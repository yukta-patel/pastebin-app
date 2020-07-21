import React from "react";
// import { Link } from "@reach/router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.css";
import "../style/login.css";

const FormSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required().min(4).max(10),
});

const Login = () => {
  const { control, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(FormSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    reset({ username: "" });
    reset({ password: "" });
  };

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
    </Container>
  );
};

export default Login;
