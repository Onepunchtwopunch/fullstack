import React from "react";
import { Carousel } from "react-responsive-carousel";

import classes from "./heroSlider.module.css";
import "react-responsive-carousel/lib/styles/carousel.css";

export default function HeroSlider({ slider }) {
  return (
    <Carousel
      className={classes.sliderWrapper}
      showArrows={true}
      showThumbs={false}
      infiniteLoop={true}
      showStatus={false}
      autoPlay={true}
      interval={4000}
    >
      {slider.map((image) => (
        <div className={classes.heroImg}>
          <img src={image.src} alt={image.title} />
        </div>
      ))}
    </Carousel>
  );
}
