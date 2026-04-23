import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123456');

export async function GET(request: NextRequest) {
  try {
    // Sécurisation basique du cron (Vercel ou manuel)
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Récupérer les combats
    const { data: combats, error } = await supabase
      .from('combats')
      .select('*, boxeur1:participants!boxeur1_id(*), boxeur2:participants!boxeur2_id(*)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur récupération combats cron:', error);
      return NextResponse.json({ error: 'Erreur BDD' }, { status: 500 });
    }

    // Générer le tableau HTML
    let htmlContent = `
      <h1>Rapport Quotidien des Combats - FIGHT EVENT V</h1>
      <p>Voici l'état actuel des inscriptions et des matchs :</p>
      <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th>Statut</th>
            <th>Catégorie</th>
            <th>Niveau</th>
            <th>Discipline</th>
            <th>Boxeur 1</th>
            <th>Boxeur 2</th>
          </tr>
        </thead>
        <tbody>
    `;

    if (combats && combats.length > 0) {
      combats.forEach(c => {
        const b1 = c.boxeur1 ? `${c.boxeur1.prenom} ${c.boxeur1.nom}` : '—';
        const b2 = c.boxeur2 ? `${c.boxeur2.prenom} ${c.boxeur2.nom}` : '<em>En attente</em>';
        const color = c.statut === 'CONFIRME' ? '#d4edda' : '#fff3cd';
        
        htmlContent += `
          <tr style="background-color: ${color};">
            <td>${c.statut}</td>
            <td>${c.categorie_poids} kg</td>
            <td>${c.niveau}</td>
            <td>${c.discipline}</td>
            <td>${b1}</td>
            <td>${b2}</td>
          </tr>
        `;
      });
    } else {
      htmlContent += `<tr><td colspan="6" style="text-align: center;">Aucun combat enregistré pour le moment.</td></tr>`;
    }

    htmlContent += `
        </tbody>
      </table>
      <p style="margin-top: 20px;"><em>Généré automatiquement par le système d'appariement.</em></p>
    `;

    // Envoyer l'email
    const emailTo = process.env.ADMIN_EMAIL || 'contact@fightevent5.fr';
    
    await resend.emails.send({
      from: 'Fight Event System <noreply@fightevent5.fr>',
      to: [emailTo],
      subject: `[FIGHT EVENT V] Rapport quotidien des combats - ${new Date().toLocaleDateString('fr-FR')}`,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, message: 'Email envoyé avec succès.' });
  } catch (error) {
    console.error('Erreur API cron send-daily:', error);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
