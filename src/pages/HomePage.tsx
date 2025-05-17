import { Link } from "react-router-dom";

import Container from "../components/Container/Container";
import s from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={s.home}>
      <Container className={s.homeContainer}>
        <h1 className={s.title}>Find your perfect rental car</h1>
        <p className={s.descr}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Link to="/catalog" className={s.homeLink}>
          View Catalog
        </Link>
      </Container>
    </div>
  );
};

export default HomePage;
