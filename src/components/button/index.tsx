import styles from "./styles.module.scss";

type ButtonProps = {
  children: string;
  variant?: "primary" | "secondary";
  stroke?: boolean;
  uppercase?: boolean;
  onClick: () => void;
  disabled?: boolean;
};

export function Button({
  children,
  variant = "primary",
  stroke = false,
  uppercase = false,
  ...props
}: ButtonProps) {
  return (
    <button {...props} className={`${styles.button} ${styles[variant]} `}>
      <span
        className={`${styles.text} ${stroke ? styles.stroke : ""} ${
          uppercase ? styles.uppercase : ""
        }`}
      >
        {children}
      </span>
    </button>
  );
}
