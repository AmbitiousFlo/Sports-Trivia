 var requestUrl = "https://api.imgflip.com/get_memes"
 
var hud = document.getElementById("hud")
 
 fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var memeUrl = data.data.memes[0].url;
    hud.src = memeUrl;
  });


  

