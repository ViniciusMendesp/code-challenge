import styles from "./styles.module.scss";

import Image from "next/image";
import Ethereum from "@images/ethereum.svg";
import Delete from "@images/delete.svg";

import { Tooltip } from "@nextui-org/tooltip";
import { Counter } from "../counter";

type CartProductProps = {
  name: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  onRemove: () => void;
};

export const CartProduct = ({
  image,
  name,
  description,
  price,
  quantity,
  onQuantityChange,
  onRemove,
}: CartProductProps) => {
  return (
    <div className={styles.card}>
      <Image
        className={styles.card_image}
        src={image}
        alt="Um item muito legal"
        width={139}
        height={139}
      />
      <div className={styles.card_info}>
        <h1 className={styles.card_name}>{name}</h1>
        <Tooltip
          className={styles.tooltip}
          content={description}
          showArrow
          placement="bottom-start"
          closeDelay={100}
        >
          <p className={styles.card_description}>{description}</p>
        </Tooltip>
        <div className={styles.price_info}>
          <Image src={Ethereum} alt="Ethereum" />
          <p className={styles.price}>{price} ETH</p>
        </div>
        <div className={styles.actions_buttons}>
          <Counter quantity={quantity} onQuantityChange={onQuantityChange} />
          <button className={styles.remove_to_cart} onClick={onRemove}>
            <Image src={Delete} alt="Trash" />
          </button>
        </div>
      </div>
    </div>
  );
};
