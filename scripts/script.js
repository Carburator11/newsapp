





//CREATE tab :  generates the URLs
var customId = document.getElementById('customInput').value;
function customInput(){
      customId = document.getElementById('customInput').value;
      document.getElementById("customExtUrl").href = "https://newsapp-carb11.herokuapp.com/" + customId ;
      document.getElementById("customExtUrl").innerHTML = "https://newsapp-carb11.herokuapp.com/" + customId ;
      document.getElementById("customLocalUrl").href = "localhost:5000/" + customId ;
      document.getElementById("customLocalUrl").innerHTML = "localhost:5000/" + customId ;
      document.getElementById("submitCustom").action = "/admin/save/"+ customId;
  }


//tab browsing menu.
//ugly solution : could have used Jquery toggleclasses but I don't want too many external modules on this project
function showclass(e){
      document.getElementById("create").className =  "inactive";
      document.getElementById("preview").className = "inactive";
      document.getElementById("browse").className =  "inactive";
      document.getElementById("edit").className =    "inactive";
      document.getElementById("deploy").className =  "inactive";
      document.getElementById(e).className =         "active";

      document.getElementById('c').className = "tab hidden";
      document.getElementById('p').className = "tab hidden";
      document.getElementById('b').className = "tab hidden";
      document.getElementById('e').className = "tab hidden";
      document.getElementById('d').className = "tab hidden";
      document.getElementById(e.substring(0,1)).className = "tab visible";

      sessionStorage.setItem("lastview", e);
}




//storing last page viewed in sessionStorage
showclass(sessionStorage.getItem("lastview"));

document.getElementById("current").innerHTML =  sessionStorage.getItem("currentId") ;   //;

function edit(e){
  sessionStorage.setItem("currentId", e);
  document.getElementById("current").innerHTML = sessionStorage.getItem("currentId");
  showclass("edit");
}

function preview(e){
  sessionStorage.setItem("currentId", e);
  
  showclass("edit");
}


//
