import { useRef, useState } from "react";
import { Controller, type Control } from "react-hook-form";
import s from "./CustomSelect.module.css";
import clsx from "clsx";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";

interface ICustomSelect {
  array: string[] | number[];
  name: string;
  placeholder: string;
  control: Control;
  prefix?: string;
  props: unknown;
}

const CustomSelect = ({
  array,
  name,
  control,
  placeholder,
  prefix = "",
  ...props
}: ICustomSelect) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);

  return (
    <>
      <span className={s.selectLabel}>Price/ 1 hour</span>
      <Controller
        {...props}
        name={name}
        control={control}
        defaultValue={""}
        render={({ field }) => (
          <div ref={dropDownRef} className={s.dropDown}>
            <div
              className={s.dropdownToggle}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div
                className={clsx(s.dropdownValue, field.value && s.activeValue)}
              >
                {field.value ? prefix + field.value : placeholder}
              </div>
              {field.value && (
                <button
                  className={s.closeBtn}
                  type="button"
                  onClick={() => {
                    field.onChange("");
                    setTimeout(() => setIsOpen(false), 0);
                  }}
                >
                  <MdOutlineClose size={18} className={s.closeIcon} />
                </button>
              )}
              <IoIosArrowDown
                size={20}
                className={clsx(s.selectIcon, isOpen && s.activeIcon)}
              />
            </div>

            {isOpen && (
              <ul className={s.dropdownMenu}>
                {array.map((item) => (
                  <li
                    key={item}
                    onClick={() => {
                      field.onChange(item);
                      setIsOpen(false);
                    }}
                    className={s.dropdownItem}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      />
    </>
  );
};

export default CustomSelect;
