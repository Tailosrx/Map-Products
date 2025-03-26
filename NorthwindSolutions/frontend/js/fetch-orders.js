// Esperamos que el DOM se haya cargado completamente
document.addEventListener("DOMContentLoaded", () => {
  // Realizamos una solicitud para obtener los pedidos
  fetch("/orders") // Cambia la URL si es necesario
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parseamos la respuesta JSON
    })
    .then((data) => {
      console.log("Orders:", data);
      // Contamos los pedidos obtenidos (suponiendo que `data` es un array de pedidos)
      const memberCount = data.length; // El número de pedidos es el tamaño del array
      document.getElementById("ordersCount").textContent = memberCount; // Actualizamos el texto
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      document.getElementById("ordersCount").textContent = "Error"; // Si hay error, mostramos un mensaje
    });
});
