const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Lire .env.local
const envFile = fs.readFileSync('.env.local', 'utf8');
const lines = envFile.split('\n');
let url = '';
let key = '';
for (const line of lines) {
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) url = line.split('=')[1].trim();
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) key = line.split('=')[1].trim();
}

const supabase = createClient(url, key);

async function checkDb() {
  console.log("--- PARTICIPANTS ---");
  const { data: pData, error: pErr } = await supabase.from('participants').select('*');
  if (pErr) console.error(pErr);
  else console.log(pData);

  console.log("\n--- COMBATS ---");
  const { data: cData, error: cErr } = await supabase.from('combats').select('*');
  if (cErr) console.error(cErr);
  else console.log(cData);
}

checkDb();
