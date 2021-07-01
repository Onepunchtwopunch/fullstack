import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Truncate from "react-truncate";
import { useHistory } from "react-router";
import { storeContext } from "../../contexts/StoreContext";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { IconButton } from "@material-ui/core";
import StarsIcon from "@material-ui/icons/Stars";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
    objectFit: "contain",
  },
  description: {
    height: 100,
    marginTop: 20,
  },
});

export default function ProductItem({ data }) {
  const classes = useStyles();

  const { title, image, price, description, id, date, likes } = data;
  // console.log(data);

  const { addProductToCart, addProductToFavorites, URL } =
    useContext(storeContext);

  const history = useHistory();

  const requestLike = async (id) => {
    const response = await axios.post(`${URL}/products/${id}/like/`);
    console.log(response);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          onClick={() => history.push(`/products/${id}`)}
          className={classes.media}
          image={image}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <Truncate lines={1} ellipsis={"..."}>
              {title}
            </Truncate>
          </Typography>

          <Typography variant="h5">{price} ₽</Typography>

          <Typography
            className={classes.description}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            <Truncate lines={3} ellipsis={"..."}>
              {description}
            </Truncate>
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            <Truncate lines={1} ellipsis={"..."}>
              {date}
            </Truncate>
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            <Truncate lines={1} ellipsis={"..."}>
              {likes}
              <IconButton>
                <FavoriteBorderIcon onClick={() => requestLike(id)} />
              </IconButton>
            </Truncate>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.button}>
        <IconButton onClick={() => addProductToCart(data)} size="large">
          <AddShoppingCartIcon />
        </IconButton>
        <IconButton onClick={() => addProductToFavorites(data)} size="large">
          <StarsIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
