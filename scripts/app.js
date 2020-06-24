$(document).ready(function () {

// PANDASCORE AIP
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
        console.log(response);
        
        for (i = 0; i < response[0].matches.length; i++) {
            // console.log(response[0].matches[i]);
            var div = $("<div>").addClass("matchupDiv");
            var name = $("<p>").addClass("matchupName");
            var time = $("<p>").addClass("matchupTime");
            
            
            name.text(response[0].matches[i].name)
            time.text(response[0].matches[i].begin_at)
            
            div.append(name, time);
            location.append(div);
        }
        
        
        
        // $.map(response, function(game) {
        //     console.log(game);
            
        //     $(location).text(game.slug + game.begin_at);
        //     $(location).addClass("streamTitle")
        // });
    });
    
}


    //TWITCH API
    
    function getTwitchStreams(game, amount, placement) {
        var twitchQuery = game;
        var twitchLimit = amount; 
        var twitchStreams = "https://cors-anywhere.herokuapp.com/https://api.twitch.tv/kraken/streams/?game=" + twitchQuery + "&limit=" + twitchLimit  + "&api_version=5&language=en";
        
        var twitchId = "5im67pxtrmahhr4u8f270ntw5l5srp";
        
        $.ajax({
            type: "GET",
            url: twitchStreams,
            headers: {"Client-ID": twitchId}
        }).then(function(res) {
            renderTwitchStreams(res, placement);
        });
    }
      
    //Render streams for Dota
    function renderTwitchStreams(arr, placement) {
        var streamsArr = arr;
        
        for (i = 0; i < streamsArr.streams.length; i++) {
            var anchor = $("<a>");
            var div = $("<div>");
            var img = $("<img>");
            var title = $("<h5>");
            var description = $("<p>");
            
            title.addClass("streamTitle");
            title.text(streamsArr.streams[i].channel.display_name);
            
            description.addClass("streamDescription");
            description.text(streamsArr.streams[i].channel.status);
            
            anchor.addClass("twitchLink");
            anchor.attr("href", streamsArr.streams[i].channel.url);
            anchor.attr("target", "_blank");
            
            div.addClass("twitchStreamDiv");
            
            img.addClass("streamImg");
            img.attr("src", streamsArr.streams[i].preview.medium);
            
            div.append(img);
            div.append(title);
            div.append(description);
            
            anchor.append(div);
            placement.append(anchor); 
        }
        
    }






// Parse out by URL to run functions

var loc = window.location.href;
var locArr = loc.split("/");

if (locArr[locArr.length - 1] == "overwatch.html"){
    
    console.log("RU4 overwatch!!!")
    getTournaments("/ow/tournaments", 2, $("#owTournamentDiv"));
    getTwitchStreams("Overwatch", 8, $("#overwatchTwitchDiv"));
    
    
} else if (locArr[locArr.length - 1] == "dota2.html") {
    
    console.log("RU4 DOTAAAAA!!!")
    getTournaments("/dota2/tournaments/upcoming", 2, $("#dotaTournamentDiv"));
    getTwitchStreams("Dota 2", 8, $("#dotaTwitchDiv"));
    
    
} else if (locArr[locArr.length - 1] == "leagueoflegends.html") {
    
    console.log("RU4 LOLLLLLL!!!")
    getTournaments("/lol/tournaments/upcoming", 2, $("#lolTournamentDiv"));
    getTwitchStreams("League of Legends", 8, $("#lolTwitchDiv"));
    
    
} else {}






});
    


