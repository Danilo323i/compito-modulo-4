const url = new URLSearchParams(location.search);
const id = url.get("id");
console.log("ID del prodotto", id);

const KEY =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQxOGUzMjRlMWE5MjAwMTU1Mjg1NGIiLCJpYXQiOjE3MjUwMDk0NTgsImV4cCI6MTcyNjIxOTA1OH0.LzyrOQf6_gOh0-9rE_3Ssb3vFPNbSNb-GfDQzcjJ2AM";

const img = document.getElementById("img");
const cardBody = document.getElementById("cardBody");
const cardTitle = document.getElementById("cardTitle");
const brandCard = document.getElementById("brandCard");
const cardDescription = document.getElementById("cardDescription");
const cardPrice = document.getElementById("cardPrice");

const nomeVisualizzato = document.getElementById("nome");
const marcaVisualizzato = document.getElementById("marca");
const prezzoVisualizzato = document.getElementById("prezzo");
const descrizioneVisualizzato = document.getElementById("descrizione");
const immagineVisualizzato = document.getElementById("imageUrl");

const singleProduct = () => {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: KEY,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      cardTitle.textContent = data.name;
      brandCard.textContent = data.brand;
      cardPrice.textContent = `$${data.price}`;
      cardDescription.textContent = data.description;
      img.src = data.imageUrl;

      nomeVisualizzato.value = data.name;
      marcaVisualizzato.value = data.brand;
      prezzoVisualizzato.value = data.price;
      descrizioneVisualizzato.value = data.description;
      immagineVisualizzato.value = data.imageUrl;
    })
    .catch((error) => {
      console.error("Errore nel recupero del prodotto:", error);
    });
};

singleProduct();

document.addEventListener(`DOMContentLoaded`, function () {
  const modifyForm = document.getElementById("modifyForm");
  modifyForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let updatedProduct = {
      name: nomeVisualizzato.value,
      brand: marcaVisualizzato.value,
      price: prezzoVisualizzato.value,
      description: descrizioneVisualizzato.value,
      imageUrl: immagineVisualizzato.value
    };

    fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: KEY,
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Errore durante la modifica del prodotto");
        }
        return res.json();
      })
      .then(() => {
        singleProduct();
      })
      .catch((err) => {
        console.error("Errore:", err);
      });
  });
});
