function openForm() {
    document.getElementById("page").style.display="block";

}
function myfunction() {
 //document.getElementById("formcontainer").style.display="block";

var table = document.getElementById("mytable");
var row = table.insertRow(-1);
var cell1 = row.insertCell(0);
cell1.innerHTML = data.emp_id;
var cell2 = row.insertCell(1);
cell2.innerHTML = data.emp_name;
var cell3 = row.insertCell(2);
cell3.innerHTML = data.emp_salary;
var cell4 = row.insertCell(3);
cell4.innerHTML = data.emp_age;
}
       
function closeForm() {
    document.getElementById("page").style.display="none";
}

function details() {
//code
}
function sample() {
    document.getElementId("mytable").deleteRow(-1);
}
var app = document.getElementById('root');

var container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var data = JSON.stringify({
  "token": "59PxI89rzzVDP0m6B8PnWA",
  "data": {
	"emp_id": "emp_id",
	"emp_name": "emp_name",
	"emp_salary": "emp_salary",
      "emp_age": "emp_age",
	
	"_repeat": 9
  }
});

var request = new XMLHttpRequest();

request.onload = function(){
  var fakeData = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {
	fakeData.forEach(companyRole => {
	  var card = document.createElement('div');
	  card.setAttribute('class', 'card');

	  var elem = document.createElement("img");
	  elem.setAttribute("src", companyRole.emp_id);
	  elem.setAttribute("height", "180px");
	  elem.setAttribute("width", "100%");
	  elem.setAttribute("alt", "Profile Picture");

	  var h1 = document.createElement('h1');
	  h1.textContent = companyRole.emp_id;

	  var p1 = document.createElement('p1');
	  p1.textContent = companyRole.emp_name;

	  var p2 = document.createElement('p2');
	   p2.textContent = companyRole.emp_salary;
         
        var p3 = document.createElement('p3');
	   p3.textContent = companyRole.emp_age;



	  var br = document.createElement("br");

	  container.appendChild(card);

	  card.appendChild(elem);
	  card.appendChild(h1);
	  card.appendChild(p1);
	  card.appendChild(br);
	  card.appendChild(p2);
	});
  } else {
	console.log('You shall not pass');
  }
}

request.open("POST", "https://app.fakejson.com/q");
request.setRequestHeader("content-type", "application/json");
request.send(data);