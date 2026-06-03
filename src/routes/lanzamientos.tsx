import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { products, formatPrice } from "@/lib/products";

export const Route = createFileRoute("/lanzamientos")({
  head: () => ({
    meta: [
      { title: "Lanzamientos — SASSY SNKRS" },
      { name: "description", content: "Últimos lanzamientos y drops exclusivos." },
    ],
  }),
  component: LanzamientosPage,
});

function LanzamientosPage() {
  const drops = products.filter((p) =>
    p.tags.some((t) => ["Nuevo", "Hype", "Premium"].includes(t))
  );

  return (
    <div className="min-h-screen">
      <Nav />
      <header className="relative px-6 md:px-10 pt-24 pb-16 border-b border-border overflow-hidden">
        <div className="absolute inset-0 aurora opacity-60 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <p className="mono text-[10px] uppercase text-muted-foreground mb-6">Drop · Semana 23</p>
          <h1 className="font-display text-5xl md:text-7xl font-light tracking-tight leading-[0.95]">
            Lanzamientos
            <br />
            <span className="italic font-extralight text-muted-foreground">de la temporada.</span>
          </h1>
          <p className="mt-6 max-w-md text-sm text-muted-foreground leading-relaxed">
            Pares recién llegados, ediciones limitadas y reediciones de archivo.
          </p>
        </div>
      </header>

      <section className="px-6 md:px-10 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {drops.map((p) => (
              <Link
                to="/producto/$id"
                params={{ id: p.id }}
                key={p.id}
                className="glass glass-hover group flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img src={p.image} alt={`${p.brand} ${p.name}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-4 left-4 mono text-[9px] uppercase tracking-[0.2em] px-2 py-1 glass-strong text-foreground/80">
                    {p.tags[0]}
                  </span>
                </div>
                <div className="p-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="mono text-[10px] uppercase text-muted-foreground mb-2">{p.brand}</p>
                    <h3 className="font-display text-lg font-light tracking-tight">{p.name}</h3>
                  </div>
                  <span className="mono text-sm whitespace-nowrap">{formatPrice(p.price)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
