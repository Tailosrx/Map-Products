document.addEventListener("DOMContentLoaded", () => {
    // Realizamos una solicitud para obtener los pedidos
    fetch("/earnings") // Cambia la URL si es necesario
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parseamos la respuesta JSON
      })
      .then((data) => {
        console.log("Earnings:", data);
        // Acceder al primer objeto en el array y obtener el valor de 'TotalGanado'
        const earnings = data[0]?.TotalGanado || "No data"; // Si no hay datos, mostramos 'No data'
        document.getElementById("earningsCount").textContent = earnings; // Actualizamos el texto con el total ganado
    })    
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        document.getElementById("earningsCount").textContent = "Error"; // Si hay error, mostramos un mensaje
      });
});
