import { makeStyles, Typography } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import ProductsList from "../../components/ProductsList";
import { storeContext } from "../../contexts/StoreContext";
import MainLayout from "../../Layouts/MainLayout";

const useStyles = makeStyles(() => ({
  title: {
    marginBottom: 40,
    textAlign: "center",
  },
}));

export default function SearchResultPage() {
  const classes = useStyles();
  const { searchValue } = useParams();
  const { fetchSearchProducts, products } = useContext(storeContext);

  useEffect(() => {
    fetchSearchProducts(searchValue);
  }, [searchValue]);

  return (
    <MainLayout>
      <Typography
        className={classes.title}
        variant="h4"
        style={{ color: "whitesmoke" }}
      >
        Результаты поиска по "{searchValue}"
      </Typography>
      <ProductsList products={products} />
    </MainLayout>
  );
}
