import React from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import classes from "./login.module.css";
import * as Yup from "yup";
import MainLayout from "../../Layouts/MainLayout";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { notifySuccess } from "../../helpers/notifiers";
import { Button, TextField } from "@material-ui/core";
import TextError from "../../components/TextError";
import { authContext } from "../../contexts/AuthContext";

export default function SignUp() {
  const { setRegistration } = useContext(authContext);

  const history = useHistory();

  const initialValues = {
    email: "",
    password: "",
    password2: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Обязательное поле!"),
    password: Yup.string().required("Обязательное поле!"),
    password2: Yup.string()
      .required("Обязательное поле!")
      .oneOf([Yup.ref("password")], "Пароли не совпадают!"),
  });

  const onSubmit = (values, actions) => {
    setRegistration({
      ...values,
    });
    console.log(values);
    actions.resetForm();
    notifySuccess(
      "Вы успешно зарегестрировались, теперь можете войти в аккаунт!"
    );
    history.push(`/login`);
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
                required
                type="email"
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

              <label>Подтверждение пароля</label>
              <Field
                className={classes.input}
                name="password2"
                variant="outlined"
                as={TextField}
                type="password"
                required
              />
              <ErrorMessage component={TextError} name="password2" />

              <Button type="submit" color="primary" variant="contained">
                Зарегестрироваться
              </Button>
              <p className={classes.log}>
                Do you have an account?{" "}
                <p
                  onClick={() => history.push(`/login`)}
                  className={classes.reg}
                >
                  Sign In
                </p>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </MainLayout>
  );
}
