"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin/inscriptions");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Erreur de connexion");
      }
    } catch (err) {
      setError("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <div className="card" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="section-label" style={{ justifyContent: "center", marginBottom: "2rem" }}>Accès Restreint</div>
        <h1 className="heading-md" style={{ textAlign: "center", marginBottom: "2rem" }}>Admin Panel</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            {error && <p className="form-error" style={{ marginTop: "0.5rem" }}>{error}</p>}
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={loading} style={{ marginTop: "1.5rem" }}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
