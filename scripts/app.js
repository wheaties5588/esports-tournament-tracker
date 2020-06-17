$(document).ready(function () {
    
    console.log("Heyoooooo");
    
    var mainDiv = $("#mainDiv");
    

var psKey = "RtNbglsDqX2pPUZIyGNsGqkWqXozcjYULHffv0Okx2HQidOPryc";

//Must be a valid api param from PandaScore
// var psPARAM = "/teams";
// var psPARAM = "/leagues";
// var psPARAM = "/tournaments";
var psPARAM = "/tournaments/upcoming";

//Choose how many items are pulled
var perPage = "?per_page=80";

var psURL = "https://cors-anywhere.herokuapp.com/https://api.pandascore.co" + psPARAM + perPage  + "&search[slug]=dota-2" + "&token=" + psKey;



$.ajax({
    url: psURL,
    method: "GET"
}).then(function(response) {
    console.log((response));
    $.map(response, function(i) {
        console.log(i);
        var div = $("<div>");
        div.attr("id", "tourneyDiv");
        div.addClass("tourneyDiv");
        var tournyImg = $("<img>");
        tournyImg.attr("src", i.league.image_url);
        div.append(tournyImg);
        
        div.append($("<p>").text("League: " + i.league.name));
        div.append($("<p>").text("Stage: " + i.name));
        mainDiv.append(div);
        
    })

}); 

});
    