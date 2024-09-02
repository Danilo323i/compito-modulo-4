function fetchProdotti() {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQxOGUzMjRlMWE5MjAwMTU1Mjg1NGIiLCJpYXQiOjE3MjUwMDk0NTgsImV4cCI6MTcyNjIxOTA1OH0.LzyrOQf6_gOh0-9rE_3Ssb3vFPNbSNb-GfDQzcjJ2AM",
    },
  })
    .then((res) => res.json())
    .then((prodotti) => {
      console.log(prodotti);

      const target = document.getElementById("target");
      prodotti.forEach((prodotto) => {
        const prodottoDiv = document.createElement("div");

        prodottoDiv.classList.add("card", "m-auto");
        prodottoDiv.style.width = "20rem";
        prodottoDiv.style.maxHeight = "30rem";

        prodottoDiv.innerHTML = `
            <img src="${prodotto.imageUrl}" alt="${prodotto.name}" class="card-img-top img-fluid">
            <div class="card-body m-auto ">
              <h5 class="card-title">${prodotto.name}</h5>
              <p class="card-text">Marca: ${prodotto.brand}</p>
              <p class="card-text overflow-hidden text-truncate text-wrap" style="height: 6rem;">Descrizione: ${prodotto.description}</p>
              <p class="card-text">Prezzo: €${prodotto.price}</p>
              <a href="dettaglio.html?id=${prodotto._id}" class="btn btn-primary">Visualizza</a>
            </div>
          `;

        target.appendChild(prodottoDiv);
      });
    })

    /* prodotti.foreach((prodotto) => {                                 non funziona, rivedere il codice!!
          const prodottoDiv = document.createElement("div");
          const img = document.createElement("img");
          const cardBody = document.createElement("div");
          const title = document.createElement("h5");
          const brand = document.createElement("p")
          const description = document.createElement("p");
          const price = document.createElement("p");
          const show = document.createElement("a");

          prodottoDiv.classList.add("card");
          prodottoDiv.style.width = "20rem";

          img.classList.add("card-img-top", "img-fluid");
          cardBody.classList.add("card-body");
          title.classList.add("card-title");
          show.classList.add("btn", "btn-primary");

          title.textContent = prodotto.name;
          brand.textContent = brand.brand;
          description.textContent = prodotto.descrtiption;
          price.textContent = prodotto.price;

          show.href = "dettaglio.html?id=" + p.id;
          show.textContent = "visualizza";

          
          prodottoDiv.append(img);
          prodottoDiv.append(cardBody);
          cardBody.append(title);
          cardBody.append(description);
          cardBody.append(price);
          cardBody.append(show);

          
          target.append(prodottoDiv);
        })
          
})*/

    .catch((error) => {
      console.error("Errore durante il recupero dei prodotti:", error);
      alert("C'è stato un problema nel recupero dei prodotti.");
    });
}

const load = document.addEventListener("DOMContentLoaded", () => {
  fetchProdotti();
});
