import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { formatWithCommas, removeNonDigits } from "../../utils/formatMileage";
import { selectBrands } from "../../redux/brands/selectors";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getCars } from "../../redux/cars/operations";
import { setSearch } from "../../redux/cars/slice";
import Button from "../Button/Button";
import CustomSelect from "./CustomSelect";
import s from "./SearchBar.module.css";

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
    <form
      onSubmit={handleSubmit((value) => {
        dispatch(setSearch(value));
        dispatch(getCars(false));
      })}
      className={s.searchForm}
    >
      <div className={s.labelBox}>
        <CustomSelect
          array={brand}
          control={control as never}
          placeholder="Choose a brand"
          name="brand"
          props={register("brand")}
        />
      </div>

      <div className={s.labelBox}>
        <CustomSelect
          array={prices}
          prefix="To $"
          placeholder="Choose a price"
          control={control as never}
          name="rentalPrice"
          props={register("rentalPrice")}
        />
      </div>

      <div className={s.labelBox}>
        <label className={s.searchFormLabel} htmlFor="mileage">
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
  );
};

export default SearchBar;
