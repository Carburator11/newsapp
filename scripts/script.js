





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
      document.getElementById("fetch").className =    "inactive";
      document.getElementById("save").className =     "inactive";
      document.getElementById("preview").className =  "inactive";
      document.getElementById("browse").className =   "inactive";
      document.getElementById("raw").className =      "inactive";
      document.getElementById("queue").className =    "inactive";
      document.getElementById(e).className =           "active";

      document.getElementById('f').className = "tab hidden";
      document.getElementById('s').className = "tab hidden";
      document.getElementById('p').className = "tab hidden";
      document.getElementById('b').className = "tab hidden";
      document.getElementById('r').className = "tab hidden";
      document.getElementById('q').className = "tab hidden";
      document.getElementById(e.substring(0,1)).className = "tab visible";

      sessionStorage.setItem("lastview", e);
      currentId();
}




//storing last page viewed in sessionStorage
showclass(sessionStorage.getItem("lastview"));





function edit(e){
  sessionStorage.setItem("currentId", e);
  currentId();
  showclass("preview");
}

function preview(e){
  sessionStorage.setItem("currentId", e);
  currentId();
  showclass("preview");
}

//too lazy to add a parameter for raw in preview function 
function previewRaw(e){
  sessionStorage.setItem("currentId", e);
  currentId();
  showclass("raw");
}



//
