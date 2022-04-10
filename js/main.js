"use strict";

let bookmarkName = document.getElementById('bookmarkName'),
    bookmarkUrl = document.getElementById('bookmarkUrl'),
    submitBtn = document.getElementById('submitBtn'),
    bookmarkCardContainer = document.getElementById('bookmarkCardContainer'),
    searchInput = document.getElementById('searchInput'),
    inputsOfData = document.querySelectorAll('.bookmark-header input'),
    emptyInputAlert = document.getElementById('emptyInputAlert'),
    bookmarkNameAlert = document.getElementById('bookmarkNameAlert'),
    bookmarkUrlAlert = document.getElementById('bookmarkUrlAlert'),
containerOfData,currentIndex,nameValida,urlValida;
nameValida = false;
urlValida = false;
currentIndex = -1;
containerOfData = [];
if(localStorage.getItem('bookmarkList') != null)
{
    containerOfData = getDataIntoLocalStorage();
    displayDataFromInput();
}
submitBtn.addEventListener('click',function ()
{
    if(!requiredData())
    {
        if(submitBtn.innerHTML == "Add Bookmark")
        {
            addDataFromInput();

        }
        else
        {
            updateData();
        }
        resetForm();
        displayDataFromInput();
    }

})

function addDataFromInput()
{
    let singleData =
        {
            bookmarkName:bookmarkName.value,
            bookmarkUrl:bookmarkUrl.value
        }
    containerOfData.push(singleData);
    setDataIntoLocalStorage();
}
function displayDataFromInput()
{
    let container = '';
    containerOfData.forEach((data,index)=>
    {
        container += `
        <div class="bookmark-card p-2 mb-3 d-flex align-items-center justify-content-between">
         <div class="bookmark-card-name">
                        <h3>${data.bookmarkName}</h3>
          </div>
<div class="btn-group" role="group" aria-label="Basic mixed styles example">
  <a href="${data.bookmarkUrl}" target="_blank" type="button" class="btn btn-pink me-2">Visit</a>
  <button onclick="getInfoOfData(${index})" type="button" class="btn btn-secondary me-2">Edit</button>
  <button onclick="deleteData(${index})" type="button" class="btn btn-dark">Delete</button>
</div>
</div>
        `
    })
    bookmarkCardContainer.innerHTML = container;
getDataIntoLocalStorage();
}
function getInfoOfData(index)
{
    bookmarkName.value = containerOfData[index].bookmarkName;
    bookmarkUrl.value = containerOfData[index].bookmarkUrl;
    currentIndex = index;
    submitBtn.innerHTML = "Update Bookmark";

}
function updateData()
{
    let singleData =
        {
            bookmarkName:bookmarkName.value,
            bookmarkUrl:bookmarkUrl.value
        }
        containerOfData[currentIndex] = singleData;
    setDataIntoLocalStorage();
    submitBtn.innerHTML = "Add Bookmark";


}
function setDataIntoLocalStorage()
{
    localStorage.setItem('bookmarkList', JSON.stringify(containerOfData))
}
function getDataIntoLocalStorage()
{
   return JSON.parse(localStorage.getItem('bookmarkList'));
}
function deleteData(index)
{
    containerOfData.splice(index,1);
    setDataIntoLocalStorage();
    displayDataFromInput();
}

searchInput.addEventListener('keyup',function (e)
{
    searchForData(e);

})

function searchForData(e)
{
    let container = '', notExit = true;
    for (let i = 0; i < containerOfData.length; i++)
    {
        if(containerOfData[i].bookmarkName.toLowerCase().includes(e.target.value.toLowerCase()) === true)
        {
            container += `
        <div class="bookmark-card p-2 mb-3 d-flex align-items-center justify-content-between">
         <div class="bookmark-card-name">
                        <h3>${containerOfData[i].bookmarkName}</h3>
          </div>
<div class="btn-group" role="group" aria-label="Basic mixed styles example">
  <a href="${containerOfData[i].bookmarkUrl}" target="_blank" type="button" class="btn btn-pink me-2">Visit</a>
  <button type="button" class="btn btn-secondary me-2">Edit</button>
  <button onclick="deleteData(${i})" type="button" class="btn btn-dark">Delete</button>
</div>
</div>`
            notExit = false;
        }

    }
    if(notExit === true) {
        container += `
            <div class="bookmark-card p-2 mb-3 d-flex align-items-center justify-content-center">
             <div class="bookmark-card-name text-danger text-center">
                            <h3>Data Not Exit</h3>
              </div>
    </div>`
    }


    bookmarkCardContainer.innerHTML = container;
}
function resetForm()
{
    for (let i = 0; i < inputsOfData.length; i++) {
       inputsOfData[i].value = ""
    }
    bookmarkUrl.classList.remove("is-valid");
    bookmarkUrl.classList.remove("is-invalid");

    bookmarkUrlAlert.classList.add("d-none");
    bookmarkUrlAlert.classList.remove("d-block");
    bookmarkName.classList.remove("is-valid");
    bookmarkName.classList.remove("is-invalid");

    bookmarkNameAlert.classList.add("d-none");
    bookmarkNameAlert.classList.remove("d-block");
    submitBtn.disabled = true;

}

function requiredData() {
    if(bookmarkName.value == "" || bookmarkUrl.value == "")
    {
        emptyInputAlert.innerHTML = "Please fill in required fields"
        submitBtn.disabled = true;
        return true;
    }
    else
    {
        emptyInputAlert.innerHTML = ""
        submitBtn.disabled = false;
        return false;

    }
}

function validateBookMarkName() {
    let regex = /^[A-Z][a-z A-z 0-9]{3,9}$/;

    if (regex.test(bookmarkName.value) == true) {
        bookmarkName.classList.add("is-valid");
        bookmarkName.classList.remove("is-invalid");

        bookmarkNameAlert.classList.add("d-none");
        bookmarkNameAlert.classList.remove("d-block");

nameValida = true;
        return true;

    } else {
        bookmarkName.classList.add("is-invalid");
        bookmarkName.classList.remove("is-valid");

        bookmarkNameAlert.classList.add("d-block");
        bookmarkNameAlert.classList.remove("d-none");

        nameValida = false;

        return false;
    }
}
bookmarkName.addEventListener('keyup',validateBookMarkName);
function validateBookURL() {
    let regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    if (regex.test(bookmarkUrl.value) == true) {
        bookmarkUrl.classList.add("is-valid");
        bookmarkUrl.classList.remove("is-invalid");

        bookmarkUrlAlert.classList.add("d-none");
        bookmarkUrlAlert.classList.remove("d-block");

urlValida = true
        return true;

    } else {
        bookmarkUrl.classList.add("is-invalid");
        bookmarkUrl.classList.remove("is-valid");

        bookmarkUrlAlert.classList.add("d-block");
        bookmarkUrlAlert.classList.remove("d-none");
        urlValida = false;


return false
    }
}
bookmarkUrl.addEventListener('keyup',validateBookURL);
for (let i = 0; i < inputsOfData.length; i++) {
    inputsOfData[i].addEventListener('keyup',function (e)
    {
        if(nameValida === true && urlValida === true)
        {
            submitBtn.disabled = false;
        }
        else
        {
            submitBtn.disabled = true;
        }
    })
}
