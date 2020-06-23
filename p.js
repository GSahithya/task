function openAddForm() {
    document.getElementById("addForm").style.display = "block";
}

function closeAddForm() {
    document.getElementById("addForm").style.display = "none";
}

function closeEditForm() {
    document.getElementById("editForm").style.display = "none";
}

function fetchDataFromServer() {
    let table = document.getElementById("mytable");
    table.innerHTML = "";
    fetch('http://dummy.restapiexample.com/api/v1/employees').then((response) => response.json()).then(data => {
        data.data.forEach(employee => {
            let row = document.createElement("tr");
            let id = document.createElement("td");
            id.appendChild(document.createTextNode(employee.id));
            let name = document.createElement("td");
            name.appendChild(document.createTextNode(employee.employee_name));
            let age = document.createElement("td");
            age.appendChild(document.createTextNode(employee.employee_age));
            let salary = document.createElement("td");
            salary.appendChild(document.createTextNode(employee.employee_salary));

            let actions = document.createElement("td");
            let deleteButt = document.createElement("button");
            deleteButt.innerHTML = "Delete";
            deleteButt.setAttribute("onclick", "deleteEmp(" + employee.id + ")");

            let editButt = document.createElement("button");
            editButt.innerHTML = "Edit";
            editButt.setAttribute("onclick", `editEmp( ${employee.id} , '${employee.employee_name}', ${employee.employee_age}, ${employee.employee_salary}) `)
            actions.appendChild(editButt);

            actions.appendChild(deleteButt);
            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(age);
            row.appendChild(salary);
            row.appendChild(actions);
            table.appendChild(row);
        })
    }).catch(err => {
        console.log(err);
    })
}

function addEmp() {
    let name = document.getElementById('name').value;
    let age = document.getElementById('age').value;
    let salary = document.getElementById('salary').value;
    fetch("http://dummy.restapiexample.com/api/v1/create", {
        method: "POST",
        body: {
            name: name,
            age: age,
            salary: salary
        }
    }).then(resp => resp.json()).then(data => {
        console.log(data);
        closeAddForm();
        fetchDataFromServer();
    });
}

function deleteEmp(id) {
    let url = "http://dummy.restapiexample.com/api/v1/delete/" + id;
    console.log(url)
    fetch(url, {
        method: "DELETE",
    }).then(resp => resp.json()).then(data => {
        console.log(data);
        fetchDataFromServer();
    });
}

function editEmp(id, name, age, salary) {
    document.getElementById("editForm").style.display = "block";
    document.getElementById('emp_name').value = name;
    document.getElementById('emp_age').value = age;
    document.getElementById('emp_salary').value = salary;
    document.getElementById('emp_id').value = id;
}

function updateEmp() {
    let id = document.getElementById('emp_id').value;
    let name = document.getElementById('emp_name').value;
    let age = document.getElementById('emp_age').value;
    let salary = document.getElementById('emp_salary').value;
    let url = "http://dummy.restapiexample.com/api/v1/update/" + id;
    fetch(url, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            name: name,
            age: age,
            salary: salary
        }
    }).then(resp => resp.json()).then(data => {
        console.log(data);
        closeEditForm();
        fetchDataFromServer();
    });
}