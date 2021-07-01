import React, { useEffect, useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { fetchSearchProducts } from "./api";
import { Paper, Typography } from "@material-ui/core";
import Truncate from "react-truncate";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "20%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  searchList: {
    width: "100%",
    height: 300,
    overflowY: "scroll",
    overflowX: "hidden",
    position: "absolute",
    top: 60,
    padding: 20,
  },
  searchItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 15,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#EBEEF0",
    },
  },
}));

export default function SearchBar() {
  const classes = useStyles();

  const [searchValue, setSearchValue] = useState("");
  const [fetchedProducts, setFetchedProducts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    fetchSearchProducts(searchValue).then((products) =>
      setFetchedProducts(products)
    );
  }, [searchValue]);

  const history = useHistory();

  const handleSearchItemClick = (id) => {
    history.push(`/products/${id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFetchedProducts([]);
    setSearchValue("");
    if (searchValue) {
      history.push(`/products/search/${searchValue}`);
    }
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <form onSubmit={handleSearchSubmit}>
        <InputBase
          onChange={handleSearchChange}
          value={searchValue}
          placeholder="Поиск…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </form>

      {fetchedProducts.length ? (
        <Paper className={classes.searchList}>
          {fetchedProducts.map((product) => (
            <Typography
              onClick={() => handleSearchItemClick(product.id)}
              key={product.id}
              className={classes.searchItem}
            >
              {product.title}
            </Typography>
          ))}
        </Paper>
      ) : null}
    </div>
  );
}
