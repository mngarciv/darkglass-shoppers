import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { products, formatPrice, BRAND } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${"SASSY SNKRS"} — Curated Premium Sneakers` },
      { name: "description", content: "Catálogo curado de zapatillas premium. Nike, Adidas, Salomon, New Balance." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* HERO */}
      <header className="relative px-6 md:px-10 pt-24 pb-20 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <p className="mono text-[10px] uppercase text-muted-foreground mb-6">
            FW26 / Edición limitada
          </p>
          <h1 className="font-display text-5xl md:text-8xl font-light tracking-tight leading-[0.95] text-foreground max-w-4xl">
            Curaduría de
            <br />
            <span className="italic font-extralight text-muted-foreground">silueta y materia.</span>
          </h1>
          <p className="mt-8 max-w-md text-sm text-muted-foreground leading-relaxed">
            Una selección estricta de pares construidos para durar. Sin ruido,
            sin neón, sólo el objeto.
          </p>
        </div>
      </header>

      {/* GRID */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <h2 className="font-display text-2xl font-light tracking-tight">Catálogo</h2>
            <span className="mono text-[10px] uppercase text-muted-foreground">{products.length} piezas</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <Link
                to="/producto/$id"
                params={{ id: p.id }}
                key={p.id}
                className="glass glass-hover group flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={p.image}
                    alt={`${p.brand} ${p.name}`}
                    loading="lazy"
                    width={800}
                    height={800}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 mono text-[9px] uppercase tracking-[0.2em] px-2 py-1 glass-strong text-foreground/80">
                    {p.tags[0]}
                  </span>
                </div>
                <div className="p-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="mono text-[10px] uppercase text-muted-foreground mb-2">{p.brand}</p>
                    <h3 className="font-display text-lg font-light tracking-tight text-foreground">
                      {p.name}
                    </h3>
                  </div>
                  <span className="mono text-sm text-foreground/90 whitespace-nowrap">{formatPrice(p.price)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-6 md:px-10 py-12 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <p className="mono text-[10px] uppercase text-muted-foreground">© 2026 {BRAND}</p>
          <p className="mono text-[10px] uppercase text-muted-foreground">Santiago — Buenos Aires</p>
        </div>
      </footer>
    </div>
  );
}
