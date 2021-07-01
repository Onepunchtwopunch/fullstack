import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
import { useHistory } from "react-router";
import { Link, NavLink } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { storeContext } from "../contexts/StoreContext";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import StarIcon from "@material-ui/icons/Star";
import { authContext } from "../contexts/AuthContext";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import axios from "axios";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    minHeight: "100vh",
    position: "relative",
  },
  addBtn: {
    position: "fixed",
    top: "40%",
    right: 15,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  navContent: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  brandLogo: {
    width: 56,
    objectFit: "contain",
  },
  toolbar: {
    backgroundColor: "black",
  },
  footer: {
    width: 250,
    margin: "0 auto",
    marginTop: 80,
  },
  footer__icon: {
    width: 50,
    height: 50,
    margin: "20px 16px",
    color: "whitesmoke",
  },
  footer_h3: {
    textAlign: "center",
    color: "whitesmoke",
    fontSize: 20.6,
  },
}));

export default function MainLayout(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { brands, fetchBrands } = useContext(storeContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const { getCurrentUser, logOut, addInterceptor } = useContext(authContext);
  const history = useHistory();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const opene = Boolean(anchorEl);
  const user = getCurrentUser();
  // const open = this.state.anchorEl === null ? false : true;

  // useEffect(() => {
  //   console.log(currentUser);

  //   if (user) {
  //     setCurrentUser(user);
  //   }
  // }, []);

  // useEffect(() => {
  //   const accessToken = JSON.parse(localStorage.getItem("access_token"));
  //   if (user && accessToken) {
  //     addInterceptor();
  //   }
  // }, []);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = () => {
    logOut();
    history.push(`/login`);
  };

  // useEffect(() => {
  //   fetchBrands();
  // }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  console.log(currentUser);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.navContent}>
            <NavLink
              className={classes.logo}
              style={{ textDecoration: "none", color: "#fff" }}
              to="/"
            >
              <Typography variant="h6" noWrap>
                Tickets
              </Typography>
            </NavLink>

            <SearchBar />
          </div>
          <Link to="/cart" style={{ textDecoration: "none", color: "white" }}>
            <IconButton color="inherit">
              <ShoppingBasketIcon />
            </IconButton>
          </Link>
          <Link
            to="/favorites"
            style={{ textDecoration: "none", color: "white" }}
          >
            <IconButton color="inherit">
              <StarIcon />
            </IconButton>
          </Link>


          {/* авторизация */}
          {/* <Link to="/login"> */}
          <IconButton>

            {currentUser ? (

              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleMenu}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={opene}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={logoutUser}>LogOut</MenuItem>
                </Menu>
              </div>

            ) : (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={opene}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => history.push(`/login`)}>
                    Login
                  </MenuItem>
                  <MenuItem onClick={logoutUser}>LogOut</MenuItem>

                </Menu>
              </div>
            )}
            <AccountCircleIcon style={{ color: "white", display: "flex" }} />
          </IconButton>
          {/* </Link> */}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <Typography variant="h5">Фильтрация билетов</Typography>
        <List>
          {brands.map((brand) => (
            <Link to={`/brand/${brand.id}`} style={{ textDecoration: "none" }}>
              <ListItem button key={brand.id}>
                <ListItemText
                  style={{
                    color: "black",
                    outline: "none",
                  }}
                  primary={brand.title}
                />
                <ListItemIcon>
                  <img
                    className={classes.brandLogo}
                    src={brand.logo}
                    alt={`${brand.title} logo`}
                  />
                </ListItemIcon>
              </ListItem>
            </Link>
          ))}
          <Divider
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
            style={{
              marginTop: 15,
            }}
          />
          <Typography
            style={{
              color: "black",
              marginLeft: 15,
              marginTop: 15,
              cursor: "pointer",
            }}
            variant="h5"
            onClick={() => history.push(`/concerts`)}
          >
            Концерт
          </Typography>
          <Divider
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
            style={{
              marginTop: 10,
            }}
          />
          <Typography
            style={{
              color: "black",
              marginLeft: 15,
              marginTop: 15,
              cursor: "pointer",
            }}
            variant="h5"
            onClick={() => history.push(`/sports`)}
          >
            Спорт
          </Typography>
          <Divider
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
            style={{
              marginTop: 10,
            }}
          />
          <Typography
            style={{
              color: "black",
              marginLeft: 15,
              marginTop: 15,
              cursor: "pointer",
            }}
            variant="h5"
            onClick={() => history.push(`/ballets`)}
          >
            Балет
          </Typography>
          <Divider
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
            style={{
              marginTop: 10,
            }}
          />
          <Typography
            style={{
              color: "black",
              marginLeft: 15,
              marginTop: 15,
              cursor: "pointer",
            }}
            variant="h5"
            onClick={() => history.push(`/forum`)}
          >
            Форум
          </Typography>
          <Divider
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
            style={{
              marginTop: 10,
            }}
          />
          <Typography
            style={{
              color: "black",
              marginLeft: 15,
              marginTop: 15,
              cursor: "pointer",
            }}
            variant="h5"
            onClick={() => history.push(`/tictactoe`)}
          >
            Крестики Нолики
          </Typography>
          <Divider
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
            style={{
              marginTop: 10,
            }}
          />
          <Typography
            style={{
              color: "black",
              marginLeft: 15,
              marginTop: 15,
              cursor: "pointer",
            }}
            variant="h5"
            onClick={() => history.push(`/reactionGame`)}
          >
            Игра на реакцию
          </Typography>
          <Divider
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
            style={{
              marginTop: 10,
            }}
          />
          <Typography
            style={{
              color: "black",
              marginLeft: 15,
              marginTop: 15,
              cursor: "pointer",
            }}
            variant="h5"
            onClick={() => history.push(`/snakeGame`)}
          >
            Змейка
          </Typography>
          <Divider
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
            style={{
              marginTop: 10,
            }}
          />
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div style={{ height: 64 }}></div>
        {props.children}
        <Fab
          onClick={() => history.push("/products/create")}
          className={classes.addBtn}
          aria-label="add"
        >
          <AddIcon />
        </Fab>
        <div className={classes.footer}>
          <div>
            <a href="https://www.instagram.com/e1dosov/" target="_blank">
              <InstagramIcon className={classes.footer__icon} />
            </a>
            <a href="#">
              <FacebookIcon className={classes.footer__icon} />
            </a>
            <a
              href="https://github.com/Argo-mafioznik/react-team-works"
              target="_blank"
            >
              <GitHubIcon className={classes.footer__icon} />
            </a>
          </div>
          <h3 className={classes.footer_h3}> Copyright &copy; 2021 Tickets</h3>
        </div>
      </main>
    </div >
  );
}
