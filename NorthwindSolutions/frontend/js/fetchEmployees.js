//const apiURL = 'http://localhost:3000/orders';

//sql select * from orders join categorys using (category_id)

document.addEventListener('DOMContentLoaded', () => {
    fillOrderTable();

    const addEmployeeBtn = document.getElementById('add-btn');
    const modal = document.getElementById('myDialog');
    const employeeForm = document.getElementById('employee-form');


    const closeModalBtn = document.getElementById('close-modal');
    closeModalBtn.addEventListener('click', () => {
        modal.close();
    });

    employeeForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const employeeData = {
            LastName: document.getElementById('last-name').value,
            FirstName: document.getElementById('first-name').value,
            Title: document.getElementById('title').value,
            HireDate: document.getElementById('hire-date').value,
            City: document.getElementById('city').value,
            Region: document.getElementById('region').value,
        };

        const response = await fetch('/employees', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employeeData),
        });

        if (response.ok) {
            alert('Employee added successfully!');
            modal.style.display = 'none';
            fillOrderTable(); 
        } else {
            alert('Failed to add employee.');
        }
    });
});

async function fillOrderTable(){
  let response = await fetch('/employees');
  let employees = await response.json();
    console.log(employees);
    let tbody = document.querySelector('#employees-table tbody');
    for (let employee of employees) {
        tbody.innerHTML += `<tr>
        <td>${employee.EmployeeID}</td>
        <td>${employee.LastName}</td>
        <td>${employee.FirstName}</td>
        <td>${employee.Title}</td>
        <td>${employee.HireDate}</td>
        <td>${employee.City}</td>
        <td>${employee.Region}</td> 
        <td>
            <button class="edit-btn" data-id="${employee.EmployeeID}">Edit</button>
            <button class="delete-btn" data-id="${employee.EmployeeID}">Delete</button>
        </td>
        </tr> ` 
    }
}



function openEditModal(event){
    const employeeId = event.target.dataset.id;

    fetch(`/employees/${employeeId}`)
      .then(response => response.json())
      .then(employee => {
        document.getElementById('employee-id').value = employee.EmployeeID;
        document.getElementById('last-name').value = employee.LastName;
        document.getElementById('first-name').value = employee.FirstName;
        document.getElementById('title').value = employee.Title;
        document.getElementById('hire-date').value = employee.HireDate.split('T')[0];
        document.getElementById('city').value = employee.City;
        document.getElementById('region').value = employee.Region;

        document.getElementById('modal-title').textContent = 'Edit Employee';
        document.getElementById('employee-modal').style.display = 'block';
      })
}

document.getElementById('add-btn').addEventListener('click', () => {
    document.getElementById('employee-id').value = '';
    document.getElementById('last-name').value = '';
    document.getElementById('first-name').value = '';
    document.getElementById('title').value = '';
    document.getElementById('hire-date').value = '';
    document.getElementById('city').value = '';
    document.getElementById('region').value = '';

    document.getElementById('modal-title').textContent = 'Add Employee';
    document.getElementById('employee-modal').style.display = 'block';
});


document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('employee-modal').style.display = 'none';
});
