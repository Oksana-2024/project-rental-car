import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectLikes } from "../../redux/likes/selectors";
import type { ICar } from "../../redux/cars/slice";
import LikeButton from "../LikeButton/LikeButton";
import Button from "../Button/Button";
import s from "./CarItem.module.css";
import { formatMileage } from "../../utils/formatMileage";

type ICarItemProps = ICar;

const CarItem = ({
  img,
  description,
  brand,
  model,
  year,
  rentalPrice,
  address,
  rentalCompany,
  type,
  mileage,
  id,
}: ICarItemProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/catalog/${id}`);
  };
  const addressItems = address?.split(", ").slice(-2);
  const likes = useSelector(selectLikes);

  return (
    <div className={s.carItem}>
      <LikeButton id={id} like={likes.includes(id)} className={s.likeBtn} />

      <img
        src={img}
        alt={description}
        width={276}
        height={268}
        className={s.img}
      />

      <div className={s.ownDesc}>
        <h3 className={s.subtitle}>
          {brand}
          <span className={s.subAccent}>{model}</span>, {year}
        </h3>
        <div>${rentalPrice}</div>
      </div>
      <div className={s.descCarBox}>
        <div className={clsx(s.descCar, s.first)}>
          {addressItems?.map((item) => (
            <span key={item}>{item}</span>
          ))}
          <span>{rentalCompany}</span>
        </div>
        <div className={s.descCar}>
          <span>{type}</span>
          <span>{formatMileage(mileage)}</span>
        </div>
      </div>
      <Button
        className={s.readMoreBtn}
        text="Read more"
        type="button"
        onClick={handleClick}
      ></Button>
    </div>
  );
};

export default CarItem;
