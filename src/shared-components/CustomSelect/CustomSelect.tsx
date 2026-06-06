import { useState, useEffect, Dispatch, SetStateAction, RefObject } from "react";
import nextId from "react-id-generator";
import "./CustomSelect.scss";

const CustomSelect = <T,>({
  value,
  setValue,
  fieldValues,
  selectTitle,
  isShowCurrentOption,
  initialCheckedValue,
  controlled = false,
  isOpen = false,
  setIsOpen,
  searchRef,
  isButtonVisible,
  getLabel = (item: T) => String(item),
}: {
  value?: T;
  setValue: Dispatch<SetStateAction<T | undefined>>;
  fieldValues: T[];
  selectTitle: string;
  isShowCurrentOption?: boolean;
  initialCheckedValue?: T;
  controlled?: boolean;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  searchRef?: RefObject<HTMLInputElement>;
  isButtonVisible?: boolean;
  getLabel?: (item: T) => string;
}) => {
  const [isCategoryActive, setIsCategoryActive] = useState<boolean>(false);
  const [internalValue, setInternalValue] = useState<T | undefined>(() => initialCheckedValue);

  const selectedValue = controlled ? (value === ("" as T) ? undefined : value) : internalValue;

  useEffect(() => {
    setIsCategoryActive(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (controlled || initialCheckedValue === undefined) return;
    setValue(initialCheckedValue);
  }, []);

  const closeSelect = (e: any) => {
    if (
      !e.target.closest(".custom-select__fields") &&
      !e.target.closest(".custom-select") &&
      !e.target.closest(".searchForm__searchByName")
    ) {
      setIsCategoryActive(false);
      if (setIsOpen) {
        setIsOpen(false);
      }
    }
  };

  useEffect(() => {
    if (isCategoryActive) {
      document.addEventListener("click", closeSelect);
    }

    return () => document.removeEventListener("click", closeSelect);
  }, [isCategoryActive]);

  const handleChange = (item: T) => {
    if (!controlled) {
      setInternalValue(item);
    }
    setValue(item);
    setIsCategoryActive(false);
    if (setIsOpen) setIsOpen(false);
    searchRef?.current?.focus();
  };

  const selectedLabel = selectedValue ? getLabel(selectedValue) : undefined;

  return (
    <div className={`custom-select ${isCategoryActive ? "active" : ""}`}>
      {(isButtonVisible || isButtonVisible === undefined) && (
        <button
          className="custom-select__open-btn"
          type="button"
          onClick={() => {
            setIsCategoryActive(!isCategoryActive);
            if (setIsOpen) {
              setIsOpen(!isOpen);
            }
          }}
        >
          <span className="btn__text">{isShowCurrentOption ? selectedLabel || selectTitle : selectTitle}</span>{" "}
        </button>
      )}
      <fieldset className="custom-select__fields">
        {fieldValues.map((item) => {
          const label = getLabel(item);
          const id = nextId(`${label}`);
          return (
            <div className="custom-select__field" key={id}>
              <input
                className="custom-select__input"
                id={id}
                type="checkbox"
                value={label}
                onChange={() => handleChange(item)}
                checked={label === selectedLabel}
              />
              <label className="custom-select__label" htmlFor={id}>
                {label}
              </label>
              <span className="custom-select__input-custom" />
            </div>
          );
        })}
      </fieldset>
    </div>
  );
};

CustomSelect.defaultProps = {
  isShowCurrentOption: true,
};

export default CustomSelect;
