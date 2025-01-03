(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const smiclickId = urlParams.get('smiclickId');
  const currentUrl = window.location.href;

  // Vérifier si l'URL correspond au format spécifique
  const thankYouPageRegex = /^https:\/\/shop-testpixel\.myshopify\.com\/checkouts\/cn\/([a-zA-Z0-9-:]+)/thank-you$/;
  const match = currentUrl.match(thankYouPageRegex);

  if (smiclickId && match) {
    const cartId = match[1]; // Extraire le cartId depuis l'URL

    // Stocker le smiclickId dans le localStorage
    localStorage.setItem('smiclickId', smiclickId);

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
    console.error("Current URL does not match the thank-you page format.");
  }
})();
