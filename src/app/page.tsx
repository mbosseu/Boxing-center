"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import Image from "next/image";

/* ===== CONSTANTS ===== */
const NIVEAUX = [
  { value: "DEBUTANT", label: "Débutant" },
  { value: "INTERMEDIAIRE", label: "Intermédiaire" },
];

const DISCIPLINES = [
  { value: "BOXE_ANGLAISE", label: "Boxe Anglaise" },
  { value: "BOXE_PIEDS_POINGS", label: "Boxe Pieds-Poings" },
];

const POIDS = [
  { value: "-60", label: "-60 kg" },
  { value: "-65", label: "-65 kg" },
  { value: "-70", label: "-70 kg" },
  { value: "-75", label: "-75 kg" },
  { value: "-80", label: "-80 kg" },
  { value: "-85", label: "-85 kg" },
  { value: "-90", label: "-90 kg" },
  { value: "+90", label: "+90 kg" },
];

const BILLETTERIE_URL = "https://www.chateaudelagarrigue.com"; // À remplacer par l'URL réelle

/* ===== MAIN PAGE ===== */
export default function Home() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav className={`navbar ${navScrolled ? "scrolled" : ""}`}>
        <div className="navbar-inner">
          <a href="#" className="navbar-brand">FIGHT EVENT V</a>
          <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
            <li><a href="#evenement" onClick={() => setMenuOpen(false)}>Événement</a></li>
            <li><a href="#trophy" onClick={() => setMenuOpen(false)}>Boxing Trophy</a></li>
            <li><a href="#inscription" onClick={() => setMenuOpen(false)}>Inscription</a></li>
            <li><a href="/combats" onClick={() => setMenuOpen(false)}>Combats</a></li>
          </ul>
          <button className="navbar-burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* SECTION 1 — HERO */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <Image src="/images/hero.png" alt="Fight Event V" fill style={{ objectFit: "cover" }} priority />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <p className="hero-subtitle">Festival du Fight</p>
          <h1 className="hero-title">FIGHT EVENT</h1>
          <p className="hero-edition">V</p>
          <p className="hero-date">📍 Château de la Garrigue — 2026</p>
          <div className="hero-cta">
            <a href="#inscription" className="btn btn-primary btn-lg pulse">
              🥊 S&apos;inscrire au Boxing Trophy
            </a>
            <a href="#evenement" className="btn btn-outline btn-lg">Découvrir</a>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      {/* SECTION 2 — ÉVÉNEMENT */}
      <section className="section event-section" id="evenement">
        <div className="container">
          <div className="fade-up">
            <div className="section-label">L&apos;événement</div>
            <h2 className="heading-lg">Le Festival du Fight</h2>
            <p className="text-body" style={{ maxWidth: 700, marginTop: "1rem" }}>
              Bien plus qu&apos;une simple soirée de boxe, le <strong style={{ color: "#fff" }}>FIGHT EVENT V</strong> est
              un véritable festival dédié aux sports de combat. Une expérience immersive mêlant combats de haut niveau,
              animations, stands partenaires et ambiance électrique.
            </p>
          </div>

          <div className="event-features fade-up">
            <div className="event-feature">
              <div className="event-feature-icon">🥊</div>
              <div className="event-feature-title">Combats</div>
            </div>
            <div className="event-feature">
              <div className="event-feature-icon">🎪</div>
              <div className="event-feature-title">Animations</div>
            </div>
            <div className="event-feature">
              <div className="event-feature-icon">🏪</div>
              <div className="event-feature-title">Stands Partenaires</div>
            </div>
            <div className="event-feature">
              <div className="event-feature-icon">🎶</div>
              <div className="event-feature-title">Programmation</div>
            </div>
            <div className="event-feature">
              <div className="event-feature-icon">🏆</div>
              <div className="event-feature-title">Boxing Trophy</div>
            </div>
          </div>

          <div className="gallery-grid fade-up" style={{ marginTop: "3rem" }}>
            <div className="gallery-item">
              <Image src="/images/event.png" alt="Fight Event ambiance" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="gallery-item">
              <Image src="/images/action.png" alt="Combat de boxe" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="gallery-item">
              <Image src="/images/hero.png" alt="Ring de boxe" fill style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — BOXING TROPHY */}
      <section className="section" id="trophy" style={{ background: "var(--bg-primary)" }}>
        <div className="container">
          <div className="fade-up">
            <div className="section-label">Le concept</div>
            <h2 className="heading-lg">Boxing Trophy</h2>
            <p className="text-body" style={{ maxWidth: 700, marginTop: "1rem" }}>
              Le <strong style={{ color: "var(--gold)" }}>Boxing Trophy</strong> offre aux boxeurs loisirs une
              expérience unique : monter sur un ring professionnel, sous les projecteurs, avec un encadrement de qualité.
              Des conditions proches du professionnel pour une expérience inoubliable.
            </p>
          </div>

          <div className="advantages-grid fade-up">
            <div className="advantage-card">
              <div className="advantage-icon">🥊</div>
              <h3 className="advantage-title">Accès au Ring</h3>
              <p className="advantage-text">
                Montez sur un ring professionnel devant un public passionné.
                Vivez l&apos;adrénaline d&apos;un vrai combat.
              </p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">🎯</div>
              <h3 className="advantage-title">Encadrement Expert</h3>
              <p className="advantage-text">
                Arbitrage officiel, staff médical, coaching.
                Votre sécurité et votre expérience sont notre priorité.
              </p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">💡</div>
              <h3 className="advantage-title">Mise en Lumière</h3>
              <p className="advantage-text">
                Entrée personnalisée, annonce au micro, éclairage scénique.
                Vous êtes la star de la soirée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — FORMULAIRE D'INSCRIPTION */}
      <section className="section registration-section" id="inscription">
        <div className="container">
          <div className="fade-up" style={{ textAlign: "center" }}>
            <div className="section-label" style={{ justifyContent: "center" }}>Inscription</div>
            <h2 className="heading-lg">Rejoignez le Boxing Trophy</h2>
            <p className="text-body" style={{ maxWidth: 600, margin: "1rem auto 0" }}>
              L&apos;inscription est <strong style={{ color: "#fff" }}>gratuite</strong> mais nécessite l&apos;achat de{" "}
              <strong style={{ color: "var(--gold)" }}>2 places minimum</strong> pour l&apos;événement.
            </p>
          </div>
          <RegistrationForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-brand">FIGHT EVENT V</div>
          <p className="footer-text">Festival du Fight — Château de la Garrigue — 2026</p>
          <div className="footer-links">
            <a href="#evenement">Événement</a>
            <a href="#trophy">Boxing Trophy</a>
            <a href="#inscription">Inscription</a>
            <a href="/combats">Combats</a>
          </div>
          <p className="footer-text" style={{ marginTop: "1.5rem" }}>
            © 2026 Fight Event. Tous droits réservés. | Conformité RGPD
          </p>
        </div>
      </footer>
    </>
  );
}

