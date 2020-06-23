function openAddForm() {
    document.getElementById("addForm").style.display = "block";
}

function closeAddForm() {
    document.getElementById("addForm").style.display = "none";
    
}

function closeEditForm() {
    document.getElementById("editForm").style.display = "none";
}

async function fetchDataFromServer() {
    let table = document.getElementById("mytable");
    var result=await fetch('http://dummy.restapiexample.com/api/v1/employees');
        var data=await result.json();
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
    }

function deleteEmp(id) {
    fetch("http://dummy.restapiexample.com/api/v1/delete/id", {
        method: "delete",
        headers: {
            'Content-Type': 'application/json'
        },
        //body: {
          //  id: id
        //}
    }).then(data => {
        alert(data.statusText);
        fetchDataFromServer();
    });
}

function editEmp(id, name, age, salary) {
    document.getElementById("editForm").style.display = "block";
    document.getElementById('emp_id').nodeValue = id;
    document.getElementById('emp_name').nodeValue = name;
    document.getElementById('emp_age').nodeValue = age;
    document.getElementById('emp_salary').nodeValue = salary;
}

function updateEmp() {
    let id = document.getElementById('emp_id').nodeValue;
    let name = document.getElementById('emp_name').nodeValue;
    let age = document.getElementById('emp_age').nodeValue;
    let salary = document.getElementById('emp_salary').nodeValue;
    fetch("http://dummy.restapiexample.com/api/v1/update/id", {
        method: "put",
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            id: id,
            employee_name: name,
            employee_age: age,
            employee_salary: salary
        }
    }).then(data => {
        alert(data.statusText);
        closeEditForm();
        fetchDataFromServer();
    });
}