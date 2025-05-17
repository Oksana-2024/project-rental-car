import { useEffect } from "react";
import { useSelector } from "react-redux";

import { selectCars, selectIsLoading } from "../../redux/cars/selectors";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getCars } from "../../redux/cars/operations";
import CarItem from "../CarItem/CarItem";
import Loader from "../Loader/Loader";
import s from "./CarList.module.css";

const CarList = () => {
  const carItems = useSelector(selectCars);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCars(true));
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <ul className={s.carList}>
      {carItems.map((car) => (
        <li key={car.id} className={s.listItem}>
          <CarItem {...car} />
        </li>
      ))}
    </ul>
  );
};

export default CarList;
