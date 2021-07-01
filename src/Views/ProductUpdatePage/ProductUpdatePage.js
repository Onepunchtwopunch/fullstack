import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../../Layouts/MainLayout";
import * as Yup from "yup";
import { Button, TextField, Typography } from "@material-ui/core";
import classes from "./productUpdate.module.css";
import TextError from "../../components/TextError";
import { storeContext } from "../../contexts/StoreContext";
import { notifySuccess } from "../../helpers/notifiers";
import { useHistory, useParams } from "react-router";
import ImageDropzone from "./ImageDropzone";
import axios from "axios";

export default function ProductUpdatePage() {
  const [initialValues, setInitialValues] = useState({
    title: "",
    price: "",
    description: "",
    images: [],
  });

  const { id } = useParams();

  const { fetchProductDetail, productDetail, updateProduct } =
    useContext(storeContext);

  useEffect(() => {
    fetchProductDetail(id);
  }, []);

  useEffect(() => {
    if (productDetail) {
      setInitialValues({
        ...productDetail,
        images: productDetail.images[0],
      });
    }
  }, [productDetail]);

  const history = useHistory();

  const validationSchema = Yup.object({
    title: Yup.string().required("Обязательное поле!"),
    price: Yup.number()
      .typeError("Введите число!")
      .required("Обязательное поле!"),
    description: Yup.string().required("Обязательное поле!"),
    // images: Yup.string().required("Обязательное поле!"),
  });

  const onSubmit = (values) => {
    updateProduct(id, {
      ...values,
      images: [values.images],
    }).then(() => {
      notifySuccess("Продукт был успешно изменен!");
      history.push(`/products/${id}`);
    });

    axios.post(URL, values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <MainLayout>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue }) => (
            <Form className={classes.form}>
              <Typography variant="h4">Изменение продукта</Typography>
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

              <Button type="submit" color="primary" variant="contained">
                Изменить
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </MainLayout>
  );
}
