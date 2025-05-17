import { Controller, useForm } from "react-hook-form";
import s from "./SearchBar.module.css";
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import { selectBrands } from "../../redux/brands/selectors";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getCars } from "../../redux/cars/operations";
import { setSearch } from "../../redux/cars/slice";
import { formatWithCommas, removeNonDigits } from "../../utils/formatMileage";
import { IoIosArrowDown } from "react-icons/io";

const SearchBar = () => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      minMileage: "",
      brand: "",
      rentalPrice: "",
      maxMileage: "",
    },
  });
  const brand = useSelector(selectBrands);
  const dispatch = useAppDispatch();

  const prices = new Array(43)
    .fill(30)
    .map((_, index) => index * 10)
    .slice(3);

  return (
    <div className={s.searchBar}>
      <form
        onSubmit={handleSubmit((value) => {
          dispatch(setSearch(value));
          dispatch(getCars(false));
        })}
        className={s.form}
      >
        <div className={s.labelBox}>
          <label className={s.label} htmlFor="brand">
            Car brand
          </label>
          <select
            {...register("brand")}
            defaultValue=""
            name="brand"
            id="brand"
            className={s.select}
            disabled={brand.length < 1}
          >
            <option className={s.placeholder} value="" disabled hidden>
              Choose a brand
            </option>
            {brand.map((items) => (
              <option key={items} value={items}>
                {items}
              </option>
            ))}
          </select>
          <IoIosArrowDown size={20} className={s.selectIcon} />
        </div>

        <div className={s.labelBox}>
          <label className={s.label} htmlFor="rentalPrice">
            Price/ 1 hour
          </label>
          <select
            {...register("rentalPrice")}
            defaultValue=""
            name="rentalPrice"
            id="rentalPrice"
            className={s.select}
          >
            <option className={s.placeholder} value="" disabled hidden>
              Price/ 1 hour
            </option>
            {prices.map((item) => (
              <option key={item} value={item}>
                To ${item}
              </option>
            ))}
          </select>
          <IoIosArrowDown size={20} className={s.selectIcon} />
        </div>
        <div className={s.labelBox}>
          <label className={s.label} htmlFor="mileage">
            Сar mileage / km
          </label>
          <div className={s.inputSplit}>
            <span className={s.inputLabelFrom}>From</span>
            <Controller
              name="minMileage"
              control={control}
              render={({ field: { onChange, value, ref, ...rest } }) => (
                <input
                  {...rest}
                  ref={ref}
                  value={formatWithCommas(value)}
                  onChange={(e) => {
                    const raw = removeNonDigits(e.target.value);
                    onChange(raw);
                  }}
                  className={s.inputLeft}
                  id="mileage"
                />
              )}
            />
            <span className={s.inputLabelTo}>To</span>
            <Controller
              name="maxMileage"
              control={control}
              render={({ field: { onChange, value, ref, ...rest } }) => (
                <input
                  {...rest}
                  ref={ref}
                  value={formatWithCommas(value)}
                  onChange={(e) => {
                    const raw = removeNonDigits(e.target.value);
                    onChange(raw);
                  }}
                  className={s.inputRight}
                />
              )}
            />
          </div>
        </div>

        <Button className={s.searchBtn} type="submit" text="Search" />
      </form>
    </div>
  );
};

export default SearchBar;
