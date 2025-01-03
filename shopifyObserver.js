(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const smiclickId = urlParams.get('smiclickId');
  if (smiclickId) {
    fetch("/api/storeClickId", { // Call the new route
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ smiclickId }),
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