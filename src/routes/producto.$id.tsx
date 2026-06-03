import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getProduct, formatPrice, products } from "@/lib/products";
import { cart } from "@/lib/cart";

export const Route = createFileRoute("/producto/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.brand} ${loaderData?.product.name} — SASSY SNKRS` },
      { name: "description", content: `${loaderData?.product.brand} ${loaderData?.product.name}` },
    ],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <Link to="/" className="mono text-xs uppercase">← Volver</Link>
    </div>
  ),
});

const ALL_SIZES = [7, 8, 9, 10, 11, 12];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [size, setSize] = useState<number | null>(null);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!size) return;
    cart.add({ id: product.id, talla: size, cantidad: 1 });
    cart.open();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen">
      <Nav />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border">
        {/* Galería */}
        <div className="bg-background p-6 md:p-10">
          <div className="glass overflow-hidden">
            <img
              src={product.image}
              alt={`${product.brand} ${product.name}`}
              width={800}
              height={800}
              className="w-full aspect-square object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-3 mt-3">
            {[product.image, product.image, product.image].map((src, i) => (
              <div key={i} className="glass aspect-square overflow-hidden opacity-70 hover:opacity-100 transition-opacity">
                <img src={src} alt="" loading="lazy" width={300} height={300} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Panel info */}
        <div className="bg-background p-6 md:p-12 flex items-start">
          <div className="glass-strong w-full p-8 md:p-10 sticky top-24">
            <div className="flex items-center gap-3 mb-3">
              <span className="mono text-[10px] uppercase text-muted-foreground">{product.brand}</span>
              <span className="mono text-[9px] uppercase px-2 py-0.5 border border-border text-foreground/80">
                {product.tags[0]}
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-light tracking-tight leading-none mb-6 text-foreground">
              {product.name}
            </h1>
            <div className="mono text-2xl text-foreground mb-10">{formatPrice(product.price)}</div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-10">
              Construcción premium con materiales seleccionados. Pieza de
              colección, edición limitada. Despacho garantizado en 48hrs.
            </p>

            <div className="mb-8">
              <div className="flex justify-between items-end mb-4">
                <span className="mono text-[10px] uppercase">Talla (US)</span>
                <span className="mono text-[10px] uppercase text-muted-foreground underline cursor-pointer">Guía</span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {ALL_SIZES.map((s) => {
                  const available = product.sizes.includes(s);
                  const active = size === s;
                  return (
                    <button
                      key={s}
                      disabled={!available}
                      onClick={() => setSize(s)}
                      className={`mono text-xs py-3 border transition-all ${
                        active
                          ? "bg-foreground text-background border-foreground"
                          : available
                            ? "border-border hover:border-foreground/40 text-foreground"
                            : "border-border/40 text-muted-foreground/40 line-through cursor-not-allowed"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleAdd}
              disabled={!size}
              className="w-full py-5 mono text-xs uppercase tracking-[0.2em] bg-foreground text-background hover:bg-foreground/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-all"
            >
              {added ? "✓ Añadido al carrito" : size ? "Añadir al carrito" : "Selecciona una talla"}
            </button>

            <p className="mono text-[10px] uppercase text-muted-foreground mt-6 text-center">
              Envío gratis sobre $100.000
            </p>
          </div>
        </div>
      </div>

      {/* Relacionados */}
      <section className="px-6 md:px-10 py-20 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-2xl font-light mb-10">También podría interesarte</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link to="/producto/$id" params={{ id: p.id }} key={p.id} className="glass glass-hover group">
                <div className="aspect-square overflow-hidden">
                  <img src={p.image} alt={p.name} loading="lazy" width={800} height={800} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5 flex justify-between">
                  <div>
                    <p className="mono text-[10px] uppercase text-muted-foreground mb-1">{p.brand}</p>
                    <h3 className="font-display text-base font-light">{p.name}</h3>
                  </div>
                  <span className="mono text-xs">{formatPrice(p.price)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