/* ===== REGISTRATION FORM COMPONENT ===== */
function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; matched: boolean; opponent?: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form data
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    date_naissance: "",
    sexe: "",
    niveau: "",
    discipline: "",
    licencie: "",
    numero_licence: "",
    engagement_licence: false,
    club: "",
    categorie_poids: "",
    justificatif_url: "",
  });

  const [uploadedFile, setUploadedFile] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateField = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  /* Validation */
  const validateStep = (s: number): boolean => {
    const errs: Record<string, string> = {};

    if (s === 1) {
      if (!form.nom.trim()) errs.nom = "Le nom est obligatoire";
      if (!form.prenom.trim()) errs.prenom = "Le prénom est obligatoire";
      if (!form.date_naissance) errs.date_naissance = "La date de naissance est obligatoire";
      if (!form.sexe) errs.sexe = "Le sexe est obligatoire";
    }

    if (s === 2) {
      if (!form.niveau) errs.niveau = "Le niveau est obligatoire";
      if (!form.discipline) errs.discipline = "La discipline est obligatoire";
      if (!form.categorie_poids) errs.categorie_poids = "La catégorie de poids est obligatoire";
      if (form.licencie === "") errs.licencie = "Ce champ est obligatoire";
      if (form.licencie === "oui" && !form.numero_licence.trim()) {
        errs.numero_licence = "Le numéro de licence est obligatoire";
      }
      if (form.licencie === "non" && !form.engagement_licence) {
        errs.engagement_licence = "Vous devez accepter cet engagement";
      }
    }

    if (s === 3) {
      if (!form.justificatif_url) errs.justificatif_url = "Le justificatif d'achat est obligatoire";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  /* Upload */
  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        updateField("justificatif_url", data.url);
        setUploadedFile(data.fileName);
      } else {
        setErrors((prev) => ({ ...prev, justificatif_url: data.error }));
      }
    } catch {
      setErrors((prev) => ({ ...prev, justificatif_url: "Erreur lors de l'upload" }));
    }
    setUploading(false);
  };

  /* Submit */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    setSubmitting(true);

    try {
      const payload = {
        ...form,
        licencie: form.licencie === "oui",
      };

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setResult({
          success: true,
          matched: data.matching.matched,
          opponent: data.matching.opponent,
        });
        setStep(4);
      } else {
        setErrors({ submit: data.error });
      }
    } catch {
      setErrors({ submit: "Erreur lors de l'inscription" });
    }
    setSubmitting(false);
  };

  /* Drop zone */
  const [dragOver, setDragOver] = useState(false);

  if (step === 4 && result) {
    return (
      <div className="form-card">
        <div className="success-message">
          <div className="success-icon">🥊</div>
          <h3 className="success-title">Inscription Réussie !</h3>
          <p className="success-text">
            Merci <strong>{form.prenom}</strong>, votre inscription au Boxing Trophy a bien été enregistrée.
          </p>
          {result.matched ? (
            <div className="success-match">
              <p>
                ✅ <strong>Match trouvé !</strong> Vous affronterez{" "}
                <strong style={{ color: "var(--gold)" }}>{result.opponent}</strong>
              </p>
            </div>
          ) : (
            <div className="success-waiting">
              <p>
                ⏳ <strong>En attente d&apos;un adversaire</strong> — Vous serez matché dès qu&apos;un profil compatible
                s&apos;inscrira.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="form-card">
      {/* Progress bar */}
      <div className="progress-bar">
        {[1, 2, 3].map((s) => (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div className={`progress-step ${step === s ? "active" : ""} ${step > s ? "completed" : ""}`}>
              {step > s ? "✓" : s}
            </div>
            {s < 3 && <div className={`progress-line ${step > s ? "completed" : step === s + 1 ? "active" : ""}`} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* STEP 1 — IDENTITÉ */}
        <div className={`form-step ${step === 1 ? "active" : ""}`}>
          <h3 className="form-step-title">👤 Identité</h3>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="nom">Nom *</label>
              <input id="nom" className="form-input" placeholder="Votre nom" value={form.nom}
                onChange={(e) => updateField("nom", e.target.value)} />
              {errors.nom && <p className="form-error">{errors.nom}</p>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="prenom">Prénom *</label>
              <input id="prenom" className="form-input" placeholder="Votre prénom" value={form.prenom}
                onChange={(e) => updateField("prenom", e.target.value)} />
              {errors.prenom && <p className="form-error">{errors.prenom}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="date_naissance">Date de naissance *</label>
              <input id="date_naissance" type="date" className="form-input" value={form.date_naissance}
                onChange={(e) => updateField("date_naissance", e.target.value)} />
              {errors.date_naissance && <p className="form-error">{errors.date_naissance}</p>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="sexe">Sexe *</label>
              <select id="sexe" className="form-select" value={form.sexe}
                onChange={(e) => updateField("sexe", e.target.value)}>
                <option value="">Sélectionner</option>
                <option value="HOMME">Homme</option>
                <option value="FEMME">Femme</option>
              </select>
              {errors.sexe && <p className="form-error">{errors.sexe}</p>}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-primary btn-block" onClick={nextStep}>
              Suivant →
            </button>
          </div>
        </div>

        {/* STEP 2 — PROFIL SPORTIF */}
        <div className={`form-step ${step === 2 ? "active" : ""}`}>
          <h3 className="form-step-title">🥊 Profil Sportif</h3>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="niveau">Niveau *</label>
              <select id="niveau" className="form-select" value={form.niveau}
                onChange={(e) => updateField("niveau", e.target.value)}>
                <option value="">Sélectionner</option>
                {NIVEAUX.map((n) => <option key={n.value} value={n.value}>{n.label}</option>)}
              </select>
              {errors.niveau && <p className="form-error">{errors.niveau}</p>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="discipline">Discipline *</label>
              <select id="discipline" className="form-select" value={form.discipline}
                onChange={(e) => updateField("discipline", e.target.value)}>
                <option value="">Sélectionner</option>
                {DISCIPLINES.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
              {errors.discipline && <p className="form-error">{errors.discipline}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="categorie_poids">Catégorie de poids *</label>
              <select id="categorie_poids" className="form-select" value={form.categorie_poids}
                onChange={(e) => updateField("categorie_poids", e.target.value)}>
                <option value="">Sélectionner</option>
                {POIDS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
              {errors.categorie_poids && <p className="form-error">{errors.categorie_poids}</p>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="club">Club d&apos;entraînement</label>
              <input id="club" className="form-input" placeholder="Nom du club (optionnel)" value={form.club}
                onChange={(e) => updateField("club", e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Licence FFB / FFKMDA *</label>
            <div style={{ display: "flex", gap: "1rem" }}>
              <label className="checkbox-wrapper">
                <input type="radio" name="licencie" value="oui" checked={form.licencie === "oui"}
                  onChange={() => updateField("licencie", "oui")} style={{ accentColor: "var(--red)" }} />
                <span className="checkbox-label">Oui, je suis licencié(e)</span>
              </label>
              <label className="checkbox-wrapper">
                <input type="radio" name="licencie" value="non" checked={form.licencie === "non"}
                  onChange={() => updateField("licencie", "non")} style={{ accentColor: "var(--red)" }} />
                <span className="checkbox-label">Non</span>
              </label>
            </div>
            {errors.licencie && <p className="form-error">{errors.licencie}</p>}
          </div>

          {form.licencie === "oui" && (
            <div className="form-group">
              <label className="form-label" htmlFor="numero_licence">Numéro de licence *</label>
              <input id="numero_licence" className="form-input" placeholder="Votre numéro de licence"
                value={form.numero_licence} onChange={(e) => updateField("numero_licence", e.target.value)} />
              {errors.numero_licence && <p className="form-error">{errors.numero_licence}</p>}
            </div>
          )}

          {form.licencie === "non" && (
            <div className="form-group">
              <label className="checkbox-wrapper">
                <input type="checkbox" checked={form.engagement_licence}
                  onChange={(e) => updateField("engagement_licence", e.target.checked)} />
                <span className="checkbox-label">
                  Je m&apos;engage à effectuer toutes les démarches nécessaires afin d&apos;être en possession d&apos;une
                  licence de boxe éducative/loisirs valide au plus tard le 01/06/2026 et à fournir l&apos;attestation aux
                  organisateurs.
                </span>
              </label>
              {errors.engagement_licence && <p className="form-error">{errors.engagement_licence}</p>}
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={prevStep}>← Retour</button>
            <button type="button" className="btn btn-primary" onClick={nextStep}>Suivant →</button>
          </div>
        </div>

        {/* STEP 3 — BILLETTERIE + UPLOAD */}
        <div className={`form-step ${step === 3 ? "active" : ""}`}>
          <h3 className="form-step-title">🎟️ Billetterie & Validation</h3>

          <div className="billetterie-box">
            <p>
              L&apos;inscription est <strong>gratuite</strong> mais nécessite l&apos;achat de{" "}
              <strong style={{ color: "var(--gold)" }}>2 places minimum</strong> pour l&apos;événement. Merci de fournir
              votre justificatif.
            </p>
            <a href={BILLETTERIE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
              🎟️ Acheter mes places (minimum 2)
            </a>
          </div>

          <div className="form-group">
            <label className="form-label">Justificatif d&apos;achat * (PDF, JPG ou PNG — max 5 MB)</label>
            <div
              className={`upload-zone ${dragOver ? "dragover" : ""} ${uploadedFile ? "has-file" : ""}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const file = e.dataTransfer.files[0];
                if (file) handleUpload(file);
              }}
            >
              <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: "none" }}
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }} />
              {uploading ? (
                <p className="upload-text">⏳ Upload en cours...</p>
              ) : uploadedFile ? (
                <>
                  <div className="upload-icon">✅</div>
                  <p className="upload-filename">{uploadedFile}</p>
                  <p className="upload-text">Cliquez pour remplacer</p>
                </>
              ) : (
                <>
                  <div className="upload-icon">📎</div>
                  <p className="upload-text">
                    <strong>Cliquez</strong> ou glissez votre fichier ici
                  </p>
                </>
              )}
            </div>
            {errors.justificatif_url && <p className="form-error">{errors.justificatif_url}</p>}
          </div>

          <div className="form-group">
            <label className="checkbox-wrapper">
              <input type="checkbox" required />
              <span className="checkbox-label">
                J&apos;accepte que mes données soient traitées dans le cadre de l&apos;organisation du Boxing Trophy
                (conformité RGPD).
              </span>
            </label>
          </div>

          {errors.submit && (
            <p className="form-error" style={{ textAlign: "center", marginBottom: "1rem" }}>
              {errors.submit}
            </p>
          )}

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={prevStep}>← Retour</button>
            <button type="submit" className="btn btn-primary pulse" disabled={submitting}>
              {submitting ? "Inscription..." : "🥊 Valider mon inscription"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
