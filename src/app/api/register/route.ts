import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { matchParticipant } from '@/lib/matching';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation basique
    const required = ['nom', 'prenom', 'date_naissance', 'sexe', 'niveau', 'discipline', 'categorie_poids', 'justificatif_url'];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Le champ "${field}" est obligatoire.` }, { status: 400 });
      }
    }

    // Validation licence
    if (body.licencie && !body.numero_licence) {
      return NextResponse.json({ error: 'Le numéro de licence est obligatoire pour les licenciés.' }, { status: 400 });
    }
    if (!body.licencie && !body.engagement_licence) {
      return NextResponse.json({ error: "Vous devez vous engager à obtenir une licence." }, { status: 400 });
    }

    // Validation justificatif
    if (!body.justificatif_url) {
      return NextResponse.json({ error: 'Le justificatif d\'achat est obligatoire.' }, { status: 400 });
    }

    // Créer le participant
    const { data: participant, error: insertError } = await supabase
      .from('participants')
      .insert({
        nom: body.nom,
        prenom: body.prenom,
        date_naissance: body.date_naissance,
        sexe: body.sexe,
        niveau: body.niveau,
        discipline: body.discipline,
        licencie: body.licencie || false,
        numero_licence: body.numero_licence || null,
        engagement_licence: body.engagement_licence || false,
        club: body.club || null,
        categorie_poids: body.categorie_poids,
        justificatif_url: body.justificatif_url,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Erreur insertion participant:', insertError);
      return NextResponse.json({ error: 'Erreur lors de l\'inscription.' }, { status: 500 });
    }

    // Lancer le matching
    const matchResult = await matchParticipant(participant);

    return NextResponse.json({
      success: true,
      participant,
      matching: {
        matched: matchResult.matched,
        opponent: matchResult.opponent ? `${matchResult.opponent.prenom} ${matchResult.opponent.nom}` : null,
      },
    });
  } catch (error) {
    console.error('Erreur API register:', error);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
