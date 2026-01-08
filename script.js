document.addEventListener("DOMContentLoaded", () => {
  fetch("verbs.csv")
    .then(r => r.text())
    .then(csv => {
      const lines = csv.split("\n").slice(1); // salta intestazione
      const list = document.getElementById("audio-list");

      lines.forEach(line => {
        if (!line.trim()) return;

        // prende SOLO la prima colonna (prima virgola)
        const firstComma = line.indexOf(",");
        if (firstComma === -1) return;

        const forms = line
          .slice(0, firstComma)
          .replace(/"/g, "")
          .trim(); // es: take - took - taken

        const fileName = forms
          .toLowerCase()
          .replace(/\s*/g, "")
          .replace(/–/g, "-") + ".mp3";

        const url = "audio/" + fileName;

        const li = document.createElement("li");
        const a = document.createElement("a");

        a.href = url;
        a.textContent = fileName;
        a.target = "_blank";

        li.appendChild(a);
        list.appendChild(li);
      });
    })
    .catch(err => {
      console.error("Errore:", err);
    });
});
