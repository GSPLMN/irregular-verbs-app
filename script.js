alert("NUOVA VERSIONE SCRIPT CARICATA");

document.addEventListener("DOMContentLoaded", () => {
  fetch("verbs.csv")
    .then(r => r.text())
    .then(csv => {
      const lines = csv.split("\n").slice(1);
      const list = document.getElementById("audio-list");

      lines.forEach(line => {
        if (!line.trim()) return;

        const firstComma = line.indexOf(",");
        if (firstComma === -1) return;

        const forms = line
          .slice(0, firstComma)
          .replace(/"/g, "")
          .trim();

        const fileName = forms
          .toLowerCase()
          .replace(/\s*/g, "")
          .replace(/–/g, "-") + ".mp3";

        const li = document.createElement("li");
        const a = document.createElement("a");

        a.href = "audio/" + fileName;
        a.textContent = fileName;
        a.target = "_blank";

        li.appendChild(a);
        list.appendChild(li);
      });
    });
});
;

