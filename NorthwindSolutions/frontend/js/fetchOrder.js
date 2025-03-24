document.addEventListener('DOMContentLoaded', () => {
    fetch('/orders') // Asegúrate de que esta ruta esté configurada en el backend
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Orders:', data);

            // Contamos el número de órdenes basándonos en OrderID
            const ordersCount = data.length;

            // Mostramos el contador en el DOM
            const ordersCountElement = document.getElementById('orders-count');
            ordersCountElement.textContent = `Total Orders: ${ordersCount}`;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});