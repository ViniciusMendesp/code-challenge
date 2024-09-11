import styles from "./styles.module.scss";

type SliderProps = {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
};

export const Slider = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  disabled,
}: SliderProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={styles.slider}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className={styles.slider_input}
        style={{ backgroundSize: `${percentage}% 100%` }}
        disabled={disabled}
      />
    </div>
  );
};
