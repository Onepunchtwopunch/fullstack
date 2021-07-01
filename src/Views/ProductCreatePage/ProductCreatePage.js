import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import MainLayout from "../../Layouts/MainLayout";
import * as Yup from "yup";
import { Button, FormControl, TextField, Typography } from "@material-ui/core";
import classes from "./productCreate.module.css";
import TextError from "../../components/TextError";
import { storeContext } from "../../contexts/StoreContext";
import { notifySuccess } from "../../helpers/notifiers";
import { useHistory } from "react-router";
import ImageDropzone from "./ImageDropzone";
import axios from "axios";

export default function ProductCreatePage() {
  const { createProduct } = useContext(storeContext);

  const history = useHistory();

  const initialValues = {
    title: "",
    price: "",
    description: "",
    // date: '',
    images: [],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Обязательное поле!"),
    price: Yup.number()
      .typeError("Введите число!")
      .required("Обязательное поле!"),
    description: Yup.string().required("Обязательное поле!"),
    // images: Yup.object().required("Обязательное поле!"),
    // date: Yup.string().required("Обязательное поле!"),

  });

  const onSubmit = (values, actions) => {
    console.log(values);

    createProduct({
      ...values,
      images: [values.images],
    }).then((id) => {
      actions.resetForm();
      notifySuccess("Продукт был создан!");
      history.push(`/products/${id}`);
    });

    // axios.post(URL, values, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
  };

  return (
    <MainLayout>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className={classes.form}>
              <Typography variant="h4">Создание продукта</Typography>
              <label>Название</label>
              <Field
                className={classes.input}
                name="title"
                variant="outlined"
                as={TextField}
              />
              <ErrorMessage component={TextError} name="title" />
              <label>Цена</label>
              <Field
                className={classes.input}
                name="price"
                variant="outlined"
                as={TextField}
              />
              <ErrorMessage component={TextError} name="price" />
              <label>Описание</label>
              <Field
                variant="outlined"
                className={classes.input}
                rows={8}
                multiline
                name="description"
                as={TextField}
              />
              <ErrorMessage component={TextError} name="description" />

              <label>Изображение</label>
              <ImageDropzone
                className={classes.ImageDropzone}
                buttonText={"Загрузить картинку"}
                setFieldValue={setFieldValue}
                name="images"
                formikImages={values.images}
              />
              <ErrorMessage component={TextError} name="images" />
              {/* <label>Дата</label> */}
              {/* <input
                variant="outlined"
                className={classes.input}
                rows={1}
                onChange={(e) => setFieldValue('date', e.target.value)}
                multiline
                type="date"
                name="date"
                as={TextField}
              />
              <ErrorMessage component={TextError} name="date" /> */}
              <Button type="submit" color="primary" variant="contained">
                Создать
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </MainLayout>
  );
}
