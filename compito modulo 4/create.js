// Anteprima
const anteprima = document.getElementById("anteprima").addEventListener("click", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const marca = document.getElementById("marca").value;
  const prezzo = document.getElementById("prezzo").value;
  const descrizione = document.getElementById("descrizione").value;
  const imageUrl = document.getElementById("imageUrl").value;

  const data = {
    name: nome,
    brand: marca,
    price: Number(prezzo),
    description: descrizione,
    imageUrl: imageUrl,
  };

  if (!data.name || !data.brand || !data.price) {
    alert("Per favore, riempi tutti i campi richiesti.");
    return;
  }

  document.getElementById("preview-nome").textContent = `Nome: ${data.name}`;
  document.getElementById("preview-marca").textContent = `Marca: ${data.brand}`;
  document.getElementById("preview-prezzo").textContent = `Prezzo: €${data.price}`;
  document.getElementById("preview-immagine").src = data.imageUrl;

  document.getElementById("cardAnteprima").style.display = "flex";
});


const chiudiAnteprima = document.getElementById("chiudiAnteprima").addEventListener("click", function () {
  document.getElementById("cardAnteprima").style.display = "none";
});

// Funzione per ottenere la lista dei prodotti e mostrarla
function fetchProdotti() {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQxOGUzMjRlMWE5MjAwMTU1Mjg1NGIiLCJpYXQiOjE3MjUwMDk0NTgsImV4cCI6MTcyNjIxOTA1OH0.LzyrOQf6_gOh0-9rE_3Ssb3vFPNbSNb-GfDQzcjJ2AM",
    },
  })
    .then((res) => res.json())
    .then((prodotti) => {
      const listaProdotti = document.getElementById("listaProdotti");
      listaProdotti.innerHTML = ""; // Svuota la lista prima di popolarla di nuovo

      prodotti.forEach((prodotto) => {
        const prodottoDiv = document.createElement("div");

        prodottoDiv.classList.add("prodotto-card");
        prodottoDiv.innerHTML = `
          <h5>${prodotto.name}</h5>
          <p>Marca: ${prodotto.brand}</p>
          <p>Prezzo: €${prodotto.price}</p>
          <p>Descrizione: ${prodotto.description}</p>
          <img src="${prodotto.imageUrl}" alt="${prodotto.name}" style="max-width: 100px; max-height: 100px;">`;

        listaProdotti.appendChild(prodottoDiv);
      });
    })
    .catch((error) => {
      console.error("Errore durante il recupero dei prodotti:", error);
      alert("C'è stato un problema nel recupero dei prodotti.");
    });
}

// Gestione invio del form
const form = document.getElementById("prodottoForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const marca = document.getElementById("marca").value;
  const prezzo = document.getElementById("prezzo").value;
  const descrizione = document.getElementById("descrizione").value;
  const imageUrl = document.getElementById("imageUrl").value;

  const data = {
    name: nome,
    brand: marca,
    price: Number(prezzo),
    description: descrizione,
    imageUrl: imageUrl,
  };

  if (!data.name || !data.brand || !data.price) {
    alert("Per favore, riempi tutti i campi richiesti.");
    return;
  }

  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQxOGUzMjRlMWE5MjAwMTU1Mjg1NGIiLCJpYXQiOjE3MjUwMDk0NTgsImV4cCI6MTcyNjIxOTA1OH0.LzyrOQf6_gOh0-9rE_3Ssb3vFPNbSNb-GfDQzcjJ2AM",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Successo:", data);
      alert("Prodotto inviato con successo");
      document.getElementById("prodottoForm").reset();

      // Ricarica la lista dei prodotti dopo l'invio
      fetchProdotti();
    })
    .catch((error) => {
      console.error("Errore:", error);
      alert("C'è stato un problema nell'invio del prodotto.");
    });
});

// Carica la lista dei prodotti quando la pagina viene caricata
document.addEventListener("DOMContentLoaded", fetchProdotti);
