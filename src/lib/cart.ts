import { useEffect, useState, useSyncExternalStore } from "react";

export type CartItem = { id: string; talla: number; cantidad: number };

const KEY = "carrito";
const listeners = new Set<() => void>();

const read = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const write = (items: CartItem[]) => {
  localStorage.setItem(KEY, JSON.stringify(items));
  listeners.forEach((l) => l());
};

export const cart = {
  get: read,
  add(item: CartItem) {
    const items = read();
    const existing = items.find((i) => i.id === item.id && i.talla === item.talla);
    if (existing) existing.cantidad += item.cantidad;
    else items.push(item);
    write(items);
  },
  remove(id: string, talla: number) {
    write(read().filter((i) => !(i.id === id && i.talla === talla)));
  },
  setQty(id: string, talla: number, qty: number) {
    const items = read().map((i) =>
      i.id === id && i.talla === talla ? { ...i, cantidad: Math.max(1, qty) } : i,
    );
    write(items);
  },
  clear() { write([]); },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => { listeners.delete(l); };
  },
};

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    setItems(read());
    return cart.subscribe(() => setItems(read()));
  }, []);
  return items;
};

export const useCartCount = () => {
  const items = useCart();
  return items.reduce((s, i) => s + i.cantidad, 0);
};
