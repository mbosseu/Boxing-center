import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase env manquantes");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

/* ===== TYPES ===== */

export type Sexe = 'HOMME' | 'FEMME';
export type Niveau = 'DEBUTANT' | 'INTERMEDIAIRE';
export type Discipline = 'BOXE_ANGLAISE' | 'BOXE_PIEDS_POINGS';
export type CategoriePoids = '-60' | '-65' | '-70' | '-75' | '-80' | '-85' | '-90' | '+90';
export type StatutCombat = 'EN_ATTENTE' | 'CONFIRME';

export interface Participant {
  id?: string;
  nom: string;
  prenom: string;
  date_naissance: string;
  sexe: Sexe;
  niveau: Niveau;
  discipline: Discipline;
  licencie: boolean;
  numero_licence?: string;
  engagement_licence: boolean;
  club?: string;
  categorie_poids: CategoriePoids;
  justificatif_url: string;
  created_at?: string;
}

export interface Combat {
  id?: string;
  boxeur1_id: string;
  boxeur2_id: string | null;
  sexe: Sexe;
  categorie_poids: CategoriePoids;
  niveau: Niveau;
  discipline: Discipline;
  statut: StatutCombat;
  created_at?: string;
  // Joined
  boxeur1?: Participant;
  boxeur2?: Participant;
}
