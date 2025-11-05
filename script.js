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