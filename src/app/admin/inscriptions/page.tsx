"use client";

import { useState, useEffect } from "react";
import { Participant } from "@/lib/supabase";

export default function AdminInscriptionsPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchParticipants() {
      try {
        const res = await fetch("/api/admin/participants");
        const data = await res.json();
        setParticipants(data.participants || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchParticipants();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 className="heading-md">👤 Liste des Inscriptions ({participants.length})</h1>
      </div>

      <div className="card" style={{ padding: "0" }}>
        <div className="combats-table-wrapper" style={{ border: "none", borderBottomLeftRadius: "var(--radius-md)", borderBottomRightRadius: "var(--radius-md)" }}>
          <table className="combats-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Nom Prénom</th>
                <th>Sexe</th>
                <th>Poids</th>
                <th>Niveau</th>
                <th>Discipline</th>
                <th>Club</th>
                <th>Preuve Achat</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} style={{ textAlign: "center" }}>Chargement...</td></tr>
              ) : participants.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign: "center" }}>Aucun inscrit.</td></tr>
              ) : (
                participants.map((p) => (
                  <tr key={p.id}>
                    <td>{new Date(p.created_at || "").toLocaleDateString("fr-FR")}</td>
                    <td><strong style={{ color: "var(--text-primary)" }}>{p.prenom} {p.nom}</strong></td>
                    <td>{p.sexe}</td>
                    <td>{p.categorie_poids} kg</td>
                    <td>{p.niveau}</td>
                    <td>{p.discipline}</td>
                    <td>{p.club || "—"}</td>
                    <td>
                      <a href={p.justificatif_url} target="_blank" rel="noopener noreferrer" style={{ color: "#22c55e", textDecoration: "underline" }}>
                        Voir PDF/Image
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
