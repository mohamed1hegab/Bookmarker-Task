

var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var AddBtn = document.getElementById("Add"); 
var updateBtn = document.getElementById("update");
var tBody = document.getElementById("tBody");

// مصفوفة البيانات الأساسية
var data = [];
var currentIndex; // متغير لحفظ مكان العنصر المراد تعديله

// 1. التأكد من وجود بيانات قديمة في المتصفح عند فتح الصفحة
if (localStorage.getItem("allSites") != null) {
    data = JSON.parse(localStorage.getItem("allSites")); // تم توحيد الاسم لـ data
    displayData();
}

// 2. دالة الإضافة
function addSite() {
    if (validatName() && validate()) {
        var site = {
            name: siteNameInput.value,
            url: siteUrlInput.value
        }; 
        data.push(site);
        
        // حفظ المصفوفة في الـ LocalStorage بعد الإضافة
        localStorage.setItem("allSites", JSON.stringify(data));
        
        displayData();
        clearForm();
    } else {
        alert("يرجى إدخال بيانات صحيحة أولاً!");
    }
}

// 3. دالة العرض
function displayData() {
    var shanta = ``;
    for (var i = 0; i < data.length; i++) {
        shanta += `
        <tr>
            <td>${i + 1}</td>
            <td>${data[i].name}</td>
            <td><a href="${data[i].url}" target="_blank" class="btn btn-success btn-sm"><i class="fa-solid fa-eye"></i> Visit</a></td>
            <td><button onclick="UpdateData(${i})" class="btn btn-info btn-sm text-white"><i class="fa-solid fa-pen"></i> Update</button></td>
            <td><button onclick="deleteSite(${i})" class="btn btn-danger btn-sm"><i class="fa-solid fa-trash"></i> Delete</button></td>
        </tr>`;
    }
    tBody.innerHTML = shanta;
}

// 4. دالة المسح
function deleteSite(index) {
    data.splice(index, 1);
    
    // تحديث الـ LocalStorage بعد المسح
    localStorage.setItem("allSites", JSON.stringify(data));
    
    displayData();
}

// 5. دالة جلب البيانات للفورم للتعديل
function UpdateData(index) {
    currentIndex = index; 
    var current = data[index];

    siteNameInput.value = current.name;
    siteUrlInput.value = current.url;

    AddBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
}

// 6. دالة حفظ التعديل النهائي
function updateSite() {
    if (validatName() && validate()) {
        var updatedSite = {
            name: siteNameInput.value,
            url: siteUrlInput.value
        };

        data.splice(currentIndex, 1, updatedSite); 
        
        // تحديث الـ LocalStorage بعد التعديل
        localStorage.setItem("allSites", JSON.stringify(data));
        
        displayData();
        clearForm();

        AddBtn.classList.remove("d-none");
        updateBtn.classList.add("d-none");
    } else {
        alert("يرجى التأكد من البيانات قبل التعديل");
    }
}

// 7. دالة تنظيف الفورم
function clearForm() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
    siteNameInput.classList.remove("is-valid", "is-invalid");
    siteUrlInput.classList.remove("is-valid", "is-invalid");
}

// 8. التحقق من الاسم
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

// 9. التحقق من الرابط
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
