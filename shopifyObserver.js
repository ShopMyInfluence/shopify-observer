(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const smiclickId = urlParams.get('smiclickId');
  const currentUrl = window.location.href;
  console.log("currentUrl",currentUrl);
if(smiclickId){
  localStorage.setItem('smiclickId', smiclickId);
}
  console.log("currentUrl.includes",currentUrl.includes("checkouts") && currentUrl.includes("thank-you"));
  // Vérifier si l'URL contient "checkout" et "thank-you"
  if (currentUrl.includes("checkouts") && currentUrl.includes("thank-you")) {
    // Extraire le token (cartId) depuis l'URL
    const cartId = currentUrl.split('/checkouts/')[1]?.split('/thank-you')[0];
    console.log("cartId",cartId);

    if (!cartId) {
      console.error("Cart ID (token) not found in the URL.");
      return;
    }
    // Envoyer une requête à l'API avec le cartId
    fetch("https://smi--development.gadget.app/storeClickId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ smiclickId, cartId }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to store smiclickId");
        }
        return response.json();
      })
      .then(data => console.log("smiclickId stored with cartId:", data))
      .catch(error => console.error("Error storing smiclickId:", error));
  } else if (!smiclickId) {
    console.error("smiclickId not found in the URL.");
  } else {
    console.error("Current URL does not match the required conditions (checkout and thank-you).");
  }
})();
