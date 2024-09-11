"use client";
import styles from "./styles.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import Image from "next/image";
import Logo from "@images/logo.svg";
import Bag from "@images/bag.svg";

import { Cart } from "../cart";

export const Header = () => {
  const [isCartOpen, setCartOpen] = useState(false);

  const cartProducts = useSelector((state: RootState) => state.cart.products);
  const quantityOfProducts = cartProducts.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const total = cartProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleCartToggle = () => {
    setCartOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <Image src={Logo} alt="Starsoft" />
      <div className={styles.bag} onClick={handleCartToggle}>
        <Image src={Bag} alt="Bag" />
        <p className={styles.quantiyOfProducts}>{quantityOfProducts}</p>
      </div>
      <Cart
        isOpen={isCartOpen}
        onClose={() => setCartOpen(false)}
        total={total}
      />
    </header>
  );
};
