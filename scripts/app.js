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


    // Bulma dropdown fix
    var dropdown = $(".dropdown");
    dropdown.on("click", function(event) {
    event.preventDefault();
    dropdown.toggleClass("is-active");
    });
    
    //Get tournaments
    function getTournaments(game, amount, location) {
        var psKey = "RtNbglsDqX2pPUZIyGNsGqkWqXozcjYULHffv0Okx2HQidOPryc";
        var psPARAM = game;
        var perPage = amount;
        var psURL = "https://cors-anywhere.herokuapp.com/https://api.pandascore.co" + psPARAM + "?per_page=" + perPage + "&token=" + psKey;

        $.ajax({
            url: psURL,
            method: "GET"
        }).then(function(response) {
            
             // Populate dropdown
             //console.log(response);
             var dropList = $("#dropdownContent");
             
             for(i = 0; i < response.length; i++) {
                 // console.log(response);
                 var ddItem = $("<a>");
                 ddItem.addClass("dropdown-item");
                 ddItem.text(response[i].serie.full_name + " - " + response[i].league.name  + " - " + response[i].name);
                 ddItem.attr("tourneyValue", i);
                 
                 dropList.append(ddItem);
             }
                 
             //Dropdown item on click evennt to pull tournaments
             $("#dropdownContent").on("click", function(ev) {
                ev.preventDefault();
                var target = $(ev.target);
                 
                if (target.hasClass("dropdown-item")){
                     renderMatches(target.attr("tourneyValue"));
                }
            });
                
            //Populate matches for tournament on click
            function renderMatches(index) {
                location.html("");
                var tourneyName = $("<div>");
                var tName = $("<p>");
                var tUpcomingSub = $("<p>");
                tourneyName.addClass("tournamentName")
                tName.text(response[index].serie.full_name + " - " + response[index].league.name  + " - " + response[index].name);
                
                if (game == "/ow/tournaments"){
                    tUpcomingSub.text("Matches:");
                } else {
                    tUpcomingSub.text("Upcoming Matches:");
                }
                
                tourneyName.append(tName, tUpcomingSub);
                location.append(tourneyName);
                
                for (i = 0; i < response[index].matches.length; i++) {
                    var div = $("<div>").addClass("matchupDiv");
                    var name = $("<p>").addClass("matchupName");
                    var time = $("<p>").addClass("matchupTime");
                    var matchDate = $("<p>").addClass("matchupDate");
                    var winner = $("<p>").addClass("winner");
                    
                    name.text(response[index].matches[i].name)
                    
                    var str = response[index].matches[i].begin_at;
                    var date = moment(str);
                    var dateComponent = date.utc().format('MM-DD-YYYY');
                    var timeComponent = date.utc().format('HH:mm:ss');
        
                    time.text("Match Time: " + timeComponent);
                    matchDate.text("Match Date: " + dateComponent);
                    
                    div.append(name, matchDate, time);
                    
                    // Get winner id, if there is one, the loop through teams to get the team name
                    if (response[index].matches[i].winner_id !== null && typeof response[index].matches[i].winner_id !== "undefined") {
                  
                        for (x = 0; x < response[index].teams.length; x++) {
                            
                           if (response[index].matches[i].winner_id  == response[index].teams[x].id) {
                                console.log(response[index].teams[x].name);
                                winner.text("Winner: " + response[index].teams[x].name);
                                div.append(winner);
                           }

                        }
                    } 
                            
                    location.append(div);
                }
                
            }
            
            // function getWinner(response, match) {
            //     console.log(response.teams);
                
            //     for (i = 0; i < response.teams.length; i++) {
            //         if (match.winner_id == response.teams[i].id)
            //         console.log("Winner: " + response.teams[i].name)
            //     }
                
                // if (match.winnerId !== null) {
                    
                //     console.log(match.winner_id);
                //     var winner = $("<p>")
                // }
                
           // }
            
            // Render first series in list on page load
            renderMatches(0);
            
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
        getTournaments("/ow/tournaments", 10, $("#owTournamentDiv"));
        getTwitchStreams("Overwatch", 8, $("#overwatchTwitchDiv"));
        
        
    } else if (locArr[locArr.length - 1] == "dota2.html") {
        
        console.log("RU4 DOTAAAAA!!!")
        getTournaments("/dota2/tournaments", 10, $("#dotaTournamentDiv"));
        getTwitchStreams("Dota 2", 8, $("#dotaTwitchDiv"));
        
        
    } else if (locArr[locArr.length - 1] == "leagueoflegends.html") {
        
        console.log("RU4 LOLLLLLL!!!")
        getTournaments("/lol/tournaments", 10, $("#lolTournamentDiv"));
        getTwitchStreams("League of Legends", 8, $("#lolTwitchDiv"));
        
        
    } else {}



});
    