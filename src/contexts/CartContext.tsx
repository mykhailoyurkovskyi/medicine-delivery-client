import React, { createContext,
  useState, 
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { MedicineType } from "../types/Medicine";

type Props = {
  children: React.ReactNode
};

interface CartContextType {
  addToCart: (medicine: MedicineType, id: number) => void,
  cart: CartItemType[],
  setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>,
  removeFromCart: (id: number) => void,
  clearCart: () => void,
  increaseAmount: (cartId: number) => void,
  decreaseAmount: (cartId: number) => void,
  itemAmount: number,
  setItemAmount: React.Dispatch<React.SetStateAction<number>>,
  total: number,
  setTotal: React.Dispatch<React.SetStateAction<number>>
}

export type CartItemType = MedicineType & { amount: number };

export const CartContext = createContext<CartContextType>({
  addToCart: () => {},
  cart: [],
  setCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  increaseAmount: (cartId: number) => {},
  decreaseAmount: (cartId: number) => {},
  itemAmount: 0,
  setItemAmount: () => {},
  total: 0,
  setTotal: () => {}
});

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const total = cart.reduce((acc, currItem) => {
      return acc + currItem.price * currItem.amount;
    }, 0);

    setTotal(total);
  }, [cart]);

  useEffect(() => {
    if(cart) {
      const amount = cart.reduce((acc, currItem) => {
        return acc + currItem.amount;
      }, 0);

      setItemAmount(amount);
    }
  }, [cart]);

  const addToCart = useCallback((medicine: MedicineType, id: number) => {
    const cartItem = cart.find((item) => item.id === id);
  
    if (cartItem) {
      const newCart = cart.map((item) => 
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      );
    
      setCart(newCart);
    } else {
      setCart([...cart, { ...medicine, amount: 1 }]);
    }
  }, [cart]);

  const increaseAmount = useCallback((cartId: number) => {
    const cartItem = cart.find(item => item.id === cartId);

    if (!cartItem) {
      console.error(`Item with ID ${cartId} not found in the cart.`);
      return;
    }
  
    addToCart(cartItem, cartId);
  }, [addToCart, cart]);

  const removeFromCart = useCallback((id: number) => {
    const newCart = cart.filter(item => {
      return item.id !== id;
    });

    setCart(newCart);
  }, [cart]);

  const decreaseAmount = useCallback((cartId: number) => {
    const cartItem = cart.find(item => item.id === cartId);
  
    if (!cartItem) {
      console.log('Cart item not found');
      return;
    }
  
    if (cartItem.amount < 2) {
      removeFromCart(cartId);
      return;
    }
  
    const newCart = cart.map(item =>
      item.id === cartId ? { ...item, amount: item.amount - 1 } : item
    );
  
    setCart(newCart);
  }, [cart, removeFromCart]);
  
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const value = useMemo(() => ({
    cart,
    setCart,
    addToCart,
    removeFromCart,
    clearCart,
    increaseAmount,
    decreaseAmount,
    itemAmount,
    setItemAmount,
    total,
    setTotal
  }), [
    cart,
    setCart,
    addToCart,
    removeFromCart,
    clearCart,
    increaseAmount,
    decreaseAmount,
    itemAmount,
    setItemAmount,
    total,
    setTotal
  ]);

  return <CartContext.Provider value={value}>
    {children}
  </CartContext.Provider>;
}