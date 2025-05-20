import { useEffect, useState } from "react";
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
import { ClipLoader } from "react-spinners";

const CarsPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);
  const [isLoading, setIsLoading] = useState(false);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const handleClick = () => {
    setIsLoading(true);
    dispatch(loadMoreCars())
      .unwrap()
      .finally(() => setIsLoading(false));
  };

  return (
    <section className={s.carsPage}>
      <Container>
        <SearchBar />

        <CarList />
        {totalPages > page &&
          (!isLoading ? (
            <Button
              onClick={handleClick}
              text="Load more"
              type="button"
              className={s.loadMoreBtn}
            />
          ) : (
            <div className={s.smallLoader}>
              <ClipLoader
                size={80}
                color="var(--accent-color)"
              />
            </div>
          ))}
      </Container>
    </section>
  );
};

export default CarsPage;
