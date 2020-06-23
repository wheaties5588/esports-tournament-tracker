$(document).ready(function () {
    
    console.log("Heyoooooo");
    
    var mainDiv = $("#mainDiv");
    



//Must be a valid api param from PandaScore

// var psPARAM = "/leagues";
// var psPARAM = "/tournaments";
// var psPARAM = "/tournaments/upcoming";

//Choose how many items are pulled


// Slugs that pull certain games:
// dota-2
// rl
// league-of-legends
// cs-go
// cod-mw
// pubg






function getTournaments(game, amount, location) {
    var psKey = "RtNbglsDqX2pPUZIyGNsGqkWqXozcjYULHffv0Okx2HQidOPryc";
    var psPARAM = game;
    var perPage = amount;
    var psURL = "https://cors-anywhere.herokuapp.com/https://api.pandascore.co" + psPARAM + "?per_page=" + perPage + "&token=" + psKey;

    $.ajax({
        url: psURL,
        method: "GET"
    }).then(function(response) {
        $.map(response, function(game) {
            console.log(game);
            
            $(location).text(game.slug + game.begin_at);
            $(location).addClass("streamTitle")
        });
    });
    

}


getTournaments("/lol/tournaments/upcoming", 2, $("#lolTournamentDiv"));

});
    


