import React, { useContext, useEffect, useState } from "react";
import HeroSlider from "../../components/HeroSlider/";
import ProductsList from "../../components/ProductsList";
import ProductsPagination from "../../components/ProductsPagination";
import { storeContext } from "../../contexts/StoreContext";
import MainLayout from "../../Layouts/MainLayout";
import classes from "./mainPage.module.css";

import HeroImg from "../../assets/images/hero.jpeg";
import HeroImg3 from "../../assets/images/hero3.jpeg";
import Ballet from "../../assets/images/ballet.jpg";
import Tennis from "../../assets/images/tennis.jpg";
import Football from "../../assets/images/football.jpg";
import Basketball from "../../assets/images/basketball.jpg";
import Forum1 from "../../assets/images/forum1.png";
import Forum from "../../assets/images/forum.jpg";
import Comments from "../../components/Comments";

export default function MainPage() {
  const { products, fetchProducts, total } = useContext(storeContext);
  const [page, setPage] = useState(1);
  console.log(products);

  useEffect(() => {
    fetchProducts(page - 1);
  }, [page]);

  const heroSlider = [
    { src: HeroImg, title: "hero" },
    { src: HeroImg3, title: "hero3" },
    { src: Ballet, title: "ballet" },
    { src: Tennis, title: "tennis" },
    { src: Football, title: "football" },
    { src: Basketball, title: "basketball" },
    { src: Forum1, title: "forum1" },
    { src: Forum, title: "forum" },
  ];

  return (
    <MainLayout>
      <HeroSlider slider={heroSlider} />
      <ProductsList products={products} />
      <ProductsPagination
        setPage={setPage}
        page={page}
        count={Math.ceil(total / 4)}
      />

      <Comments />
    </MainLayout>
  );
}
