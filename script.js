<script>
const BIN_URL = "httpsapi.jsonbin.iov3qs686ff90c6063391d31ab02c1"; // remplace par ton lien

// Récupérer les données
async function charger() {
  const res = await fetch(BIN_URL, { headers: { "X-Master-Key": "TON_CLÉ_API" } });
  const data = await res.json();
  return data.record;
}

// Sauvegarder les données
async function sauvegarder(donnees) {
  await fetch(BIN_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": "TON_CLÉ_API"
    },
    body: JSON.stringify(donnees)
  });
}

// Quand quelqu’un entre son nom
async function enregistrerNom(nom) {
  const data = await charger();
  if (data.noms.includes(nom)) return alert("Nom déjà utilisé !");
  data.noms.push(nom);
  data.compteur++;
  await sauvegarder(data);
  afficher(data);
}

// Afficher les données
function afficher(data) {
  document.getElementById("compteur").textContent = "Connexions : " + data.compteur;
  const ul = document.getElementById("liste");
  ul.innerHTML = "";
  data.noms.forEach(n => {
    const li = document.createElement("li");
    li.textContent = n;
    ul.appendChild(li);
  });
}

// Init page
charger().then(afficher);

// Quand l’utilisateur clique sur "Valider"
document.getElementById("btn").onclick = () => {
  const nom = document.getElementById("nom").value.trim();
  if (!nom) return alert("Nom vide");
  localStorage.setItem("nom", nom); // empêcher de revoter
  enregistrerNom(nom);
};
</script>
