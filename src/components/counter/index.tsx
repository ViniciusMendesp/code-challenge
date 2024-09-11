import styles from "./styles.module.scss";
import { useState, useEffect } from "react";

type CounterProps = {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
};

export const Counter = ({ quantity, onQuantityChange }: CounterProps) => {
  const [count, setCount] = useState(quantity);

  useEffect(() => {
    setCount(quantity);
  }, [quantity]);

  const increment = () => {
    setCount((prev) => {
      const newCount = prev + 1;
      onQuantityChange(newCount);
      return newCount;
    });
  };

  const decrement = () => {
    setCount((prev) => {
      if (prev <= 1) return prev;
      const newCount = prev - 1;
      onQuantityChange(newCount);
      return newCount;
    });
  };

  return (
    <div className={styles.counter}>
      <button className={styles.button} onClick={decrement}>
        -
      </button>
      <span className={styles.count}>{count}</span>
      <button className={styles.button} onClick={increment}>
        +
      </button>
    </div>
  );
};
