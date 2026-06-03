import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { useCart, cart } from "@/lib/cart";
import { getProduct, formatPrice } from "@/lib/products";

export const Route = createFileRoute("/carrito")({
  head: () => ({ meta: [{ title: "Carrito — SASSY SNKRS" }] }),
  component: CartPage,
});

const FREE_SHIPPING = 100000;

function CartPage() {
  const items = useCart();
  const lines = items
    .map((i) => {
      const p = getProduct(i.id);
      return p ? { ...i, product: p } : null;
    })
    .filter(Boolean) as Array<ReturnType<typeof getProduct> extends infer T ? any : never>;

  const subtotal = lines.reduce((s: number, l: any) => s + l.product.price * l.cantidad, 0);
  const missing = Math.max(0, FREE_SHIPPING - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100);

  return (
    <div className="min-h-screen">
      <Nav />

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-16">
        <div className="flex items-end justify-between mb-12">
          <h1 className="font-display text-4xl md:text-6xl font-light tracking-tight">
            Tu carrito
          </h1>
          <span className="mono text-[10px] uppercase text-muted-foreground">
            {lines.length} {lines.length === 1 ? "pieza" : "piezas"}
          </span>
        </div>

        {lines.length === 0 ? (
          <div className="glass p-16 text-center">
            <p className="mono text-[10px] uppercase text-muted-foreground mb-6">El carrito está vacío</p>
            <Link to="/" className="mono text-xs uppercase tracking-[0.2em] inline-block px-6 py-3 bg-foreground text-background">
              Explorar catálogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
            {/* Items */}
            <div className="glass divide-y divide-border">
              {lines.map((l: any) => (
                <div key={`${l.id}-${l.talla}`} className="flex gap-5 p-5">
                  <div className="glass-strong w-24 h-24 shrink-0 overflow-hidden">
                    <img src={l.product.image} alt={l.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="mono text-[10px] uppercase text-muted-foreground">{l.product.brand}</p>
                      <h3 className="font-display text-base font-light text-foreground">{l.product.name}</h3>
                      <p className="mono text-[10px] uppercase text-muted-foreground mt-1">Talla US {l.talla}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 mono text-xs">
                        <button onClick={() => cart.setQty(l.id, l.talla, l.cantidad - 1)} className="w-7 h-7 border border-border hover:border-foreground/40 transition-colors">−</button>
                        <span className="w-7 text-center">{l.cantidad}</span>
                        <button onClick={() => cart.setQty(l.id, l.talla, l.cantidad + 1)} className="w-7 h-7 border border-border hover:border-foreground/40 transition-colors">+</button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="mono text-sm">{formatPrice(l.product.price * l.cantidad)}</span>
                        <button onClick={() => cart.remove(l.id, l.talla)} className="mono text-[10px] uppercase text-muted-foreground hover:text-foreground">Quitar</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <aside className="glass-strong p-6 h-fit sticky top-24">
              <h2 className="mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-6">Resumen</h2>

              <div className="mb-6">
                <p className="mono text-[10px] uppercase mb-3 text-foreground/80">
                  {missing > 0 ? (
                    <>Faltan <span className="text-foreground">{formatPrice(missing)}</span> para envío gratis</>
                  ) : (
                    "✓ Envío gratis incluido"
                  )}
                </p>
                <div className="w-full bg-muted h-[2px]">
                  <div className="h-full bg-foreground transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between mono text-xs">
                  <span className="text-muted-foreground uppercase">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between mono text-xs">
                  <span className="text-muted-foreground uppercase">Envío</span>
                  <span>{missing > 0 ? formatPrice(5990) : "Gratis"}</span>
                </div>
              </div>

              <div className="hairline pt-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="mono text-[10px] uppercase">Total</span>
                  <span className="font-display text-2xl">{formatPrice(subtotal + (missing > 0 ? 5990 : 0))}</span>
                </div>
              </div>

              <button className="w-full py-4 mono text-xs uppercase tracking-[0.2em] bg-foreground text-background hover:bg-foreground/90 transition-colors">
                Ir al checkout
              </button>
              <Link to="/" className="block text-center mono text-[10px] uppercase text-muted-foreground hover:text-foreground mt-4">
                Seguir comprando
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
