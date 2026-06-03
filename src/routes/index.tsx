import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { products, formatPrice, BRAND } from "@/lib/products";

type IndexSearch = { q?: string };

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>): IndexSearch => ({
    q: typeof s.q === "string" && s.q.length > 0 ? s.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "SASSY SNKRS — Curated Premium Sneakers" },
      { name: "description", content: "Catálogo curado de zapatillas premium. Nike, Adidas, Salomon, New Balance." },
    ],
  }),
  component: Index,
});

function Index() {
  const { q } = Route.useSearch();
  const query = (q ?? "").trim().toLowerCase();
  const filtered = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      )
    : products;

  return (
    <div className="min-h-screen">
      <Nav />

      {/* HERO */}
      <header className="relative px-6 md:px-10 pt-24 pb-28 border-b border-border overflow-hidden">
        {/* Depth layers */}
        <div className="absolute inset-0 aurora pointer-events-none" />
        <div className="absolute inset-0 grain pointer-events-none opacity-[0.05]" />
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(90,70,140,0.25),transparent_70%)] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-20 w-[460px] h-[460px] rounded-full bg-[radial-gradient(circle,rgba(40,60,90,0.30),transparent_70%)] blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-2 h-2 rounded-full bg-foreground/70 animate-pulse" />
              <p className="mono text-[10px] uppercase text-muted-foreground">FW26 · Edición limitada · Drop semanal</p>
            </div>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light tracking-tight leading-[0.9] text-foreground">
              Curaduría de
              <br />
              <span className="italic font-extralight bg-gradient-to-r from-foreground via-foreground/70 to-foreground/30 bg-clip-text text-transparent">
                silueta y materia.
              </span>
            </h1>
            <p className="mt-8 max-w-md text-sm text-muted-foreground leading-relaxed">
              Una selección estricta de pares construidos para durar. Sin ruido,
              sin neón — sólo el objeto, su sombra y su peso.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#catalogo" className="mono text-[10px] uppercase tracking-[0.2em] px-5 py-3 glass-strong glass-hover">
                Ver catálogo →
              </a>
              <Link to="/lanzamientos" className="mono text-[10px] uppercase tracking-[0.2em] px-5 py-3 glass glass-hover">
                Últimos drops
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:block">
            <div className="glass p-6 space-y-5">
              <div>
                <p className="mono text-[9px] uppercase text-muted-foreground mb-2">Destacado</p>
                <h3 className="font-display text-2xl font-light tracking-tight">{products[2].brand} {products[2].name}</h3>
                <p className="mono text-xs text-foreground/70 mt-1">{formatPrice(products[2].price)}</p>
              </div>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={products[2].image} alt={products[2].name} className="w-full h-full object-cover" />
              </div>
              <Link to="/producto/$id" params={{ id: products[2].id }} className="block mono text-[10px] uppercase tracking-[0.2em] text-center py-3 glass-strong glass-hover">
                Explorar pieza
              </Link>
            </div>
          </div>

          <div className="lg:col-span-12 grid grid-cols-3 gap-px mt-12 border-t border-border pt-8">
            {[
              ["07", "Marcas curadas"],
              ["CLP", "Precio en pesos"],
              ["48H", "Despacho premium"],
            ].map(([k, v]) => (
              <div key={v} className="px-2">
                <p className="font-display text-3xl font-light tracking-tight">{k}</p>
                <p className="mono text-[10px] uppercase text-muted-foreground mt-2">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* GRID */}
      <section id="catalogo" className="px-6 md:px-10 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="mono text-[10px] uppercase text-muted-foreground mb-2">
                {query ? `Buscando "${query}"` : "Selección actual"}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-light tracking-tight">Catálogo</h2>
            </div>
            <span className="mono text-[10px] uppercase text-muted-foreground">{filtered.length} piezas</span>
          </div>

          {filtered.length === 0 ? (
            <div className="glass p-16 text-center">
              <p className="mono text-[11px] uppercase text-muted-foreground">Sin resultados para "{query}"</p>
              <Link to="/" search={{ q: undefined } as any} className="mono text-[10px] uppercase tracking-[0.2em] mt-6 inline-block px-4 py-2 glass-strong glass-hover">
                Limpiar búsqueda
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
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
          )}
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
