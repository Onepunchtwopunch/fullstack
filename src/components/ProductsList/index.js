import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ProductItem from "../ProductItem";
import { useContext } from "react";
import { storeContext } from "../../contexts/StoreContext";
import { useEffect } from "react";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export default function ProductsList({ products }) {
  const { fetchProducts } = useContext(storeContext);
  const classes = useStyles();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {products.results && products.results.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <ProductItem data={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
