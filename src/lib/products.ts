import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";

export type Product = {
  id: string;
  brand: string;
  name: string;
  price: number;
  category: string;
  tags: string[];
  sizes: number[];
  image: string;
  releaseDate?: string; // ISO
};

export const products: Product[] = [
  { id: "1", brand: "Nike", name: "Air Max 97 Premium", price: 159900, category: "running", tags: ["Nuevo"], sizes: [7, 8, 9, 11], image: p1, releaseDate: "2026-06-14" },
  { id: "2", brand: "Adidas", name: "Samba OG", price: 119900, category: "lifestyle", tags: ["Clásico"], sizes: [7, 8, 9, 10, 12], image: p2 },
  { id: "3", brand: "Salomon", name: "XT-6 Gore-Tex", price: 189900, category: "running", tags: ["Hype"], sizes: [8, 9, 10, 11], image: p3, releaseDate: "2026-06-21" },
  { id: "4", brand: "New Balance", name: "990v6 Made in USA", price: 209900, category: "lifestyle", tags: ["Premium"], sizes: [7, 9, 10, 11, 12], image: p4, releaseDate: "2026-07-02" },
  { id: "5", brand: "Nike", name: "Dunk Low SB", price: 129900, category: "skate", tags: ["Nuevo"], sizes: [8, 9, 10, 12], image: p5, releaseDate: "2026-07-12" },
  { id: "6", brand: "Adidas", name: "Forum Low", price: 99900, category: "lifestyle", tags: ["Oferta"], sizes: [7, 8, 9, 11], image: p6 },
  { id: "7", brand: "Salomon", name: "ACS Pro", price: 169900, category: "running", tags: ["Gorpcore"], sizes: [8, 9, 11], image: p7, releaseDate: "2026-07-26" },
];

export const formatPrice = (n: number) => `$${n.toLocaleString("es-CL")}`;
export const getProduct = (id: string) => products.find((p) => p.id === id);
export const BRAND = "SASSY SNKRS";
