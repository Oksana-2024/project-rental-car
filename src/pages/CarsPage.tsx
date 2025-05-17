import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { getBrands } from "../redux/brands/operations";
import { selectPage, selectTotalPages } from "../redux/cars/selectors";
import { loadMoreCars } from "../redux/cars/operations";

import Button from "../components/Button/Button";
import CarList from "../components/CarList/CarList";
import Container from "../components/Container/Container";
import SearchBar from "../components/SearchBar/SearchBar";
import s from "./CarsPage.module.css";

const CarsPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);

  return (
    <section className={s.carsPage}>
      <Container>
        <SearchBar />

        <CarList />
        {totalPages > page && (
          <Button
            onClick={() => dispatch(loadMoreCars())}
            text="Load more"
            type="button"
            className={s.loadMoreBtn}
          />
        )}
      </Container>
    </section>
  );
};

export default CarsPage;
