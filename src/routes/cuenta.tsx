import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/cuenta")({
  head: () => ({
    meta: [
      { title: "Cuenta — SASSY SNKRS" },
      { name: "description", content: "Inicia sesión o crea tu cuenta para acceder a drops privados y seguir tus pedidos." },
    ],
  }),
  component: Cuenta,
});

function Cuenta() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <section className="flex-1 relative px-6 md:px-10 py-20 overflow-hidden">
        <div className="absolute inset-0 aurora pointer-events-none opacity-70" />
        <div className="absolute -top-32 -left-20 w-[460px] h-[460px] rounded-full bg-[radial-gradient(circle,rgba(90,70,140,0.25),transparent_70%)] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-20 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(40,60,90,0.28),transparent_70%)] blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: copy */}
          <div className="hidden lg:block">
            <p className="mono text-[10px] uppercase text-muted-foreground mb-4">Acceso privado</p>
            <h1 className="font-display text-5xl xl:text-6xl font-light tracking-tight leading-[1.05]">
              Tu archivo personal de
              <span className="italic font-extralight"> silueta y materia.</span>
            </h1>
            <ul className="mt-10 space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3"><span className="w-1 h-1 rounded-full bg-foreground/70 mt-2 shrink-0" /> Acceso anticipado a drops semanales.</li>
              <li className="flex items-start gap-3"><span className="w-1 h-1 rounded-full bg-foreground/70 mt-2 shrink-0" /> Historial de pedidos y guías de talla guardadas.</li>
              <li className="flex items-start gap-3"><span className="w-1 h-1 rounded-full bg-foreground/70 mt-2 shrink-0" /> Lista de deseos sincronizada entre dispositivos.</li>
            </ul>
          </div>

          {/* Right: form */}
          <div className="glass-strong p-8 md:p-10 w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="glass p-2"><User className="w-4 h-4" /></div>
              <div>
                <p className="mono text-[9px] uppercase text-muted-foreground">Mi cuenta</p>
                <h2 className="font-display text-xl font-light tracking-tight">
                  {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
                </h2>
              </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {mode === "register" && (
                <Field icon={<User className="w-3.5 h-3.5" />} type="text" placeholder="Nombre" />
              )}
              <Field icon={<Mail className="w-3.5 h-3.5" />} type="email" placeholder="Correo" />
              <Field icon={<Lock className="w-3.5 h-3.5" />} type="password" placeholder="Contraseña" />

              {mode === "login" && (
                <div className="flex justify-end">
                  <a href="#" className="mono text-[10px] uppercase text-muted-foreground hover:text-foreground transition-colors">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="w-full mono text-[10px] uppercase tracking-[0.2em] px-5 py-3 bg-foreground text-background hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2"
              >
                {mode === "login" ? "Entrar" : "Crear cuenta"} <ArrowRight className="w-3 h-3" />
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="mono text-[10px] uppercase text-muted-foreground">
                {mode === "login" ? "¿Eres nuevo?" : "¿Ya tienes cuenta?"}{" "}
                <button
                  onClick={() => setMode(mode === "login" ? "register" : "login")}
                  className="text-foreground hover:text-foreground/80 underline-offset-4 hover:underline"
                >
                  {mode === "login" ? "Crear cuenta" : "Iniciar sesión"}
                </button>
              </p>
              <Link to="/" className="mono text-[10px] uppercase text-muted-foreground hover:text-foreground inline-block mt-4">
                ← Seguir explorando
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Field({ icon, type, placeholder }: { icon: React.ReactNode; type: string; placeholder: string }) {
  return (
    <label className="glass flex items-center gap-3 px-4 py-3 focus-within:border-white/20 transition-colors">
      <span className="text-muted-foreground">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="mono text-[12px] bg-transparent outline-none w-full placeholder:text-muted-foreground/60 text-foreground"
      />
    </label>
  );
}
