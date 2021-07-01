import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Favorites from "./components/Favorites/Favorites";
import Ballets from "./Views/Ballet/Ballet";
import BrandPage from "./Views/BrandPage/BrandPage";
import Concerts from "./Views/Concerts/Concerts";
import FormOrder from "./Views/Form/FormOrder";
import Forum from "./Views/Forum/Forum";
import MainPage from "./Views/MainPage/MainPage";
import ProductCreatePage from "./Views/ProductCreatePage/ProductCreatePage";
import ProductDetailPage from "./Views/ProductDetailPage/ProductDetailPage";
import ProductUpdatePage from "./Views/ProductUpdatePage/ProductUpdatePage";
import SearchResultPage from "./Views/SearchResultPage/SearchResultPage";
import Sports from "./Views/Sports/Sports";
import reactionGame from "./Views/reactionGame/state/Game";
import TicTacToe from "./Views/TicTacToe/components/Game";
import SnakeGame from "./Views/SimpleSnake/SnakeGame";
import Login from "./Views/Auth/Login";
import SignUp from "./Views/Auth/Registration";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/products/create" component={ProductCreatePage} exact />
        <Route
          path="/products/search/:searchValue"
          component={SearchResultPage}
          exact
        />
        <Route path="/products/:id" component={ProductDetailPage} exact />
        <Route
          path="/products/:id/update/"
          component={ProductUpdatePage}
          exact
        />
        <Route path="/brand/:id" component={BrandPage} exact />
        <Route path="/cart" component={Cart} exact />
        <Route path="/favorites" component={Favorites} exact />
        <Route path="/concerts" component={Concerts} exact />
        <Route path="/sports" component={Sports} exact />
        <Route path="/ballets" component={Ballets} exact />
        <Route path="/forum" component={Forum} exact />
        <Route path="/form" component={FormOrder} exact />
        <Route path="/tictactoe" component={TicTacToe} exact />
        <Route path="/reactionGame" component={reactionGame} exact />
        <Route path="/snakeGame" component={SnakeGame} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/registration" component={SignUp} exact />
      </Switch>
    </Router>
  );
}
