import { Link } from "@tanstack/react-router";
import { useCartCount } from "@/lib/cart";
import { BRAND } from "@/lib/products";

export function Nav() {
  const count = useCartCount();
  return (
    <nav className="sticky top-0 z-50 glass-strong">
      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        <Link to="/" className="font-display text-lg font-semibold tracking-[0.2em] uppercase text-foreground">
          {BRAND}
        </Link>
        <div className="hidden md:flex gap-10">
          <Link to="/" className="mono text-[10px] uppercase text-muted-foreground hover:text-foreground transition-colors">Catálogo</Link>
          <span className="mono text-[10px] uppercase text-muted-foreground/50">Lanzamientos</span>
          <span className="mono text-[10px] uppercase text-muted-foreground/50">Marcas</span>
        </div>
        <Link to="/carrito" className="mono text-[10px] uppercase tracking-[0.2em] px-4 py-2 glass glass-hover">
          Carrito <span className="text-foreground/60">[{count}]</span>
        </Link>
      </div>
    </nav>
  );
}
