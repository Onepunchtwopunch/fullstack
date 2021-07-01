import React from "react";
import MainLayout from "../../Layouts/MainLayout";
import classes from "./forum.module.css";

export default function Forum() {
  return (
    <MainLayout>
      <div className={classes.container}>
        <h3>Форумы</h3>
        <div className={classes.items}>
          <iframe
            className={classes.item}
            width="560"
            height="315"
            src="https://www.youtube.com/embed/F2l_unHdpxk?start=950"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>

          <iframe
            className={classes.item}
            width="560"
            height="315"
            src="https://www.youtube.com/embed/YX2MuiD32xA?start=950"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>

          <iframe
            className={classes.item}
            width="560"
            height="315"
            src="https://www.youtube.com/embed/KOqo9Sx9Q1c?start=950"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>

          <iframe
            className={classes.item}
            width="560"
            height="315"
            src="https://www.youtube.com/embed/IpqfhurNeU4?start=950"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>

          <iframe
            className={classes.item}
            width="560"
            height="315"
            src="https://www.youtube.com/embed/lT56uV1iTCs?start=950"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>

          <iframe
            className={classes.item}
            width="560"
            height="315"
            src="https://www.youtube.com/embed/C1RxMC-kgtk?start=950"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </MainLayout>
  );
}
