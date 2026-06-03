import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Mail, MapPin } from "lucide-react";
import { BRAND } from "@/lib/products";

export function Footer() {
  return (
    <footer className="relative mt-12 border-t border-border overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(90,70,140,0.10),transparent_70%)]" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10">
          {/* Brand block */}
          <div className="col-span-2 md:col-span-4">
            <p className="font-display text-xl tracking-[0.2em] uppercase">{BRAND}</p>
            <p className="mt-4 text-xs text-muted-foreground leading-relaxed max-w-xs">
              Selección estricta de pares construidos para durar. Curaduría desde 2024.
            </p>
            <div className="mt-6 flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <p className="mono text-[10px] uppercase">Santiago · Buenos Aires</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="mono text-[9px] uppercase text-muted-foreground mb-4">Navegar</p>
            <ul className="space-y-3">
              <li><Link to="/" className="text-xs text-foreground/80 hover:text-foreground transition-colors">Catálogo</Link></li>
              <li><Link to="/lanzamientos" className="text-xs text-foreground/80 hover:text-foreground transition-colors">Lanzamientos</Link></li>
              <li><Link to="/diario" className="text-xs text-foreground/80 hover:text-foreground transition-colors">Diario</Link></li>
              <li><Link to="/cuenta" className="text-xs text-foreground/80 hover:text-foreground transition-colors">Cuenta</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="mono text-[9px] uppercase text-muted-foreground mb-4">Soporte</p>
            <ul className="space-y-3">
              <li><a href="#" className="text-xs text-foreground/80 hover:text-foreground transition-colors">Envíos</a></li>
              <li><a href="#" className="text-xs text-foreground/80 hover:text-foreground transition-colors">Cambios</a></li>
              <li><a href="#" className="text-xs text-foreground/80 hover:text-foreground transition-colors">Guía de tallas</a></li>
              <li><a href="#" className="text-xs text-foreground/80 hover:text-foreground transition-colors">Autenticidad</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-4">
            <p className="mono text-[9px] uppercase text-muted-foreground mb-4">Boletín</p>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              Drops y ensayos. Un correo cada dos semanas, sin ruido.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="glass flex items-center gap-2 px-3 py-2"
            >
              <Mail className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <input
                type="email"
                placeholder="tu@correo.com"
                className="mono text-[11px] bg-transparent outline-none w-full placeholder:text-muted-foreground/60 text-foreground"
              />
              <button className="mono text-[10px] uppercase tracking-[0.2em] text-foreground/80 hover:text-foreground shrink-0">
                Unirme
              </button>
            </form>
            <div className="flex items-center gap-3 mt-5">
              <a href="#" aria-label="Instagram" className="glass glass-hover p-2">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#" aria-label="Twitter" className="glass glass-hover p-2">
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="mono text-[10px] uppercase text-muted-foreground">© 2026 {BRAND} · Todos los derechos reservados</p>
          <div className="flex gap-6">
            <a href="#" className="mono text-[10px] uppercase text-muted-foreground hover:text-foreground transition-colors">Privacidad</a>
            <a href="#" className="mono text-[10px] uppercase text-muted-foreground hover:text-foreground transition-colors">Términos</a>
            <a href="#" className="mono text-[10px] uppercase text-muted-foreground hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
