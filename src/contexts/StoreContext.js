import axios from "axios";
import React, { useReducer } from "react";
import $api from "../api";
import { calcSubPrice, calcTotalPrice } from "../helpers/calcPrice";

const INIT_STATE = {
  products: [],
  brands: [],
  brandDetail: null,
  productDetail: null,
  total: 0,
  cart: {},
  favorites: {},
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload.data,
        total: action.payload.total,
      };
    case "SET_PRODUCT_DETAIL":
      return {
        ...state,
        productDetail: action.payload,
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case "REMOVE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    case "CLEAR_PRODUCT":
      return {
        ...state,
        productDetail: null,
      };
    case "SET_BRANDS":
      return {
        ...state,
        brands: action.payload,
      };
    case "SET_BRAND_DETAIL":
      return {
        ...state,
        brandDetail: action.payload,
      };
    case "GET_CART":
      return {
        ...state,
        cart: action.payload,
      };
    case "GET_FAVORITES":
      return {
        ...state,
        favorites: action.payload,
      };
    default:
      return state;
  }
};

export const storeContext = React.createContext();
const { REACT_APP_API_URL: URL } = process.env;

export default function StoreContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const fetchProducts = async (page = 0) => {

    try {
      const response = await axios.get(
        `${URL}/products/?_start=${page * 4}&_end=${4 * (page + 1)}`
      );
      const products = response.data;
      const total = response.headers["x-total-count"];
      console.log(products);

      dispatch({
        type: "SET_PRODUCTS",
        payload: {
          data: products,
          total,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchSearchProducts = async (value) => {
    const response = await axios.get(`${URL}/products/search/?q=${value}`);
    const products = response.data;
    const total = response.headers["x-total-count"];

    dispatch({
      type: "SET_PRODUCTS",
      payload: {
        data: products,
        total,
      },
    });
  };

  const fetchProductDetail = async (id) => {
    const response = await $api.get(`${URL}/products/${id}/`);
    const productDetail = response.data;

    console.log(productDetail);

    dispatch({
      type: "SET_PRODUCT_DETAIL",
      payload: productDetail
    })
  };

  const createProduct = async ({ title, price, description }) => {
    // axios.defaults.headers.common['Authorization'] = 'Token ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI1MTMxNjA2LCJqdGkiOiI5YjdjMDNiYzNlMzQ0NTFkOGRkZTY2YWI1NjM5NGIzZSIsInVzZXJfaWQiOjEwfQ.LaS5yxOZUNQVmD3F0R6waRCuT1AcT8qmIboN8pQnIFI";

    const { data } = await $api.post(`/products/`, {
      title,
      description,
      price,
    });

    console.log(data)

    await dispatch({
      type: "ADD_PRODUCT",
      payload: data,
    });

    return data.id;
  };

  const deleteProduct = async (id) => {
    await $api.delete(`${URL}/products/delete/${id}/`);
    dispatch({
      type: "REMOVE_PRODUCT",
      payload: id,
    });
  };

  const updateProduct = async (id, data) => {
    await $api.patch(`${URL}/products/${id}/`, data);
    dispatch({
      type: "CLEAR_PRODUCT",
    });
  };

  // const fetchBrands = async () => {
  //   const response = await axios.get(`${URL}/categories/`);
  //   const brands = response.data;

  //   dispatch({
  //     type: "SET_BRANDS",
  //     payload: brands,
  //   });
  // };

  const fetchBrandProducts = async (slug) => {
    const response = await axios.get(`${URL}/products/categories/${slug}/`);
    const products = response.data;
    const total = response.headers["x-total-count"];

    dispatch({
      type: "SET_PRODUCTS",
      payload: {
        data: products,
        total,
      },
    });
  };

  const fetchBrandDetail = async (brandId) => {
    const response = await $api.get(`${URL}/brands/${brandId}`);
    const brand = response.data;

    dispatch({
      type: "SET_BRAND_DETAIL",
      payload: brand,
    });
  };

  const getCart = async () => {
    const response = await $api.get(`${URL}/cart/`);
    console.log(response);
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    dispatch({
      type: "GET_CART",
      payload: cart,
    });
  };

  const addProductToCart = async (product) => {
    const response = await $api.post(`${URL}/cart/`);
    console.log(response);
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }

    let newProduct = {
      item: product,
      count: 1,
      subPrice: 0,
    };

    let filteredCart = cart.products.filter(
      (elem) => elem.item.id === product.id
    );
    if (filteredCart.length > 0) {
      cart.products = cart.products.filter(
        (elem) => elem.item.id !== product.id
      );
    } else {
      cart.products.push(newProduct);
    }

    newProduct.subPrice = calcSubPrice(newProduct);
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const changeProductCount = (count, id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.products = cart.products.map((elem) => {
      if (elem.item.id === id) {
        elem.count = count;
        elem.subPrice = calcSubPrice(elem);
      }
      return elem;
    });
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  };

  const getFavorites = async () => {
    const response = await $api.get(`${URL}/products/favorites/`);
    console.log(response);
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    if (!favorites) {
      favorites = {
        products: [],
      };
    }
    dispatch({
      type: "GET_FAVORITES",
      payload: favorites,
    });
  };

  const addProductToFavorites = async (product, id) => {
    const response = await $api.post(`${URL}/products/${id}/favorite/`);
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    if (!favorites) {
      favorites = {
        products: [],
      };
    }

    let newProducts = {
      items: product,
    };

    let filteredFavorites = favorites.products.filter(
      (element) => element.items.id === product.id
    );
    if (filteredFavorites.length > 0) {
      favorites.products = favorites.products.filter(
        (element) => element.items.id !== product.id
      );
    } else {
      favorites.products.push(newProducts);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <storeContext.Provider
      value={{
        products: state.products,
        total: state.total,
        productDetail: state.productDetail,
        brands: state.brands,
        brandDetail: state.brandDetail,
        cart: state.cart,
        favorites: state.favorites,
        URL: URL,
        fetchProducts,
        fetchProductDetail,
        createProduct,
        deleteProduct,
        updateProduct,
        fetchSearchProducts,
        // fetchBrands,
        fetchBrandProducts,
        fetchBrandDetail,
        getCart,
        addProductToCart,
        changeProductCount,
        getFavorites,
        addProductToFavorites,
      }}
    >
      {props.children}
    </storeContext.Provider>
  );
}
