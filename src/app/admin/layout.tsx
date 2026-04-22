"use client";

import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  // Ne pas afficher la sidebar sur la page de login
  if (pathname === "/admin/login") {
    return <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>{children}</div>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-primary)" }}>
      {/* Sidebar */}
      <aside style={{ width: "250px", background: "var(--bg-secondary)", borderRight: "1px solid var(--border)", padding: "2rem 1rem", display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--red)", marginBottom: "3rem", textAlign: "center", letterSpacing: "0.1em" }}>
          ADMIN PANEL
        </div>
        
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
          <a href="/admin/inscriptions" className={`btn ${pathname.includes("/inscriptions") ? "btn-primary" : "btn-outline"}`} style={{ justifyContent: "flex-start" }}>
            👤 Inscriptions
          </a>
          <a href="/admin/combats" className={`btn ${pathname.includes("/combats") ? "btn-primary" : "btn-outline"}`} style={{ justifyContent: "flex-start" }}>
            🥊 Combats
          </a>
          <a href="/" target="_blank" className="btn btn-outline" style={{ justifyContent: "flex-start", marginTop: "1rem" }}>
            🌐 Voir le site
          </a>
        </nav>

        <button onClick={handleLogout} className="btn btn-outline" style={{ borderColor: "var(--red)", color: "var(--red)", marginTop: "auto" }}>
          Déconnexion
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto", background: "var(--bg-primary)" }}>
        {children}
      </main>
    </div>
  );
}
