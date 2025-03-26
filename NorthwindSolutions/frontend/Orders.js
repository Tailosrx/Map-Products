document.addEventListener('DOMContentLoaded', async () => {

    await fillOrdersTable();
    await fillCustomerDropdown();
    await fillEmployeesDropdown();

});


async function saveProduct(orders) {
    let result = await fetch('orders', {
        method: 'POST',
        headers: {
            "Content-Type": "aplication/json"
        },
        body: JSON.stringify(orders)
    })
}

const limit = 1;
const offset = 50;

nextPage.addEventListener('click', async () => {
    limit++;
    fillOrdersTable(limit);
});

prevPage.addEventListener('click', async () => {
    if (limit <= 1) {
        limit--;
        fillOrdersTable(limit);
    }
});

async function fillOrdersTable(limit) {
    Recargar();
    // let response = await fetch('/orders');
    let response = await fetch(`/orders?limit=${limit}&offset=${offset}`);
    let orders = await response.json();
    console.log(orders);
    // console.log(result);
    let table = document.querySelector('#orders-table tbody')
    console.log(table);
    table.innerHTML = '';
    for (let order of orders) {
        table.innerHTML += `<tr>
            <td>${order.OrderID}</td>
            <td>${order.CustomerID}</td>
            <td>${order.EmployeeID}</td>
            <td>${order.OrderDate}</td>
            <td>${order.RequiredDate}</td>
            <td>${order.ShippedDate}</td>
            <td>${order.ShipVia}</td>
            <td>${order.Freight}</td>
            <td>${order.ShipName}</td>
            <td>${order.ShipAddress}</td>
            <td>${order.ShipCity}</td>
            <td>${order.ShipRegion}</td>
            <td>${order.ShipPostalCode}</td>
            <td>${order.ShipCountry}</td>
            <td>
                <i class="fas fa-edit"></i>
                <i class="fas fa-trash delete-btn" data-id="${order.OrderID}" style="cursor: pointer; color: red;"></i>
            </td>
        </tr>`
    }
    let deleteButton = document.querySelectorAll('.delete-btn');
    for(let button of deleteButton){
        button.addEventListener('click', () =>{
            let orderID = button.getAttribute('data-id');
            deleteOrder(orderID);
        })
    }
}

function Recargar() {
    let table = document.querySelector('#orders-table tbody')
    table.innerHTML = '';
    table.innerHTML += '<img src="/images/cargando.gif" alt="loading" width="100px" height="100px">';
}


let createBtn = document.getElementById('saveOrderBtn');
createBtn.addEventListener('click', async () => {

    let order = {
        "OrderID": orderID.value,
        "CustomerID": customerID.value,
        "EmployeeID": employeeID.value,
        "OrderDate": orderDate.value,
        "RequiredDate": requiredDate.value,
        "ShippedDate": shippedDate.value,
        "ShipVia": shipVia.value,
        "Freight": freight.value,
        "ShipName": shipName.value,
        "ShipAddress": shipAddress.value,
        "ShipCity": shipCity.value,
        "ShipRegion": shipRegion.value,
        "ShipPostalCode": shipPostalCode.value,
        "ShipCountry": shipCountry.value
    }

    await saveOrder(order);
      // Cerrar el modal manualmente
      let modal = document.getElementById('addOrderModal');
      modal.classList.remove('show'); // Quita la clase "show"
      modal.style.display = 'none'; // Oculta el modal
      document.body.classList.remove('modal-open'); // Quita la clase "modal-open" del body
      let backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
          backdrop.remove(); // Elimina el fondo del modal
      }
      // Recargar la página
    //   location.reload();
    fillOrdersTable();
})


async function saveOrder(order) {
    let result = await fetch('/orders', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    })
}



async function fillCustomerDropdown() {
    let customerSelect = document.getElementById('customerID');

    let result = await fetch('/customers');
    const customers = await result.json();

    for(let customer of customers){
        const option = document.createElement("option");
        option.value = customer.CustomerID;
        option.textContent = `Customer ${customer.CustomerID}`
        customerSelect.appendChild(option);
    }
}

async function fillEmployeesDropdown() {
    let employeesSelect = document.getElementById('employeeID');

    let result = await fetch('/employees');
    let employees = await result.json();

    for(let employee of employees){
        const option = document.createElement("option");
        option.value = employee.EmployeeID;
        option.textContent = `Employee ${employee.EmployeeID}`
        employeesSelect.appendChild(option);
    }
}


async function deleteOrder(orderID) {
    let response = await fetch(`/orders/${orderID}`,
        {
            method: 'DELETE'
        });
    let result = await response.json();
    // alert(result);

    if (response.ok) {
        fillOrdersTable();
    }
}