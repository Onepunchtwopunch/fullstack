import React from "react";
import MainLayout from "../../Layouts/MainLayout";
import classes from "./ballet.module.css";

export default function Ballets() {
  return (
    <MainLayout>
      <div className={classes.container}>
        <h3>Балеты</h3>
        <div className={classes.items}>
          <iframe
            className={classes.item}
            width="560"
            height="315"
            src="https://www.youtube.com/embed/9ScVy8uVzWI?start=950"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>

          <iframe
            className={classes.item}
            width="560"
            height="315"
            src="https://www.youtube.com/embed/UfwcPVJkulc"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>

          <iframe
            className={classes.item}
            width="560"
            height="315"
            src="https://www.youtube.com/embed/VDvfZ3sKb_M?start=950"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>

          <iframe
            className={classes.item}
            width="560"
            height="315"
            src="https://www.youtube.com/embed/XbU2zsZ1gyA?start=950"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>

          <iframe
            className={classes.item}
            width="560"
            height="315"
            src="https://www.youtube.com/embed/0eeAfIswfEs?start=950"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>

          <iframe
            className={classes.item}
            width="560"
            height="315"
            src="https://www.youtube.com/embed/preUF4HBSnQ?start=950"
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
