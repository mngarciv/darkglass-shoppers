import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, User } from "lucide-react";
import { cart, useCartCount } from "@/lib/cart";
import { BRAND } from "@/lib/products";

export function Nav() {
  const count = useCartCount();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/", search: { q: q.trim() || undefined } as any });
  };

  return (
    <nav className="sticky top-0 z-40 glass-strong">
      <div className="flex items-center justify-between gap-6 px-6 md:px-10 py-4">
        <Link to="/" className="font-display text-lg font-semibold tracking-[0.2em] uppercase text-foreground shrink-0">
          {BRAND}
        </Link>

        <div className="hidden md:flex gap-8 shrink-0">
          <Link to="/" className="mono text-[10px] uppercase text-muted-foreground hover:text-foreground transition-colors" activeOptions={{ exact: true }} activeProps={{ className: "mono text-[10px] uppercase text-foreground" }}>
            Catálogo
          </Link>
          <Link to="/lanzamientos" className="mono text-[10px] uppercase text-muted-foreground hover:text-foreground transition-colors" activeProps={{ className: "mono text-[10px] uppercase text-foreground" }}>
            Lanzamientos
          </Link>
          <span className="mono text-[10px] uppercase text-muted-foreground/40">Marcas</span>
        </div>

        <form onSubmit={submit} className="flex-1 max-w-sm hidden md:flex">
          <div className="glass flex items-center gap-2 px-3 py-2 w-full focus-within:border-white/20 transition-colors">
            <Search className="w-3.5 h-3.5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar marca, silueta…"
              className="mono text-[11px] bg-transparent outline-none w-full placeholder:text-muted-foreground/60 text-foreground"
            />
          </div>
        </form>

        <button
          onClick={() => cart.open()}
          className="mono text-[10px] uppercase tracking-[0.2em] px-4 py-2 glass glass-hover shrink-0"
        >
          Carrito <span className="text-foreground/60">[{count}]</span>
        </button>
      </div>
    </nav>
  );
}
