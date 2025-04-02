document.addEventListener('DOMContentLoaded', async () => {

    await fillCustomerDropdown();
    await fillEmployeesDropdown();
    await fillOrdersTable();

});

async function fillOrdersTable(limit) {
    Recargar();
    // let response = await fetch('/orders');
    let response = await fetch(`/orders`);
    let orders = await response.json();
    let table = document.querySelector('#orders-table tbody')
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
                <i class="fas fa-edit edit-btn" data-id="${order.OrderID}"data-toggle="modal" data-target="#editOrderModal" style="cursor: pointer; color: gray;"></i>
                <i class="fas fa-trash delete-btn" data-id="${order.OrderID}" style="cursor: pointer; color: red;"></i>
            </td>
        </tr>`
    }
    //DELETE
    let deleteButton = document.querySelectorAll('.delete-btn');
    for(let button of deleteButton){
        button.addEventListener('click', () =>{
            let orderID = button.getAttribute('data-id');
            deleteOrder(orderID);
        })
    }
    //EDIT
    let editbutton = document.querySelectorAll('.edit-btn');
    for(let button of editbutton){
        button.addEventListener('click', ()=>{
            let orderID = button.getAttribute('data-id');
            loadOrderData(orderID);
        });
    }
}


document.getElementById('searchInput').addEventListener('input', function() {
    let filter = this.value.toLowerCase();
    let rows = document.querySelectorAll('#orders-table tbody tr');

    rows.forEach(row => {
        let text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
    });
});


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
    console.log("Customers cargados:", customers);  // <-- VERIFICA LOS DATOS CARGADOS
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
    console.log("Employees cargados:", employees);  // <-- VERIFICA LOS DATOS CARGADOS

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

async function loadOrderData(orderID) {
    let response = await fetch(`/orders/${orderID}`);
    let order = await response.json();

    function formatDate(dateString) {
        if (!dateString) return ''; 
        return dateString.split('T')[0]; 
    }
    console.log("Orden cargada:", order);  // <-- VERIFICA LOS DATOS RECIBIDOS


    document.getElementById("editorderID").value = order.OrderID; 



    // customer
    let customerSelect = document.getElementById('editcustomerID');
    let customerResult = await fetch('/customers');
    let customers = await customerResult.json();
    //limpiar opciones
    customerSelect.innerHTML = '<option value="">Select Customer ID</option>';
    for(let customer of customers){
        const option = document.createElement("option");
        option.value = customer.CustomerID;
        option.textContent = `Customer ${customer.CustomerID}`
        customerSelect.appendChild(option);
    }
    customerSelect.value = order.CustomerID;
    
    //employees
    let employeeSelect = document.getElementById('editemployeeID');
    let employeeResult = await fetch('/employees');
    let employees = await employeeResult.json();
    //limpiar opciones
    employeeSelect.innerHTML = '<option value="">Select Employee</option>';
    for(let employee of employees){
        const option = document.createElement("option");
        option.value = employee.EmployeeID;
        option.textContent = `Employee ${employee.EmployeeID}`
        employeeSelect.appendChild(option);
    };
    employeeSelect.value = order.EmployeeID;


    document.getElementById("editorderDate").value = formatDate(order.OrderDate);
    document.getElementById("editrequiredDate").value = formatDate(order.RequiredDate);
    document.getElementById("editshippedDate").value = formatDate(order.ShippedDate);
    document.getElementById("editshipVia").value = order.ShipVia;
    document.getElementById("editfreight").value = order.Freight;
    document.getElementById("editshipName").value = order.ShipName;
    document.getElementById("editshipAddress").value = order.ShipAddress;
    document.getElementById("editshipCity").value = order.ShipCity;
    document.getElementById("editshipRegion").value = order.ShipRegion;
    document.getElementById("editshipPostalCode").value = order.ShipPostalCode;
    document.getElementById("editshipCountry").value = order.ShipCountry;
    
}
    let editBtn = document.getElementById('editOrderBtn');
    editBtn.addEventListener('click', async () =>{
        let order = {
            "OrderID": document.getElementById("editorderID").value || null,
            "CustomerID": document.getElementById("editcustomerID").value || null,
            "EmployeeID": document.getElementById("editemployeeID").value || null,
            "OrderDate": document.getElementById("editorderDate").value || null,
            "RequiredDate": document.getElementById("editrequiredDate").value || null,
            "ShippedDate": document.getElementById("editshippedDate").value || null,
            "ShipVia": document.getElementById("editshipVia").value || null,
            "Freight": document.getElementById("editfreight").value || null,
            "ShipName": document.getElementById("editshipName").value || null,
            "ShipAddress": document.getElementById("editshipAddress").value || null,
            "ShipCity": document.getElementById("editshipCity").value || null,
            "ShipRegion": document.getElementById("editshipRegion").value || null,
            "ShipPostalCode": document.getElementById("editshipPostalCode").value || null,
            "ShipCountry": document.getElementById("editshipCountry").value || null
        };
        
      
      await editOrder(order);
      // Cerrar el modal manualmente
    //   let modal = document.getElementById('editOrderModal');
    //   modal.classList.remove('show'); // Quita la clase "show"
    //   modal.style.display = 'none'; // Oculta el modal
    //   document.body.classList.remove('modal-open'); // Quita la clase "modal-open" del body
    //   let backdrop = document.querySelector('.modal-backdrop');
    //   if (backdrop) {
    //       backdrop.remove(); // Elimina el fondo del modal
    //   }
        $('#editOrderModal').modal('hide');
        await fillOrdersTable();
    })


async function editOrder(order) {
    let response = await fetch(`/orders/${order.OrderID}`,{
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    });
}