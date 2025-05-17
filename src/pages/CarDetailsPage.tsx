import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { BsCalendar2Week, BsCarFrontFill, BsFuelPump } from "react-icons/bs";
import { GoCheckCircle } from "react-icons/go";
import { TfiLocationPin } from "react-icons/tfi";
import { FiSettings } from "react-icons/fi";
import type { ICar } from "../redux/cars/slice";
import { formatMileage } from "../utils/formatMileage";
import { BASE_API } from "../service/baseAPI";
import RentForm from "../components/RentForm/RentForm";
import Loader from "../components/Loader/Loader";
import Container from "../components/Container/Container";
import s from "./CarDetailsPage.module.css";

const CarDetailsPage = () => {
  const [car, setCar] = useState<ICar>();
  const [isLoading, setIsLoading] = useState(false);
  const { carId } = useParams();

  async function fetchCarById(id: string): Promise<ICar> {
    try {
      const { data } = await BASE_API.get(`/cars/${id}`);

      if (!data) {
        throw new Error(`Failed to fetch car with id ${id}`);
      }

      return data;
    } catch (error) {
      console.error("Error fetching car:", error);
      throw error;
    }
  }
  
  useEffect(() => {
    if (!carId) {
      return;
    }
    setIsLoading(true);
    fetchCarById(carId)
      .then((car) => {
        setCar(car);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [carId]);

  const addressItems = car?.address?.split(", ").slice(-2);
  const accessoryData = car?.accessories.concat(car.functionalities);

  return isLoading ? (
    <Loader />
  ) : (
    <section className={s.detailPage}>
      <Container className={s.detail}>
        <div className={s.leftBox}>
          <img
            className={s.imgDetails}
            src={car?.img}
            alt={car?.description}
            width={640}
            height={512}
          />
          <RentForm />
        </div>
        <div className={s.rightBox}>
          <div className={s.firstInform}>
            <h3 className={s.subtitle}>
              {car?.brand} {car?.model},{car?.year}
            </h3>
            <p className={s.id}>Id: {car?.id}</p>
            <div className={s.secondLine}>
              <div className={s.address}>
                <TfiLocationPin size={20} />
                {addressItems?.map((item, index) => (
                  <p key={item}>
                    {item}
                    {index === 0 && addressItems.length > 1 && ","}
                  </p>
                ))}
              </div>
              <p className={s.mileage}>
                Mileage: {car?.mileage && formatMileage(car.mileage)}
              </p>
            </div>
            <p className={s.price}>${car?.rentalPrice}</p>
            <p className={s.desc}>{car?.description}</p>
          </div>
          <div className={s.secondInform}>
            <h3 className={s.subtitleDescr}>Rental Conditions:</h3>
            <ul className={s.list}>
              {car?.rentalConditions.map((item) => (
                <li className={s.item} key={item}>
                  <GoCheckCircle size={20} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={s.thirdInform}>
            <h3 className={s.subtitleDescr}>Car Specifications:</h3>
            <ul className={s.list}>
              <li className={s.item}>
                <BsCalendar2Week size={18} /> <p>Year: {car?.year}</p>
              </li>
              <li className={s.item}>
                <BsCarFrontFill size={18} className={s.carIcon} />
                <p>Type: {car?.type}</p>
              </li>
              <li className={s.item}>
                <BsFuelPump size={18} />
                Fuel Consumption: {car?.fuelConsumption}
              </li>
              <li className={s.item}>
                <FiSettings size={18} />
                Engine Size: {car?.engineSize}
              </li>
            </ul>
          </div>
          <div className={s.fourthInform}>
            <h3 className={s.subtitleDescr}>
              Accessories and functionalities:
            </h3>
            <ul className={s.list}>
              {accessoryData?.map((item) => (
                <li className={s.item} key={item}>
                  <GoCheckCircle size={20} /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CarDetailsPage;
