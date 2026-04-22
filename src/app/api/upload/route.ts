import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni.' }, { status: 400 });
    }

    // Validation type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Format non supporté. Utilisez PDF, JPG ou PNG.' }, { status: 400 });
    }

    // Validation taille
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'Le fichier ne doit pas dépasser 5 MB.' }, { status: 400 });
    }

    // Générer un nom unique
    const ext = file.name.split('.').pop();
    const fileName = `justificatif_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;

    // Upload vers Supabase Storage
    const buffer = Buffer.from(await file.arrayBuffer());
    const { data, error } = await supabase.storage
      .from('justificatifs')
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: '3600',
      });

    if (error) {
      console.error('Erreur upload:', error);
      return NextResponse.json({ error: 'Erreur lors de l\'upload.' }, { status: 500 });
    }

    // Obtenir l'URL publique
    const { data: urlData } = supabase.storage
      .from('justificatifs')
      .getPublicUrl(data.path);

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl,
      fileName: file.name,
    });
  } catch (error) {
    console.error('Erreur API upload:', error);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
