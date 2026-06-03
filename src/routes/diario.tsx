import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/diario")({
  head: () => ({
    meta: [
      { title: "Diario — SASSY SNKRS" },
      { name: "description", content: "Crónicas, ensayos y notas de taller sobre la cultura del sneaker premium." },
    ],
  }),
  component: Diario,
});

type Entry = {
  id: string;
  kicker: string;
  title: string;
  excerpt: string;
  date: string;
  read: string;
};

const entries: Entry[] = [
  {
    id: "1",
    kicker: "Ensayo",
    title: "La sombra como material: por qué nos obsesiona el negro mate",
    excerpt: "Una lectura sobre el acabado opaco, el peso visual y la manera en que un par bien construido absorbe la luz sin devolverla.",
    date: "28 May 2026",
    read: "6 min",
  },
  {
    id: "2",
    kicker: "Taller",
    title: "Construcción Vibram MegaGrip: anatomía de una suela",
    excerpt: "Desmontamos la fórmula que comparten los modelos de trail más serios y por qué importa para tu pisada urbana.",
    date: "21 May 2026",
    read: "8 min",
  },
  {
    id: "3",
    kicker: "Cultura",
    title: "Tokio, después de la medianoche: tiendas que no encontrarás en Google",
    excerpt: "Un mapa silencioso por Daikanyama y Naka-Meguro, donde el retail premium se confunde con la galería de arte.",
    date: "14 May 2026",
    read: "10 min",
  },
  {
    id: "4",
    kicker: "Cuidados",
    title: "Cómo prolongar la vida útil de un par premium",
    excerpt: "Rotación, hormas, ceras y el error más común: lavar lo que sólo necesitaba cepillarse.",
    date: "07 May 2026",
    read: "5 min",
  },
  {
    id: "5",
    kicker: "Entrevista",
    title: "Conversación con un coleccionista anónimo",
    excerpt: "Sobre el silencio, la pátina y por qué nunca volvió a comprar un par en hype.",
    date: "30 Abr 2026",
    read: "12 min",
  },
];

function Diario() {
  const [featured, ...rest] = entries;
  return (
    <div className="min-h-screen">
      <Nav />
      <header className="px-6 md:px-10 pt-20 pb-12 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 aurora pointer-events-none opacity-60" />
        <div className="relative max-w-7xl mx-auto">
          <p className="mono text-[10px] uppercase text-muted-foreground mb-4">Editorial · Lecturas largas</p>
          <h1 className="font-display text-5xl md:text-7xl font-light tracking-tight">Diario</h1>
          <p className="mt-6 max-w-xl text-sm text-muted-foreground leading-relaxed">
            Crónicas, ensayos y notas de taller. Una conversación lenta sobre objetos que pretenden durar.
          </p>
        </div>
      </header>

      <section className="px-6 md:px-10 py-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10">
          {/* Featured */}
          <Link
            to="/diario"
            className="lg:col-span-7 glass glass-hover p-10 flex flex-col justify-between min-h-[420px] group"
          >
            <div>
              <p className="mono text-[10px] uppercase text-muted-foreground mb-6">
                {featured.kicker} · {featured.date}
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-light tracking-tight leading-[1.05] group-hover:text-foreground/90 transition-colors">
                {featured.title}
              </h2>
              <p className="mt-6 text-sm text-muted-foreground max-w-xl leading-relaxed">{featured.excerpt}</p>
            </div>
            <p className="mono text-[10px] uppercase text-foreground/60 mt-8">Leer · {featured.read} →</p>
          </Link>

          {/* List */}
          <div className="lg:col-span-5 flex flex-col divide-y divide-border">
            {rest.map((e) => (
              <Link
                key={e.id}
                to="/diario"
                className="py-6 first:pt-0 last:pb-0 group"
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <p className="mono text-[9px] uppercase text-muted-foreground">{e.kicker}</p>
                  <p className="mono text-[9px] uppercase text-muted-foreground">{e.date} · {e.read}</p>
                </div>
                <h3 className="font-display text-xl font-light tracking-tight leading-snug text-foreground/90 group-hover:text-foreground transition-colors">
                  {e.title}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">{e.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
