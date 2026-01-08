document.addEventListener("DOMContentLoaded", () => {
  fetch("verbs.csv")
    .then(r => {
      if (!r.ok) throw new Error("verbs.csv non trovato");
      return r.text();
    })
    .then(csv => {
      const lines = csv.split("\n").slice(1);
      const list = document.getElementById("audio-list");

      list.innerHTML = "";

      lines.forEach(line => {
        if (!line.trim()) return;

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

        const a = document.createElement("a");
        a.href = "audio/" + fileName;
        a.textContent = fileName;
        a.target = "_blank";

        const li = document.createElement("li");
        li.appendChild(a);

        list.appendChild(li);
      });
    })
    .catch(err => {
      console.error(err);
    });
});



