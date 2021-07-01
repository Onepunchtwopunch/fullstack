import React from "react";
import classes from "./form.module.css";
import { Link, useHistory } from "react-router-dom";
import { notifySuccess } from "../../helpers/notifiers";

const FormOrder = () => {
  const history = useHistory();

  const onSubmit = () => {
    notifySuccess("Оплата прошла успешно!");
    history.push(`/`);
  };

  return (
    <>
      <div className={classes.container}>
        <div>
          <h2 className={classes.h2}>Форма заказа</h2>

          <form onSubmit={onSubmit}>
            <div>
              <input
                placeholder="Введите имя"
                className={classes.inp}
                type="text"
                required
              />
            </div>
            <div>
              <input
                className={classes.inp}
                placeholder="Введите ваш email"
                type="email"
                required
              />
            </div>
            <div>
              <input
                placeholder="Введите номер телефона"
                className={classes.inp}
                type="phone"
                required
              />
            </div>
            <div>
              <input
                placeholder="Введите ваш адрес"
                className={classes.inp}
                type="adress"
                required
              />
            </div>
            <div>
              <input
                className={classes.inp}
                placeholder="Номер карты"
                type="number"
                required
              />
            </div>
            <div>
              <input
                placeholder="Введите CVC"
                className={classes.inp}
                type="number"
                required
              />
            </div>
            <button className={classes.btn} type="submit">
              Оплатить
            </button>
          </form>
        </div>
        <div className="w-100 text-center mt-2"></div>
      </div>
    </>
  );
};

export default FormOrder;
