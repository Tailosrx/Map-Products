// Esperamos que el DOM se haya cargado completamente
document.addEventListener("DOMContentLoaded", () => {
  // Realizamos una solicitud para obtener los clientes
  fetch("/customers") // Cambia la URL si es necesario
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parseamos la respuesta JSON
    })
    .then((data) => {
      console.log("Customers:", data);
      // Contamos los clientes obtenidos (suponiendo que `data` es un array de clientes)
      const memberCount = data.length; // El número de clientes es el tamaño del array
      document.getElementById("membersCount").textContent = memberCount; // Actualizamos el texto del h2
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      document.getElementById("membersCount").textContent = "Error"; // Si hay error, mostramos un mensaje
    });
});
