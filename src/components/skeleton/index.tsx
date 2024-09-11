import styles from "./styles.module.scss";

import { motion } from "framer-motion";

export const Skeleton = () => {
  return (
    <motion.div
      className={styles.card}
      animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
    ></motion.div>
  );
};
