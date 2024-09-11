"use client";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  removeProductFromCart,
  updateProductQuantity,
} from "@/redux/cartSlice";
import clsx from "clsx";

import Image from "next/image";
import ArrowLeft from "@images/arrow-left.svg";
import Ethereum from "@images/ethereum.svg";

import { motion } from "framer-motion";
import { CartProduct } from "../cart-product";
import { Button } from "../button";

type CartProps = {
  isOpen: boolean;
  onClose: () => void;
  total: number;
};

export const Cart = ({ isOpen, onClose }: CartProps) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state: RootState) => state.cart.products);

  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleRemove = (id: number) => {
    dispatch(removeProductFromCart(id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateProductQuantity({ id, quantity }));
  };

  const handlePurchase = () => {
    setIsPurchased(true);

    cartProducts.forEach((product) =>
      dispatch(removeProductFromCart(product.id))
    );

    setTimeout(() => {
      setIsPurchased(false);
    }, 100);
  };

  const total = cartProducts.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const isCartEmpty = cartProducts.length === 0;

  return (
    <>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0, visibility: "hidden" }}
        animate={{
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
        }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />
      <motion.div
        className={clsx(styles.cart, { [styles.open]: isOpen })}
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className={styles.cart_header}>
          <button className={styles.close_button} onClick={onClose}>
            <Image src={ArrowLeft} alt="Fechar" />
          </button>
          <h1 className={styles.title}>Mochila de Compras</h1>
        </div>

        <div className={styles.products}>
          {cartProducts.length === 0 ? (
            <p className={styles.text}>Sua mochila está vazia</p>
          ) : (
            cartProducts.map((product) => (
              <CartProduct
                key={product.id}
                image={product.image}
                name={product.name}
                description={product.description}
                price={product.price}
                quantity={product.quantity}
                onQuantityChange={(quantity) =>
                  handleQuantityChange(product.id, quantity)
                }
                onRemove={() => handleRemove(product.id)}
              />
            ))
          )}
        </div>

        <div className={styles.cart_footer}>
          <div className={styles.total_price}>
            <h2 className={styles.total}>Total</h2>
            <div className={styles.price_info}>
              <Image src={Ethereum} alt="Ethereum" />
              <p className={styles.price}>{total} ETH</p>
            </div>
          </div>

          <Button
            onClick={handlePurchase}
            stroke={!isPurchased}
            disabled={isCartEmpty}
          >
            {isPurchased ? "Compra Finalizada!" : "Finalizar compra"}
          </Button>
        </div>
      </motion.div>
    </>
  );
};
