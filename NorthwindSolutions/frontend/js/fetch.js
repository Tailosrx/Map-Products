document.addEventListener('DOMContentLoaded', () => {
    fetch('/customers')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Customers:', data);
            // Renderizamos los customers en el DOM
            const customersList = document.getElementById('customers-list');
            data.forEach(customer => {
                const li = document.createElement('li');
                li.textContent = `${customer.CustomerID}: ${customer.CompanyName}`;
                customersList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});
