import { ChangeEvent } from "react";

interface CookingTimeProps {
  timerValue: {
    hours: number;
    minutes: number;
  };
  onChange: ({ hours, minutes }: { hours: number; minutes: number }) => void;
}

const CookingTime = ({ timerValue, onChange }: CookingTimeProps) => {
  const { hours, minutes } = timerValue;

  const handleHoursChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = +e.target.value;
    if (value < 0) {
      value = 0;
    }
    onChange({ hours: value, minutes });
  };

  const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = +e.target.value;
    if (value > 59) {
      value = 59;
    } else if (+value < 0) {
      value = 0;
    }
    onChange({ hours, minutes: value });
  };
  return (
    <fieldset className="form__timer-fiedls timer">
      <legend className="form__label">Час приготування</legend>
      <div className="timer__wrapper">
        <label className="timer__label-hours">
          <input
            className="timer__input-hours form__input"
            type="number"
            name="години"
            value={hours}
            placeholder="00"
            onChange={handleHoursChange}
          />
          <span>годин</span>
        </label>
        <label className="timer__label-minutes">
          <input
            className="timer__input-minutes form__input"
            type="number"
            name="хвилини"
            value={minutes}
            placeholder="00"
            onChange={handleMinutesChange}
          />
          <span>хвилин</span>
        </label>
      </div>
    </fieldset>
  );
};

export default CookingTime;
