import { supabase, Participant, Combat } from './supabase';

/**
 * Algorithme de matching automatisé.
 * Critères stricts : sexe + poids + niveau + discipline
 * 
 * 1. Cherche un combat EN_ATTENTE avec les mêmes critères
 * 2. Si trouvé → assigne le boxeur2 et confirme le combat
 * 3. Sinon → crée un nouveau combat en attente
 */
export async function matchParticipant(participant: Participant): Promise<{
  matched: boolean;
  combat: Combat | null;
  opponent?: Participant;
}> {
  // 1. Chercher un combat en attente avec critères compatibles
  const { data: waitingCombats, error: searchError } = await supabase
    .from('combats')
    .select('*, boxeur1:participants!boxeur1_id(*)')
    .eq('statut', 'EN_ATTENTE')
    .is('boxeur2_id', null)
    .eq('sexe', participant.sexe)
    .eq('categorie_poids', participant.categorie_poids)
    .eq('niveau', participant.niveau)
    .eq('discipline', participant.discipline)
    .neq('boxeur1_id', participant.id)
    .limit(1);

  if (searchError) {
    console.error('Erreur recherche matching:', searchError);
    return { matched: false, combat: null };
  }

  // 2. Match trouvé → confirmer le combat
  if (waitingCombats && waitingCombats.length > 0) {
    const combat = waitingCombats[0];

    const { data: updatedCombat, error: updateError } = await supabase
      .from('combats')
      .update({
        boxeur2_id: participant.id,
        statut: 'CONFIRME',
      })
      .eq('id', combat.id)
      .select('*, boxeur1:participants!boxeur1_id(*), boxeur2:participants!boxeur2_id(*)')
      .single();

    if (updateError) {
      console.error('Erreur mise à jour combat:', updateError);
      return { matched: false, combat: null };
    }

    return {
      matched: true,
      combat: updatedCombat,
      opponent: updatedCombat.boxeur1,
    };
  }

  // 3. Pas de match → créer un combat en attente
  const { data: newCombat, error: createError } = await supabase
    .from('combats')
    .insert({
      boxeur1_id: participant.id,
      boxeur2_id: null,
      sexe: participant.sexe,
      categorie_poids: participant.categorie_poids,
      niveau: participant.niveau,
      discipline: participant.discipline,
      statut: 'EN_ATTENTE',
    })
    .select()
    .single();

  if (createError) {
    console.error('Erreur création combat:', createError);
    return { matched: false, combat: null };
  }

  return { matched: false, combat: newCombat };
}
