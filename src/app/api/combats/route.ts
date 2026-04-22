import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sexe = searchParams.get('sexe');
    const niveau = searchParams.get('niveau');
    const discipline = searchParams.get('discipline');
    const poids = searchParams.get('poids');

    let query = supabase
      .from('combats')
      .select('*, boxeur1:participants!combats_boxeur1_id_fkey(*), boxeur2:participants!combats_boxeur2_id_fkey(*)')
      .order('created_at', { ascending: false });

    // Filtres optionnels
    if (sexe) query = query.eq('sexe', sexe);
    if (niveau) query = query.eq('niveau', niveau);
    if (discipline) query = query.eq('discipline', discipline);
    if (poids) query = query.eq('categorie_poids', poids);

    const { data: combats, error } = await query;

    if (error) {
      console.error('Erreur récupération combats:', error);
      return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
    }

    // Statistiques
    const total = combats?.length || 0;
    const confirmes = combats?.filter(c => c.statut === 'CONFIRME').length || 0;
    const enAttente = combats?.filter(c => c.statut === 'EN_ATTENTE').length || 0;

    return NextResponse.json({
      combats: combats || [],
      stats: { total, confirmes, enAttente },
    });
  } catch (error) {
    console.error('Erreur API combats:', error);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
