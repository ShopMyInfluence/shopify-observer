(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const smiclickId = urlParams.get('smiclickId');
  
  if (smiclickId) {
    // Get the session ID from the cookies
    const cookies = document.cookie.split("; ");
    const sessionCookie = cookies.find(cookie => cookie.startsWith("_shopify_y="));
    const sessionId = sessionCookie ? sessionCookie.split("=")[1] : null;

    if (!sessionId) {
      console.error("Session ID (_shopify_y) not found in cookies.");
      return;
    }

    // Make the fetch request with the session ID
    fetch("https://smi--development.gadget.app/storeClickId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ smiclickId, sessionId }), // Send session ID in the body
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to store smiclickId");
        }
        return response.json();
      })
      .then(data => console.log("smiclickId stored:", data))
      .catch(error => console.error("Error storing smiclickId:", error));
  }
})();
