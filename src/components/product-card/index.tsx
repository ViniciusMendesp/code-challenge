import styles from "./styles.module.scss";

import Image from "next/image";
import Ethereum from "@images/ethereum.svg";

import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "../button";

type ProductCardProps = {
  name: string;
  image: string;
  description: string;
  price: number;
  onAddToCart: () => void;
  isAdded: boolean;
};

export const ProductCard = ({
  image,
  name,
  description,
  price,
  onAddToCart,
  isAdded,
}: ProductCardProps) => {
  return (
    <div className={styles.card}>
      <Image
        className={styles.card_image}
        src={image}
        alt="Um item muito legal"
        width={215}
        height={215}
      />
      <div className={styles.card_info}>
        <h1 className={styles.card_name}>{name}</h1>
        <Tooltip
          className={styles.tooltip}
          content={description}
          showArrow
          placement="bottom"
          closeDelay={100}
        >
          <p className={styles.card_description}>{description}</p>
        </Tooltip>
      </div>
      <div className={styles.price_info}>
        <Image src={Ethereum} alt="Ethereum" />
        <p className={styles.price}>{price} ETH</p>
      </div>

      <Button uppercase onClick={onAddToCart} disabled={isAdded}>
        {isAdded ? "Adicionado ao carrinho" : "Comprar"}
      </Button>
    </div>
  );
};
