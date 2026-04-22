"use client";

import { useState, useEffect, useCallback } from "react";

interface CombatData {
  id: string;
  sexe: string;
  categorie_poids: string;
  niveau: string;
  discipline: string;
  statut: string;
  boxeur1?: { nom: string; prenom: string; club?: string };
  boxeur2?: { nom: string; prenom: string; club?: string } | null;
}

const LABELS: Record<string, string> = {
  HOMME: "Homme",
  FEMME: "Femme",
  DEBUTANT: "Débutant",
  INTERMEDIAIRE: "Intermédiaire",
  BOXE_ANGLAISE: "Boxe Anglaise",
  BOXE_PIEDS_POINGS: "Pieds-Poings",
  EN_ATTENTE: "En attente",
  CONFIRME: "Confirmé",
};

export default function CombatsPage() {
  const [combats, setCombats] = useState<CombatData[]>([]);
  const [stats, setStats] = useState({ total: 0, confirmes: 0, enAttente: 0 });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ sexe: "", niveau: "", discipline: "", poids: "" });

  const fetchCombats = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.sexe) params.set("sexe", filters.sexe);
    if (filters.niveau) params.set("niveau", filters.niveau);
    if (filters.discipline) params.set("discipline", filters.discipline);
    if (filters.poids) params.set("poids", filters.poids);

    try {
      const res = await fetch(`/api/combats?${params}`);
      const data = await res.json();
      setCombats(data.combats || []);
      setStats(data.stats || { total: 0, confirmes: 0, enAttente: 0 });
    } catch (err) {
      console.error("Erreur:", err);
    }
    setLoading(false);
  }, [filters]);

  useEffect(() => { fetchCombats(); }, [fetchCombats]);

  const exportCSV = () => {
    const header = "Boxeur 1,Club 1,Boxeur 2,Club 2,Catégorie,Niveau,Discipline,Statut\n";
    const rows = combats.map((c) => {
      const b1 = c.boxeur1 ? `${c.boxeur1.prenom} ${c.boxeur1.nom}` : "";
      const c1 = c.boxeur1?.club || "";
      const b2 = c.boxeur2 ? `${c.boxeur2.prenom} ${c.boxeur2.nom}` : "EN ATTENTE";
      const c2 = c.boxeur2?.club || "";
      return `${b1},${c1},${b2},${c2},${c.categorie_poids} kg,${LABELS[c.niveau] || c.niveau},${LABELS[c.discipline] || c.discipline},${LABELS[c.statut] || c.statut}`;
    }).join("\n");

    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `combats_fight_event_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="combats-page">
      <div className="container">
        {/* Header */}
        <div className="combats-header">
          <div>
            <a href="/" style={{ color: "var(--red)", fontSize: "0.875rem", marginBottom: "0.5rem", display: "inline-block" }}>
              ← Retour à l&apos;accueil
            </a>
            <h1 className="heading-lg">Tableau des Combats</h1>
          </div>
          <button className="btn btn-outline" onClick={exportCSV} disabled={combats.length === 0}>
            📁 Exporter CSV
          </button>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Combats Total</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: "#22c55e" }}>{stats.confirmes}</div>
            <div className="stat-label">Confirmés</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: "var(--gold)" }}>{stats.enAttente}</div>
            <div className="stat-label">En Attente</div>
          </div>
        </div>

        {/* Filters */}
        <div className="combats-filters">
          <select className="form-select" value={filters.sexe}
            onChange={(e) => setFilters((f) => ({ ...f, sexe: e.target.value }))}>
            <option value="">Tous les sexes</option>
            <option value="HOMME">Homme</option>
            <option value="FEMME">Femme</option>
          </select>
          <select className="form-select" value={filters.niveau}
            onChange={(e) => setFilters((f) => ({ ...f, niveau: e.target.value }))}>
            <option value="">Tous les niveaux</option>
            <option value="DEBUTANT">Débutant</option>
            <option value="INTERMEDIAIRE">Intermédiaire</option>
          </select>
          <select className="form-select" value={filters.discipline}
            onChange={(e) => setFilters((f) => ({ ...f, discipline: e.target.value }))}>
            <option value="">Toutes disciplines</option>
            <option value="BOXE_ANGLAISE">Boxe Anglaise</option>
            <option value="BOXE_PIEDS_POINGS">Pieds-Poings</option>
          </select>
          <select className="form-select" value={filters.poids}
            onChange={(e) => setFilters((f) => ({ ...f, poids: e.target.value }))}>
            <option value="">Tous les poids</option>
            {["-60", "-65", "-70", "-75", "-80", "-85", "-90", "+90"].map((p) => (
              <option key={p} value={p}>{p} kg</option>
            ))}
          </select>
        </div>

        {/* Table */}
        {loading ? (
          <p style={{ textAlign: "center", color: "var(--text-muted)", padding: "3rem" }}>Chargement...</p>
        ) : combats.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
            <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>🥊</p>
            <p style={{ color: "var(--text-muted)" }}>Aucun combat pour le moment. Les combats apparaîtront ici dès que des boxeurs s&apos;inscriront.</p>
          </div>
        ) : (
          <div className="combats-table-wrapper">
            <table className="combats-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Boxeur 1</th>
                  <th>Boxeur 2</th>
                  <th>Catégorie</th>
                  <th>Niveau</th>
                  <th>Discipline</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {combats.map((c, i) => (
                  <tr key={c.id}>
                    <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                    <td>
                      <strong style={{ color: "var(--text-primary)" }}>
                        {c.boxeur1 ? `${c.boxeur1.prenom} ${c.boxeur1.nom}` : "—"}
                      </strong>
                      {c.boxeur1?.club && <br />}
                      {c.boxeur1?.club && <span className="text-small">{c.boxeur1.club}</span>}
                    </td>
                    <td>
                      {c.boxeur2 ? (
                        <>
                          <strong style={{ color: "var(--text-primary)" }}>
                            {c.boxeur2.prenom} {c.boxeur2.nom}
                          </strong>
                          {c.boxeur2?.club && <br />}
                          {c.boxeur2?.club && <span className="text-small">{c.boxeur2.club}</span>}
                        </>
                      ) : (
                        <span style={{ color: "var(--gold)", fontStyle: "italic" }}>En attente...</span>
                      )}
                    </td>
                    <td>{c.categorie_poids} kg</td>
                    <td>{LABELS[c.niveau] || c.niveau}</td>
                    <td>{LABELS[c.discipline] || c.discipline}</td>
                    <td>
                      <span className={`status-badge ${c.statut === "CONFIRME" ? "status-confirmed" : "status-waiting"}`}>
                        {c.statut === "CONFIRME" ? "● " : "○ "}
                        {LABELS[c.statut] || c.statut}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
