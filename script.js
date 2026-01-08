document.addEventListener("DOMContentLoaded", () => {
  fetch("verbs.csv")
    .then(r => r.text())
    .then(csv => {
      const rows = csv.split("\n").slice(1); // salta intestazione
      const tbody = document.querySelector("#verbs-table tbody");

      rows.forEach(row => {
        if (!row.trim()) return;

        const cols = row.split(",");

        const tr = document.createElement("tr");

        // === COLONNA 1: Base - PS - PP + AUDIO ===
        const verbForms = cols[0].replace(/"/g, "").trim();

        const fileName = verbForms
          .toLowerCase()
          .replace(/\s*-\s*/g, "-")
          .replace(/\s+/g, "-")
          .replace(/[^a-z\-]/g, "")
          + ".mp3";

        const tdVerb = document.createElement("td");

        const btn = document.createElement("button");
        btn.textContent = verbForms;

        const audio = document.createElement("audio");
        audio.src = "audio/" + fileName;
        audio.controls = true;
        audio.style.display = "none";

        btn.onclick = () => {
          document.querySelectorAll("audio").forEach(a => {
            a.pause();
            a.style.display = "none";
          });
          audio.style.display = "block";
          audio.play();
        };

        tdVerb.appendChild(btn);
        tdVerb.appendChild(audio);
        tr.appendChild(tdVerb);

        // === ALTRE COLONNE: SOLO TESTO ===
        for (let i = 1; i < cols.length; i++) {
          const td = document.createElement("td");
          td.textContent = cols[i].replace(/"/g, "").trim();
          tr.appendChild(td);
        }

        tbody.appendChild(tr);
      });
    });
});










