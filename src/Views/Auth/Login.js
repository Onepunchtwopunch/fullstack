import React from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { storeContext } from "../../contexts/StoreContext";
import classes from "./login.module.css";
import * as Yup from "yup";
import MainLayout from "../../Layouts/MainLayout";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { notifySuccess } from "../../helpers/notifiers";
import { Button, TextField } from "@material-ui/core";
import TextError from "../../components/TextError";
import { useState } from "react";
import { authContext } from "../../contexts/AuthContext";

export default function Login() {
  const { login, setLogin } = useContext(authContext);

  const [token, setToken] = useState();
  const history = useHistory();

  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Обязательное поле!"),
    password: Yup.string().required("Обязательное поле!"),
  });

  const onSubmit = (values, actions) => {
    setLogin({
      ...values,
    });
    console.log(values);
    actions.resetForm();
    notifySuccess("Вы успешно вошли в аккаунт!");
    history.push(`/`);
    // setTimeout(700);
  };

  return (
    <MainLayout>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values }) => (
            <Form className={classes.form}>
              <label>Email</label>
              <Field
                className={classes.input}
                name="email"
                variant="outlined"
                as={TextField}
                type="email"
                required
              />
              <ErrorMessage component={TextError} name="email" />

              <label>Пароль</label>
              <Field
                className={classes.input}
                name="password"
                variant="outlined"
                as={TextField}
                type="password"
                required
              />
              <ErrorMessage component={TextError} name="password" />

              <Button type="submit" color="primary" variant="contained">
                Войти
              </Button>
              <p className={classes.log} style={{ display: "flex" }}>
                Not authorized?{" "}
                <p
                  onClick={() => history.push(`/registration`)}
                  className={classes.reg}
                >
                  Sign Up
                </p>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </MainLayout>
  );
}
