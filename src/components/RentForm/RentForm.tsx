import { Controller, useForm } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { enGB } from "date-fns/locale/en-GB";

import { schemaRentForm } from "../../utils/schemaRentForm";
import Button from "../Button/Button";
import s from "./RentForm.module.css";

registerLocale("en-GB", enGB);

const RentForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { name: "", email: "", comment: "", date: undefined },
    resolver: zodResolver(schemaRentForm),
  });

  const notify = () =>
    toast.success("Your booking request has been sent successfully.");

  return (
    <div className={s.formContainer}>
      <h3 className={s.title}>Book your car now</h3>
      <p className={s.text}>Stay connected! We are always ready to help you.</p>
      <form
        className={s.form}
        onSubmit={handleSubmit(() => {
          notify();
          reset();
        })}
      >
        <input {...register("name")} placeholder="Name*" className={s.input} />
        <div className={s.error}>
          {errors.name?.message && (
            <p className={s.textError}>{errors.name?.message}</p>
          )}
        </div>
        <input
          className={s.input}
          {...register("email")}
          type="email"
          placeholder="Email*"
        />
        <div className={s.error}>
          {errors.email?.message && (
            <p className={s.textError}>{errors.email?.message}</p>
          )}
        </div>

        <div className={s.date_box}>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePicker
                locale="en-GB"
                selected={field.value as unknown as Date}
                dateFormat="dd.MM.yyyy"
                className={s.datePicker}
                placeholderText="Booking date"
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <textarea
          className={s.comment}
          name="comment"
          placeholder="Comment"
        ></textarea>
        <Button className={s.sendBtn} type="submit" text="Send" />
      </form>
    </div>
  );
};

export default RentForm;
