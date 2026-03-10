var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var AddBtn = document.getElementById("Add"); 
var updateBtn = document.getElementById("update");
var tBody = document.getElementById("tBody");
var data = [];

function addSite() {
    if (validatName() && validate()) {
        var site = {
            name: siteNameInput.value,
            url: siteUrlInput.value
        };
        data.push(site);
        console.log(data);
        displayData();
        clearForm();
    } else {
        alert("يرجى إدخال بيانات صحيحة أولاً!");
    }
}

function displayData() {
    var shanta = ``;
    for (var i = 0; i < data.length; i++) {
        shanta += `
        <tr>
            <td>${i + 1}</td>
            <td>${data[i].name}</td>
            <td><a class="btn btn-success btn-sm"><i class="fa-solid fa-eye"></i> Visit</a></td>
            <td><button onclick="UpdateData(${i})" class="btn btn-info btn-sm text-white"><i class="fa-solid fa-pen"></i> Update</button></td>
            <td><button onclick="deleteSite(${i})" class="btn btn-danger btn-sm"><i class="fa-solid fa-trash"></i> Delete</button></td>
        </tr>`;
    }
    document.getElementById("tBody").innerHTML=shanta;
}

function deleteSite(index) {
    data.splice(index, 1);
    console.log(data)
    displayData();
}


function UpdateData(index) {
    currentIndex = index; 
    var current = data[index];

    siteNameInput.value = current.name;
    siteUrlInput.value = current.url;

    AddBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
}


function updateSite() {
    var updatedSite = {
        name: siteNameInput.value,
        url: siteUrlInput.value
    };

    data.splice(currentIndex, 1, updatedSite); 
    console.log(data);
    displayData();
    clearForm();

    AddBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
}

function clearForm() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
    siteNameInput.classList.remove("is-valid", "is-invalid");
    siteUrlInput.classList.remove("is-valid", "is-invalid");
}



function validatName() {
    var rejex = /^[A-Z][a-z]{2,8}$/;
    if (rejex.test(siteNameInput.value)) {
        siteNameInput.classList.add("is-valid");
        siteNameInput.classList.remove("is-invalid");
        return true;
    } else {
        siteNameInput.classList.add("is-invalid");
        siteNameInput.classList.remove("is-valid");
        return false;
    }
}

function validate() {
    var rejex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+)\.[a-z]{2,6}\/?$/;
    if (rejex.test(siteUrlInput.value)) {
        siteUrlInput.classList.add("is-valid");
        siteUrlInput.classList.remove("is-invalid");
        return true;
    } else {
        siteUrlInput.classList.add("is-invalid");
        siteUrlInput.classList.remove("is-valid");
        return false;
    }
}