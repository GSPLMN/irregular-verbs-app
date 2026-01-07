// ===== CARICAMENTO CSV (ROBUSTO) =====
async function loadCSV() {
  const response = await fetch('verbs.csv');
  const text = await response.text();

  const rows = text.split('\n').filter(r => r.trim() !== '');
  const headers = rows.shift().split(',').map(h => h.trim());

  return rows.map(row => {
    const values = row
      .match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)
      .map(v => v.replace(/^"|"$/g, '').trim());

    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = values[i] || '';
    });
    return obj;
  });
}

// ===== LISTA VERBI =====
function renderList(verbs) {
  const list = document.getElementById('list');
  list.innerHTML = '';

  verbs.forEach(verb => {
    const item = document.createElement('div');
    item.textContent = `${verbs['Base - PS - PP']} — ${verbs['Traduzione IT']}`;
    item.onclick = () => showDetail(verb);
    list.appendChild(item);
  });
}

// ===== DETTAGLIO VERBO =====
function showDetail(v) {
  document.getElementById('list').style.display = 'none';
  const detail = document.getElementById('detail');
  detail.style.display = 'block';

  // Base verb = prima parola prima del trattino
  const baseVerb = v['Base - PS - PP'].split('–')[0].trim().split(' ')[0];

  detail.innerHTML = `
    <h2>${v['Base - PS - PP']}</h2>

    <p><strong>Traduzione:</strong><br>
      ${v['Traduzione IT']}
    </p>

    <p><strong>Pronuncia (IPA):</strong><br>
      Base: ${v['Base IPA']}<br>
      PS: ${v['PS IPA']}<br>
      PP: ${v['PP IPA']}
    </p>

    <audio controls src="audio/${baseVerb}.mp3"></audio>

    <p><strong>Esempio (Past Simple):</strong><br>
      ${v['Esempio PS']}<br>
      <em>${v['Trad Esempio PS']}</em>
    </p>

    <p><strong>Esempio (Past Participle):</strong><br>
      ${v['Esempio PP']}<br>
      <em>${v['Trad Esempio PP']}</em>
    </p>

    <p><strong>Common errors:</strong><br>
      ${v['Common errors']}<br>
      <em>${v['Trad Common errors']}</em>
    </p>

    <button onclick="goBack()">← Torna alla lista</button>
  `;
}

// ===== TORNA ALLA LISTA =====
function goBack() {
  document.getElementById('detail').style.display = 'none';
  document.getElementById('list').style.display = 'block';
}

// ===== AVVIO APP =====
loadCSV().then(renderList);
