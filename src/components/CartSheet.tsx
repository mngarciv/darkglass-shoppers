import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { X, Minus, Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cart, useCart } from "@/lib/cart";
import { getProduct, formatPrice } from "@/lib/products";

const FREE_SHIPPING = 100000;

export function CartSheet() {
  const [open, setOpen] = useState(false);
  const items = useCart();

  useEffect(() => cart.onOpen(() => setOpen(true)), []);

  const lines = items
    .map((i) => {
      const p = getProduct(i.id);
      return p ? { ...i, product: p } : null;
    })
    .filter(Boolean) as Array<{ id: string; talla: number; cantidad: number; product: ReturnType<typeof getProduct> & {} }>;

  const subtotal = lines.reduce((s, l) => s + l.product.price * l.cantidad, 0);
  const missing = Math.max(0, FREE_SHIPPING - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md glass-strong border-l border-border p-0 flex flex-col gap-0 [&>button]:hidden"
      >
        <SheetHeader className="flex-row items-center justify-between px-6 py-5 border-b border-border space-y-0">
          <SheetTitle className="mono text-[10px] uppercase tracking-[0.25em] font-normal text-foreground">
            Carrito · {lines.length}
          </SheetTitle>
          <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <p className="mono text-[10px] uppercase text-muted-foreground mb-6">El carrito está vacío</p>
            <button onClick={() => setOpen(false)} className="mono text-[10px] uppercase tracking-[0.2em] px-5 py-3 glass glass-hover">
              Explorar catálogo
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto divide-y divide-border">
              {lines.map((l) => (
                <div key={`${l.id}-${l.talla}`} className="flex gap-4 px-6 py-5">
                  <div className="glass w-20 h-20 shrink-0 overflow-hidden">
                    <img src={l.product.image} alt={l.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <p className="mono text-[9px] uppercase text-muted-foreground">{l.product.brand}</p>
                      <h3 className="font-display text-sm font-light text-foreground truncate">{l.product.name}</h3>
                      <p className="mono text-[9px] uppercase text-muted-foreground mt-0.5">US {l.talla}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-border">
                        <button onClick={() => cart.setQty(l.id, l.talla, l.cantidad - 1)} className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="mono text-[10px] w-6 text-center">{l.cantidad}</span>
                        <button onClick={() => cart.setQty(l.id, l.talla, l.cantidad + 1)} className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="mono text-xs">{formatPrice(l.product.price * l.cantidad)}</span>
                    </div>
                  </div>
                  <button onClick={() => cart.remove(l.id, l.talla)} className="self-start text-muted-foreground/60 hover:text-foreground">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-border px-6 py-5 space-y-4">
              <div>
                <p className="mono text-[9px] uppercase mb-2 text-foreground/80">
                  {missing > 0
                    ? <>Faltan <span className="text-foreground">{formatPrice(missing)}</span> para envío gratis</>
                    : "✓ Envío gratis incluido"}
                </p>
                <div className="w-full bg-muted h-[2px]">
                  <div className="h-full bg-foreground transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="mono text-[10px] uppercase text-muted-foreground">Subtotal</span>
                <span className="font-display text-2xl font-light">{formatPrice(subtotal)}</span>
              </div>

              <button className="w-full py-4 mono text-[10px] uppercase tracking-[0.25em] bg-foreground text-background hover:bg-foreground/90 transition-colors">
                Ir al checkout
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
