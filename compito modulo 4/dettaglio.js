const KEY =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQxOGUzMjRlMWE5MjAwMTU1Mjg1NGIiLCJpYXQiOjE3MjUwMDk0NTgsImV4cCI6MTcyNjIxOTA1OH0.LzyrOQf6_gOh0-9rE_3Ssb3vFPNbSNb-GfDQzcjJ2AM";

const card = document.getElementById("card");
const img = document.getElementById("img");
const cardBody = document.getElementById("cardBody");
const cardTitle = document.getElementById("cardTitle");
const brandCard = document.getElementById("brandCard");
const cardDescription = document.getElementById("cardDescription");
const cardPrice = document.getElementById("cardPrice");
const backBtn = document.getElementById("backBtn");
const deleteBtn = document.getElementById("deleteBtn");
const modifyBtn = document.getElementById("modifyBtn");

const url = new URLSearchParams(location.search);
const id = url.get("id");


import { startLoading, stopLoading } from "./loader.js";



function singleProduct() {
  
  

  

  

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
    })
    .catch((error) => {
      console.error("Errore nel recupero del prodotto:", error);
      stopLoading()
    });
  
}

startLoading()

setTimeout(function(){

stopLoading();

singleProduct();

deleteBtn.addEventListener("click", function () {
  const conf = confirm("Sei sicuro di voler eliminare?");
  if (conf) {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: KEY,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Errore durante l'eliminazione");
        }
        return res.json();
      })
      .then(() => {
        window.location.href = "http://127.0.0.1:5500/index.html";
      })
      .catch((err) => {
        console.error("Errore:", err);
      });
  }
});
},5000)

modifyBtn.addEventListener(`click`, function () {
  window.location.href = `http://127.0.0.1:5500/modify.html?id=${id}`;
});


