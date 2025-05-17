import { useSelector } from "react-redux";
import CarItem from "../CarItem/CarItem";
import { selectCars, selectIsLoading } from "../../redux/cars/selectors";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useEffect } from "react";
import { getCars } from "../../redux/cars/operations";
import s from "./CarList.module.css";
import Loader from "../Loader/Loader";

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
