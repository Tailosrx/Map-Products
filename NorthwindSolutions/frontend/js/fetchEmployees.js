//const apiURL = 'http://localhost:3000/orders';

//sql select * from orders join categorys using (category_id)

document.addEventListener('DOMContentLoaded', async() => {
    fillOrderTable();
});

async function fillOrderTable(){
  let response = await fetch('/employees');
  let employees = await response.json();
    console.log(employees);
    //poner id en el tbody pongo de ejemplo este
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
        </tr> ` //son los campos de mi profesor
    }
}