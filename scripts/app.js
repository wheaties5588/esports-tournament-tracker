// Header/Burger Menu Functionality
(function() {
    var burger = document.querySelector('.burger');
    var nav = document.querySelector('#'+burger.dataset.target);

    burger.addEventListener('click', function() {
        burger.classList.toggle('is-active');
        nav.classList.toggle('is-active');
    })
})();
// End Header/Burger Menu Functionality

$(document).ready(function () {
    
    console.log("Heyoooooo");
    
    var mainDiv = $("#mainDiv");
    

var psKey = "RtNbglsDqX2pPUZIyGNsGqkWqXozcjYULHffv0Okx2HQidOPryc";

//Must be a valid api param from PandaScore
var psPARAM = "/lol/teams";
// var psPARAM = "/leagues";
// var psPARAM = "/tournaments";
// var psPARAM = "/tournaments/upcoming";

//Choose how many items are pulled
var perPage = "?per_page=10";

// Slugs that pull certain games:
// dota-2
// rl
// league-of-legends
// cs-go
// cod-mw
// pubg


var slug = "&search[slug]=team-liquid";

var psURL = "https://cors-anywhere.herokuapp.com/https://api.pandascore.co" + psPARAM + perPage + "&token=" + psKey;



$.ajax({
    url: psURL,
    method: "GET"
}).then(function(response) {
    console.log((response));
    $.map(response, function(i) {
        console.log(i);
        
    })

}); 

});
    