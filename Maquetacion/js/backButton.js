$(document).ready(() => {
  console.log("backButton.js cargado");

  const backBtn = $("#backButton");

  backBtn.on("click", () => window.history.go(-1));
});
