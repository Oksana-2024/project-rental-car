import Container from "../Container/Container.tsx";
import Navigation from "../Navigation/Navigation.tsx";
import logo from "../../assets/img/Logo.svg";
import s from "./Header.module.css";

const Header = () => {
  return (
    <header className={s.headerPage}>
      <Container className={s.headerContainer}>
        <img src={logo} alt="Company logo RentalCar" width={104} />
        <Navigation />
      </Container>
    </header>
  );
};

export default Header;
