# FIGHT EVENT V — Setup Supabase

## 1. Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un compte et un nouveau projet
3. Notez l'**URL** et la **clé anon** (Settings > API)
4. Collez-les dans `.env.local`

## 2. Créer les tables

Allez dans **SQL Editor** sur Supabase et exécutez :

```sql
-- Table participants
CREATE TABLE participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  date_naissance DATE NOT NULL,
  sexe TEXT NOT NULL CHECK (sexe IN ('HOMME', 'FEMME')),
  niveau TEXT NOT NULL CHECK (niveau IN ('DEBUTANT', 'INTERMEDIAIRE')),
  discipline TEXT NOT NULL CHECK (discipline IN ('BOXE_ANGLAISE', 'BOXE_PIEDS_POINGS')),
  licencie BOOLEAN DEFAULT FALSE,
  numero_licence TEXT,
  engagement_licence BOOLEAN DEFAULT FALSE,
  club TEXT,
  categorie_poids TEXT NOT NULL CHECK (categorie_poids IN ('-60', '-65', '-70', '-75', '-80', '-85', '-90', '+90')),
  justificatif_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table combats
CREATE TABLE combats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  boxeur1_id UUID NOT NULL REFERENCES participants(id),
  boxeur2_id UUID REFERENCES participants(id),
  sexe TEXT NOT NULL,
  categorie_poids TEXT NOT NULL,
  niveau TEXT NOT NULL,
  discipline TEXT NOT NULL,
  statut TEXT NOT NULL DEFAULT 'EN_ATTENTE' CHECK (statut IN ('EN_ATTENTE', 'CONFIRME')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour le matching rapide
CREATE INDEX idx_combats_matching ON combats (statut, sexe, categorie_poids, niveau, discipline)
  WHERE statut = 'EN_ATTENTE' AND boxeur2_id IS NULL;
```

## 3. Créer le bucket de stockage

1. Allez dans **Storage** sur Supabase
2. Créez un bucket nommé `justificatifs`
3. Rendez-le **public** (ou configurez les policies selon vos besoins)

## 4. Lancer le projet

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:3000`
