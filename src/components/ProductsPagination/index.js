import React from "react";
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  pagination: {
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    width: "280px",
    borderRadius: 13,
    padding: 3,
    marginTop: 80,
    backgroundColor: "whitesmoke",
  },
}));

export default function ProductsPagination({ count, page, setPage }) {
  const classes = useStyles();
  return (
    <Pagination
      onChange={(_, _page) => setPage(_page)}
      count={count}
      page={page}
      className={classes.pagination}
      color="primary"
    />
  );
}
