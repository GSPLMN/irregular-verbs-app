document.addEventListener("DOMContentLoaded", () => {
  fetch("verbs.csv")
    .then(response => {
      if (!response.ok) throw new Error("verbs.csv non trovato");
      return response.text();
    })
    .then(csv => {
      const lines = csv.split("\n").slice(1); // salta intestazione
      const list = document.getElementById("audio-list");

      list.innerHTML = ""; // pulisce la lista prima di popolare

      lines.forEach(line => {
        if (!line.trim()) return;

        // prendi solo la prima colonna (Base - PS - PP)
        const firstComma = line.indexOf(",");
        if (firstComma === -1) return;

        const forms = line
          .slice(0, firstComma)
          .replace(/"/g, "")
          .trim();

        // genera il nome del file mp3, normalizzando trattini e spazi
        const fileName = forms
          .toLowerCase()
          .replace(/–|—/g, "-")      // trattini lunghi → normale
          .replace(/\s*-\s*/g, "-")  // spazio-trattino-spazio → -
          .replace(/\s+/g, "-")      // spazi → -
          .replace(/[^a-z\-]/g, "")  // solo lettere e trattino
          .replace(/-+/g, "-")       // sequenze multiple → singolo
          + ".mp3";

        // crea elemento lista e link
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "audio/" + fileName;
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












