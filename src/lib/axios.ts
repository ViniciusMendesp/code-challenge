import axios from "axios";

export const api = axios.create({
  baseURL: "https://starsoft-challenge-7dfd4a56a575.herokuapp.com/v1/",
});

export const fetchProducts = async (page: number, limit: number) => {
  const response = await api.get(`/products`, {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};
