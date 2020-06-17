$(document).ready(function () {
    
    console.log("Heyoooooo");
    
    var p = $("<p>");
    $("body").append(p);

var psKey = "RtNbglsDqX2pPUZIyGNsGqkWqXozcjYULHffv0Okx2HQidOPryc";

//Must be a valid api param from PandaScore
// var psPARAM = "/teams";
// var psPARAM = "/leagues";
// var psPARAM = "/tournaments";
var psPARAM = "/tournaments/upcoming";

var psURL = "https://cors-anywhere.herokuapp.com/https://api.pandascore.co" + psPARAM + "?token=" + psKey;



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
    