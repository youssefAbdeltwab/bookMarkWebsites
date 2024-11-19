

var siteNameInput =  document.getElementById("siteNameInput");
var siteUrlInput =  document.getElementById("siteUrlInput");
var deleteBtn =  document.getElementById("deleteBtn");
var visitBtn =  document.getElementById("visitBtn");
var submitBtn =  document.getElementById("submitBtn");
var validationMessage =  document.querySelector('.invalid-feedback');
var invalidUrl  =  document.getElementById("invalidUrl");
var modal  =  document.getElementById("modal");
var modalMessage =  document.getElementById("modalMessage");
var btnClose  =  document.querySelectorAll(".close");

var websiteContainer;

if(localStorage.getItem("websitesList") == null)
{
    websiteContainer =  [];
}
else
{
    websiteContainer =  JSON.parse(localStorage.getItem("websitesList"));
    displayWebsites();

}

function addSite()
{

    var website = 
    {  
        name: siteNameInput.value,  
        uRl: siteUrlInput.value
    }

    websiteContainer.push(website);

    localStorage.setItem("websitesList" , JSON.stringify(websiteContainer));


    displayWebsites();

}

function validation()
{
    var siteNameRegex =  /^[A-Ya-z]{3,}$/;
    var siteUrlRegex  =  /^(https?:\/\/)?(www\.)[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/[a-zA-Z0-9\/?#]+)*$/;

    if(siteNameRegex.test(siteNameInput.value)  ==  true
      &&
        siteUrlRegex.test(siteUrlInput.value) ==  true)
    {
        return  true;
    }
    else
    {
        return  false;
    }
      
}

function displayAddMessage()
{
    modal.classList.add("d-block");
    modalMessage.innerHTML =  "Website Add successfully!";

}

function displayAlertNonAdd()
{
    modal.classList.add("d-block");
    modalMessage.innerHTML =  "Site Name or Url is not valid, Please follow the rules!";

}

for (var i = 0;  i  <  btnClose.length;  i++)
{
    btnClose[i].addEventListener("click" , function(){

        console.log("hello  from  modal");    
    
        if(modal.classList.contains("d-block"))
        {
            modal.classList.remove("d-block");
            modal.classList.remove("d-none");
    
            console.log("hello  from  modal");    
        }
    
    
    });
          

}

siteNameInput.addEventListener("keyup" , function(){

    var siteNameRegex =  /^[A-Ya-z]{3,}$/;
    
    if(siteNameRegex.test(siteNameInput.value)  ==  true)
    {
        siteNameInput.classList.replace("is-invalid",  "is-valid");
        if(validationMessage.classList.contains("d-block"))
        {
            validationMessage.classList.remove("d-block");
        }

        console.log("valid");
    }
    else
    {
        siteNameInput.classList.add("is-invalid");
      
        validationMessage.classList.add("d-block");
        validationMessage.innerHTML =  `invalid website name please  enter name contain  at least 3  charachters`;
        console.log("invalid");

    }
   

});

siteUrlInput.addEventListener("keyup" , function(){

    var siteUrlRegex =  /^(https?:\/\/)?(www\.)[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/[a-zA-Z0-9\/?#]+)*$/;

    if(siteUrlRegex.test(siteUrlInput.value)  ==  true)
    {
        siteUrlInput.classList.replace("is-invalid",  "is-valid");
     
        if(invalidUrl.classList.contains("d-block"))
        {
            invalidUrl.classList.remove("d-block");
        }
        console.log("valid");

    }
    else
    {
        siteUrlInput.classList.add("is-invalid");
    
        invalidUrl.classList.add("d-block");
        invalidUrl.innerHTML =  " please  enter a valid  URL";
        console.log("invalid");

    }

});

submitBtn.addEventListener("click",  function(eventInfo){

    if(validation()  ==  true)
    {
     
        addSite();
        displayAddMessage();
        
    }
    else
    {
        displayAlertNonAdd();
    }

    
}  );

function deleteSite(siteIndex)
{
    websiteContainer.splice(siteIndex, 1);
    localStorage.setItem("websitesList", JSON.stringify(websiteContainer));

    displayWebsites();
}

function displayWebsites()
{
    var container =  ``;

    for( var i  =0;  i< websiteContainer.length;  i++)
    {
        container += ` 
       
        <tr  class="fs-5  mb-3  ">

            <td  >${i +  1}</td>
            <td  class="text-capitalize">${websiteContainer[i].name}  </td>
            <td> <a href="${websiteContainer[i].uRl}" class="btn btn-success  px-3" id="visitBtn"  target="_blank"  onclick="">  <i class="fa-regular fa-eye"></i>  Visit</a></td>
            <td> <button  type="submit" class="btn  btn-danger  px-3" id="deleteBtn"   onclick="deleteSite(${i})"> <i class="fa-solid fa-trash"></i>  delete</button></td>

         </tr>
        
        `;
    }
    document.getElementById("tableBody").innerHTML  =  container;
}


