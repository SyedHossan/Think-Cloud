var clicks = 7;
var likes = 7

function onClick() {
    if (clicks == likes)
    {
        clicks += 1;
    }else {
        clicks -= 1;
    }
    
  document.getElementById("clicks").innerHTML = clicks;
};

filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterSelection");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    exploreRemoveClass(x[i], "exploreShow");
    if (x[i].className.indexOf(c) > -1) exploreAddClass(x[i], "exploreShow");
  }
}

function exploreAddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

function exploreRemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}


var buttonContainer = document.getElementById("filterButtons");
var buttons = buttonContainer.getElementsByClassName("exploreBtn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}