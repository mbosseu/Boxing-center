import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { boxeur2_id, statut } = body;

    const { data: updatedCombat, error } = await supabase
      .from('combats')
      .update({
        boxeur2_id: boxeur2_id === "" ? null : boxeur2_id,
        statut: statut,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: "Erreur lors de la mise à jour du combat." }, { status: 500 });
    }

    return NextResponse.json({ success: true, combat: updatedCombat });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
