import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography } from "@material-ui/core";
import { calcTotalPrice } from "../../helpers/calcPrice";
import { storeContext } from "../../contexts/StoreContext";
import { Link } from "react-router-dom";
import classes from "./cart.module.css";
import MainLayout from "../../Layouts/MainLayout";

export default function Cart() {
  const { cart, getCart, changeProductCount } = useContext(storeContext);

  useEffect(() => {
    getCart();
  }, []);

  return (
    <MainLayout>
      <Link to="/">
        <button className={classes.home}>Home</button>
      </Link>
      <TableContainer className={classes.paper}>
        <Table className={classes.table} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}>Image:</TableCell>
              <TableCell className={classes.tableCell} align="right">
                Title:
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                Price:
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                Count:
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                SubPrice:
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.products ? (
              <>
                {cart.products.map((elem) => (
                  <TableRow key={elem.item.id}>
                    <TableCell>
                      <img
                        className={classes.cartImages}
                        style={{ width: "200px" }}
                        src={elem.item.images}
                        alt=""
                      />{" "}
                    </TableCell>
                    <TableCell align="right">{elem.item.title}</TableCell>
                    <TableCell align="right">{elem.item.price}</TableCell>
                    <TableCell align="right">
                      <input
                        className={classes.count}
                        type="number"
                        value={elem.count}
                        onChange={(e) =>
                          changeProductCount(e.target.value, elem.item.id)
                        }
                      />
                    </TableCell>
                    <TableCell align="right">{elem.subPrice}</TableCell>
                  </TableRow>
                ))}
              </>
            ) : null}

            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>
                <Typography className={classes.total} variant="h5">
                  Total:{" "}
                </Typography>{" "}
              </TableCell>{" "}
              {cart.products ? (
                <TableCell align="right">
                  <Typography variant="h5">
                    {calcTotalPrice(cart.products)}{" "}
                  </Typography>{" "}
                </TableCell>
              ) : null}
            </TableRow>
          </TableBody>
          <Link className={classes.button} to="/form">
            <button className={classes.button}>купить</button>
          </Link>
        </Table>
      </TableContainer>
    </MainLayout>
  );
}
