document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('employee-modal');
    const deleteModal = document.getElementById('delete-modal');
    const employeeForm = document.getElementById('employee-form');
    let employeeToDelete = null;

    fillOrderTable();

    async function fillOrderTable() {
        try {
            const response = await fetch('/employees');
            const employees = await response.json();

            const tbody = document.querySelector('#employees-table tbody');
            tbody.innerHTML = '';

            employees.forEach(employee => {
                const row = document.createElement('tr');
                row.innerHTML = `
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
                `;
                tbody.appendChild(row);
            });

            document.querySelectorAll('.edit-btn').forEach(button => {
                button.addEventListener('click', openEditModal);
            });

            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', deleteEmployee);
            });
        } catch (error) {
            console.error('Error fetching  con los employees:', error);
        }
    }

    async function openEditModal(event) {
        const employeeId = event.target.dataset.id;

        try {
            const response = await fetch(`/employees/${employeeId}`);
            const employee = await response.json();

            document.getElementById('employee-id').value = employee.EmployeeID;
            document.getElementById('last-name').value = employee.LastName;
            document.getElementById('first-name').value = employee.FirstName;
            document.getElementById('title').value = employee.Title;
            document.getElementById('hire-date').value = employee.HireDate.split('T')[0];
            document.getElementById('city').value = employee.City;
            document.getElementById('region').value = employee.Region;

            document.getElementById('modal-title').textContent = 'Edit Employee';
            modal.style.display = 'block';
        } catch (error) {
            console.error('Error fetching con la data de los employee:', error);
        }
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
        modal.style.display = 'block';
    });

    employeeForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const employeeId = document.getElementById('employee-id').value;

        const employeeData = {
            LastName: document.getElementById('last-name').value,
            FirstName: document.getElementById('first-name').value,
            Title: document.getElementById('title').value,
            HireDate: document.getElementById('hire-date').value,
            City: document.getElementById('city').value,
            Region: document.getElementById('region').value,
            EmployeeID : employeeId
        };

        const method = employeeId ? 'PUT' : 'POST';
        const url = employeeId ? `/employees/${employeeId}` : '/employees';
        console.log('Data received:', { employeeData });

        try {
            const response = await fetch(url, {
                method : method,	
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(employeeData),
            });

        


            console.log('URL:', url);
            console.log('Method:', method);
            console.log('Employee data being sent:', employeeData);

            if (response.ok) {
                alert(employeeId ? 'Empleado actualizado con exito ' : 'Empleado agregado con exito');
                modal.style.display = 'none';
                await fillOrderTable();
            } else {
                alert('Fallo al guardar el employee.');
            }
        } catch (error) {
            console.error('Error al guardar el  employee:', error);
        }
    });

    async function deleteEmployee(event) {
        const employeeId = event.target.dataset.id;
        employeeToDelete = employeeId;
        deleteModal.style.display = 'block';
    }

    document.getElementById('confirm-delete').addEventListener('click', async () => {
        if (employeeToDelete) {
            try {
                const response = await fetch(`/employees/${employeeToDelete}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert('Employee eliminado!');
                    await fillOrderTable();
                } else {
                    alert('Fallo al eliminar el employee.');
                }
            } catch (error) {
                console.error('Error borrando el employee:', error);
            } finally {
                closeDeleteModal();
            }
        }
    });

    document.getElementById('cancel-delete').addEventListener('click', closeDeleteModal);

    document.getElementById('close-delete-modal').addEventListener('click', closeDeleteModal);

    function closeDeleteModal() {
        deleteModal.style.display = 'none';
        employeeToDelete = null;
    }

    document.getElementById('close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });
});
