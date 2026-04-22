"use client";

import { useState, useEffect } from "react";
import { Participant, Combat } from "@/lib/supabase";

export default function AdminCombatsPage() {
  const [combats, setCombats] = useState<Combat[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [resCombats, resParts] = await Promise.all([
          fetch("/api/combats"),
          fetch("/api/admin/participants")
        ]);
        const dataCombats = await resCombats.json();
        const dataParts = await resParts.json();
        setCombats(dataCombats.combats || []);
        setParticipants(dataParts.participants || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleUpdateCombat = async (id: string, statut: string, boxeur2_id: string | null) => {
    if (!confirm("Confirmer la modification ?")) return;
    try {
      const res = await fetch(`/api/admin/combats/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statut, boxeur2_id: boxeur2_id || "" }),
      });
      if (res.ok) {
        alert("Combat mis à jour !");
        window.location.reload();
      } else {
        alert("Erreur lors de la mise à jour");
      }
    } catch (err) {
      alert("Erreur serveur");
    }
  };

  return (
    <div>
      <h1 className="heading-md" style={{ marginBottom: "2rem" }}>🥊 Gestion des Combats</h1>

      <div className="card" style={{ padding: "0" }}>
        <div className="combats-table-wrapper" style={{ border: "none" }}>
          <table className="combats-table">
            <thead>
              <tr>
                <th>Critères</th>
                <th>Boxeur 1</th>
                <th>Boxeur 2 (Modifier)</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} style={{ textAlign: "center" }}>Chargement...</td></tr>
              ) : combats.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: "center" }}>Aucun combat.</td></tr>
              ) : (
                combats.map((c) => {
                  const b1 = c.boxeur1;
                  const b2 = c.boxeur2;
                  
                  // Trouver les participants compatibles pour ce combat
                  const compatibles = participants.filter(
                    (p) => p.sexe === c.sexe && p.categorie_poids === c.categorie_poids && p.niveau === c.niveau && p.discipline === c.discipline && p.id !== b1?.id
                  );

                  return (
                    <tr key={c.id}>
                      <td className="text-small">
                        {c.sexe} • {c.categorie_poids}kg<br/>{c.niveau} • {c.discipline}
                      </td>
                      <td>
                        <strong style={{ color: "var(--text-primary)" }}>{b1?.prenom} {b1?.nom}</strong><br/>
                        <span className="text-small">{b1?.club || "Pas de club"}</span>
                      </td>
                      <td>
                        <select 
                          className="form-select" 
                          style={{ padding: "0.25rem", fontSize: "0.8rem", width: "100%", maxWidth: "200px" }}
                          defaultValue={b2?.id || ""}
                          id={`select-${c.id}`}
                        >
                          <option value="">-- Aucun (En attente) --</option>
                          {compatibles.map((p) => (
                            <option key={p.id} value={p.id}>{p.prenom} {p.nom} ({p.club || "Sans club"})</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select 
                          className="form-select" 
                          style={{ padding: "0.25rem", fontSize: "0.8rem" }}
                          defaultValue={c.statut}
                          id={`statut-${c.id}`}
                        >
                          <option value="EN_ATTENTE">En attente</option>
                          <option value="CONFIRME">Confirmé</option>
                          <option value="ANNULE">Annulé</option>
                        </select>
                      </td>
                      <td>
                        <button 
                          className="btn btn-outline" 
                          style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}
                          onClick={() => {
                            const newB2 = (document.getElementById(`select-${c.id}`) as HTMLSelectElement).value;
                            const newStatut = (document.getElementById(`statut-${c.id}`) as HTMLSelectElement).value;
                            handleUpdateCombat(c.id!, newStatut, newB2);
                          }}
                        >
                          Sauver
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
