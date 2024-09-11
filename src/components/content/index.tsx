"use client";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "@/redux/productsSlice";
import { useProducts } from "@/hooks/useProducts";
import { addProductToCart } from "@/redux/cartSlice";
import { selectCartProducts } from "@/redux/cartSlice";

import { Slider } from "../slider";
import { Button } from "../button";
import { Skeleton } from "../skeleton";
import { ProductCard } from "../product-card";

export const Content = () => {
  const [page, setPage] = useState(1);
  const limit = 12;
  const [products, setProducts] = useState<Product[]>([]);
  const { data, isLoading } = useProducts(page, limit);

  useEffect(() => {
    if (data) {
      setProducts((prevProducts) => [...prevProducts, ...data.data]);
    }
  }, [data]);

  const totalProducts = data?.metadata.count || 0;
  const totalPages = Math.ceil(totalProducts / limit);
  const hasNextPage = page < totalPages;

  const dispatch = useDispatch();
  const cartProducts = useSelector(selectCartProducts);

  const handleAddToCart = (product: Product) => {
    dispatch(addProductToCart(product));
  };

  const isProductInCart = (productId: number) => {
    return cartProducts.some((p) => p.id === productId);
  };

  return (
    <main className={`${styles.main} ${styles.scroll_containe}`}>
      <div className={styles.products}>
        {isLoading
          ? Array.from({ length: limit }).map((_, index) => (
              <Skeleton key={index} />
            ))
          : products.map((product: Product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                name={product.name}
                description={product.description}
                price={product.price}
                onAddToCart={() => handleAddToCart(product)}
                isAdded={isProductInCart(product.id)}
              />
            ))}
      </div>

      <div className={styles.slider_button_container}>
        <Slider
          min={1}
          max={totalPages}
          value={page}
          onChange={(value) => setPage(value)}
          disabled
        />
        <Button
          variant="secondary"
          onClick={() => {
            if (hasNextPage) {
              setPage((prev) => prev + 1);
            }
          }}
        >
          {hasNextPage ? "Carregar mais" : "Você já viu tudo"}
        </Button>
      </div>
    </main>
  );
};
