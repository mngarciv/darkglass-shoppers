import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { products, formatPrice } from "@/lib/products";

export const Route = createFileRoute("/lanzamientos")({
  head: () => ({
    meta: [
      { title: "Lanzamientos — SASSY SNKRS" },
      { name: "description", content: "Calendario de drops y ediciones limitadas." },
    ],
  }),
  component: LanzamientosPage,
});

const fmtDate = (iso: string) => {
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString("es-CL", { day: "2-digit" }),
    month: d.toLocaleDateString("es-CL", { month: "short" }).replace(".", "").toUpperCase(),
    year: d.getFullYear().toString(),
    weekday: d.toLocaleDateString("es-CL", { weekday: "long" }).toUpperCase(),
  };
};

function LanzamientosPage() {
  const drops = products
    .filter((p) => p.releaseDate)
    .sort((a, b) => (a.releaseDate! < b.releaseDate! ? -1 : 1));

  const today = new Date();

  return (
    <div className="min-h-screen">
      <Nav />

      <header className="relative px-6 md:px-10 pt-24 pb-16 border-b border-border overflow-hidden">
        <div className="absolute inset-0 aurora opacity-60 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <p className="mono text-[10px] uppercase text-muted-foreground mb-6">Calendario · FW26</p>
          <h1 className="font-display text-5xl md:text-7xl font-light tracking-tight leading-[0.95]">
            Lanzamientos
            <br />
            <span className="italic font-extralight text-muted-foreground">programados.</span>
          </h1>
        </div>
      </header>

      <section className="px-6 md:px-10 py-16">
        <div className="max-w-5xl mx-auto">
          <ol className="relative">
            {/* vertical line */}
            <div className="absolute left-[88px] md:left-[120px] top-2 bottom-2 w-px bg-border" />

            {drops.map((p) => {
              const d = fmtDate(p.releaseDate!);
              const isPast = new Date(p.releaseDate!) < today;
              return (
                <li key={p.id} className="relative grid grid-cols-[80px_1fr] md:grid-cols-[110px_1fr] gap-6 md:gap-10 py-6 border-b border-border last:border-b-0">
                  {/* Date column */}
                  <div className="text-right">
                    <p className="font-display text-3xl md:text-4xl font-light leading-none">{d.day}</p>
                    <p className="mono text-[10px] uppercase text-muted-foreground mt-2">{d.month} {d.year}</p>
                    <p className="mono text-[9px] uppercase text-muted-foreground/60 mt-1">{d.weekday}</p>
                  </div>

                  {/* Dot */}
                  <span className={`absolute left-[80px] md:left-[112px] top-9 w-4 h-4 rounded-full border ${isPast ? "bg-foreground/40 border-foreground/40" : "bg-foreground border-foreground"}`} />

                  {/* Content */}
                  <Link
                    to="/producto/$id"
                    params={{ id: p.id }}
                    className="glass glass-hover group flex items-center gap-5 p-4 ml-2"
                  >
                    <div className="w-24 h-24 md:w-28 md:h-28 overflow-hidden shrink-0 glass-strong">
                      <img
                        src={p.image}
                        alt={`${p.brand} ${p.name}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="mono text-[9px] uppercase text-muted-foreground">{p.brand}</span>
                        <span className="mono text-[8px] uppercase tracking-[0.2em] px-1.5 py-0.5 border border-border text-foreground/70">
                          {p.tags[0]}
                        </span>
                      </div>
                      <h3 className="font-display text-xl md:text-2xl font-light tracking-tight">{p.name}</h3>
                      <p className="mono text-[10px] text-muted-foreground mt-2">{formatPrice(p.price)}</p>
                    </div>
                    <span className="mono text-[10px] uppercase text-muted-foreground group-hover:text-foreground transition-colors hidden md:inline">
                      {isPast ? "Disponible →" : "Reservar →"}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
      <Footer />
    </div>
  );
}
