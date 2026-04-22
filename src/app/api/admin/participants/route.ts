import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { data: participants, error } = await supabase
      .from('participants')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: 'Erreur lors de la récupération des inscriptions' }, { status: 500 });
    }

    return NextResponse.json({ participants: participants || [] });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
