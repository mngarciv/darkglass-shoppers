import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
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

const heroProduct = products[2]; // Salomon XT-6 — striking silhouette

function Index() {
  const { q } = Route.useSearch();
  const query = (q ?? "").trim().toLowerCase();

  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand))), []);
  const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category))), []);

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [brand, setBrand] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<"default" | "asc" | "desc">("default");

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (query &&
        !(p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query)))
      ) return false;
      if (brand && p.brand !== brand) return false;
      if (category && p.category !== category) return false;
      return true;
    });
    if (sort === "asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [query, brand, category, sort]);

  const activeCount = (brand ? 1 : 0) + (category ? 1 : 0) + (sort !== "default" ? 1 : 0);

  return (
    <div className="min-h-screen">
      <Nav />

      {/* HERO */}
      <header className="relative px-6 md:px-10 pt-16 md:pt-20 pb-0 overflow-hidden">
        <div className="absolute inset-0 aurora pointer-events-none" />
        <div className="absolute inset-0 grain pointer-events-none opacity-[0.05]" />
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(90,70,140,0.30),transparent_70%)] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-20 w-[460px] h-[460px] rounded-full bg-[radial-gradient(circle,rgba(40,60,90,0.32),transparent_70%)] blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-stretch min-h-[78vh]">
          {/* Left: text */}
          <div className="lg:col-span-7 flex flex-col justify-center pt-8 pb-12">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-2 h-2 rounded-full bg-foreground/70 animate-pulse" />
              <p className="mono text-[10px] uppercase text-muted-foreground">FW26 · Edición limitada · Drop semanal</p>
            </div>
            <h1 className="font-display text-6xl md:text-8xl lg:text-[9rem] font-light tracking-tight leading-[0.88] text-foreground">
              Curaduría
              <br />
              de silueta
              <br />
              <span className="italic font-extralight bg-gradient-to-r from-foreground via-foreground/70 to-foreground/30 bg-clip-text text-transparent">
                y materia.
              </span>
            </h1>
            <p className="mt-8 max-w-md text-sm text-muted-foreground leading-relaxed">
              Selección estricta de pares construidos para durar. Sin ruido, sin neón — sólo el objeto, su sombra y su peso.
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

          {/* Right: large sneaker descending */}
          <div className="lg:col-span-5 relative hidden lg:flex items-end justify-center">
            {/* halo */}
            <div className="absolute inset-y-0 right-0 w-[120%] bg-[radial-gradient(ellipse_at_center,rgba(110,90,180,0.20),transparent_65%)] pointer-events-none" />
            <div className="relative w-full h-full flex items-end justify-center">
              <img
                src={heroProduct.image}
                alt={`${heroProduct.brand} ${heroProduct.name}`}
                className="relative w-[120%] max-w-none -mr-10 translate-y-12 rotate-[8deg] drop-shadow-[0_60px_60px_rgba(0,0,0,0.7)] object-contain"
                style={{
                  maskImage: "linear-gradient(180deg, #000 75%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(180deg, #000 75%, transparent 100%)",
                }}
              />
              {/* floating tag */}
              <Link
                to="/producto/$id"
                params={{ id: heroProduct.id }}
                className="absolute top-8 left-2 glass-strong glass-hover px-4 py-3 max-w-[200px]"
              >
                <p className="mono text-[9px] uppercase text-muted-foreground mb-1">Destacado</p>
                <p className="font-display text-sm font-light leading-tight">{heroProduct.brand} {heroProduct.name}</p>
                <p className="mono text-[10px] text-foreground/70 mt-2">{formatPrice(heroProduct.price)} →</p>
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div className="lg:col-span-12 grid grid-cols-3 gap-px border-t border-border pt-8 pb-10">
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

      {/* CATÁLOGO */}
      <section id="catalogo" className="px-6 md:px-10 py-20 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8 gap-4 flex-wrap">
            <div>
              <p className="mono text-[10px] uppercase text-muted-foreground mb-2">
                {query ? `Buscando "${query}"` : "Selección actual"}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-light tracking-tight">Catálogo</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="mono text-[10px] uppercase text-muted-foreground">{filtered.length} piezas</span>
              <button
                onClick={() => setFiltersOpen((v) => !v)}
                className="mono text-[10px] uppercase tracking-[0.2em] px-4 py-2 glass glass-hover flex items-center gap-2"
              >
                <SlidersHorizontal className="w-3 h-3" />
                Filtros
                {activeCount > 0 && (
                  <span className="text-foreground/60">[{activeCount}]</span>
                )}
              </button>
            </div>
          </div>

          {/* Hidden filter panel */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-out ${filtersOpen ? "max-h-96 mb-8" : "max-h-0 mb-0"}`}
          >
            <div className="glass p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="mono text-[9px] uppercase text-muted-foreground mb-3">Marca</p>
                <div className="flex flex-wrap gap-2">
                  {brands.map((b) => (
                    <button
                      key={b}
                      onClick={() => setBrand(brand === b ? null : b)}
                      className={`mono text-[10px] uppercase px-3 py-1.5 border transition-colors ${
                        brand === b ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/40 text-foreground/80"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mono text-[9px] uppercase text-muted-foreground mb-3">Categoría</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(category === c ? null : c)}
                      className={`mono text-[10px] uppercase px-3 py-1.5 border transition-colors ${
                        category === c ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/40 text-foreground/80"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mono text-[9px] uppercase text-muted-foreground mb-3">Precio</p>
                <div className="flex flex-wrap gap-2">
                  {([
                    ["default", "Curado"],
                    ["asc", "Menor →"],
                    ["desc", "Mayor →"],
                  ] as const).map(([k, label]) => (
                    <button
                      key={k}
                      onClick={() => setSort(k)}
                      className={`mono text-[10px] uppercase px-3 py-1.5 border transition-colors ${
                        sort === k ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/40 text-foreground/80"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {activeCount > 0 && (
                <button
                  onClick={() => { setBrand(null); setCategory(null); setSort("default"); }}
                  className="md:col-span-3 mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground inline-flex items-center gap-1 justify-self-start"
                >
                  <X className="w-3 h-3" /> Limpiar filtros
                </button>
              )}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="glass p-16 text-center">
              <p className="mono text-[11px] uppercase text-muted-foreground">Sin resultados</p>
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
                      <h3 className="font-display text-lg font-light tracking-tight text-foreground">{p.name}</h3>
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
