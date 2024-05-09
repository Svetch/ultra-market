import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Product } from '../types';

// Define the interface of the Cart state
interface State {
  cart: Product[];
  totalItems: number;
  totalPrice: number;
  open: boolean;
}

// Define the interface of the actions that can be performed in the Cart
interface Actions {
  addToCart: (Item: Product) => void;
  removeFromCart: (Item: Product) => void;
  removeOneFromCart: (Item: Product) => void;
  openCart: () => void;
  closeCart: () => void;
  updateProductQuantity: (Item: Product, quantity: number) => void;
  emptyCart: () => void;
}

// Initialize a default state
const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
  open: false,
};
/*  */
// Create the store with Zustand, combining the status interface and actions
export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      open: INITIAL_STATE.open,
      openCart: () => {
        set((state) => ({ ...state, open: true }));
      },
      closeCart: () => {
        set((state) => ({ ...state, open: false }));
      },
      addToCart: (product: Product) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === product.id);

        // If the item already exists in the Cart, increase its quantity
        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity as number) + 1 }
              : item
          );
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price,
          }));
        } else {
          const updatedCart = [...cart, { ...product, quantity: 1 }];

          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price,
          }));
        }
      },
      removeFromCart: (product: Product) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== product.id),
          totalItems: state.totalItems - (product?.quantity || 1),
          totalPrice:
            state.totalPrice - product.price * (product?.quantity || 1),
        }));
      },
      removeOneFromCart: (product: Product) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === product.id);

        if (cartItem && (cartItem.quantity as number) > 1) {
          const updatedCart = cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity as number) - 1 }
              : item
          );
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems - 1,
            totalPrice: state.totalPrice - product.price,
          }));
        } else {
          set((state) => ({
            cart: state.cart.filter((item) => item.id !== product.id),
            totalItems: state.totalItems - 1,
            totalPrice: state.totalPrice - product.price,
          }));
        }
      },
      updateProductQuantity: (product: Product, quantity: number) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === product.id ? { ...item, quantity } : item
          ),
          totalItems: state.cart.reduce(
            (acc, item) =>
              acc + (item.id === product.id ? quantity : item.quantity!),
            0
          ),
          totalPrice: state.cart.reduce((acc, item) => {
            return (
              acc +
              item.price * (item.id === product.id ? quantity : item.quantity!)
            );
          }, 0),
        }));
      },
      emptyCart: () => {
        set(INITIAL_STATE);
      },
    }),
    {
      name: 'cart-storage', // unic name
      // getStorage: () => sessionStorage, (optional) by default the 'localStorage' is used
    }
  )
);
