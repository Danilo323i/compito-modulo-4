export function startLoading() {
  const wrap = document.getElementById("loader");
  const p = document.createElement("p");

  document.getElementById("hiddenCard").hidden = true;
}

export function stopLoading() {
  document.getElementById(`loader`).remove();

  document.getElementById("hiddenCard").hidden = false;
}
