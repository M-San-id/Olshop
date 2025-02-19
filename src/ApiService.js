// apiService.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://fakestoreapi.com/",
  headers: { "Content-Type": "application/json" },
});

// Auth requests
export async function loginRequest(username, password) {
  const response = await apiClient.post("auth/login", { username, password });
  return response.data;
}

// Product requests
export async function fetchProducts() {
  const response = await apiClient.get("products");
  return response.data;
}

export const fetchProductDetails = async (productId) => {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${productId}`
    );
    return await response.json();
  } catch (error) {
    throw new Error("Failed to fetch product details");
  }
};

export const addToCart = async (userId, product) => {
  try {
    const response = await fetch("https://fakestoreapi.com/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        date: new Date(),
        products: [
          { productId: product.productId, quantity: product.quantity },
        ],
      }),
    });
    return await response.json();
  } catch (error) {
    throw new Error("Failed to add to cart");
  }
};

export const fetchCart = async (userId) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/carts/${userId}`);
    return await response.json();
  } catch (error) {
    throw new Error("Failed to fetch cart");
  }
};

export async function updateCart(cartId, products) {
  const response = await apiClient.put(`carts/${cartId}`, {
    userId: 1, // Replace with dynamic userId if available
    date: new Date().toISOString(),
    products,
  });
  return response.data;
}

export async function deleteCart(cartId) {
  const response = await apiClient.delete(`carts/${cartId}`);
  return response.data;
}
