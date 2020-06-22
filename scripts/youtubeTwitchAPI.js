$(document).ready(function () {
    
    // var youTubeKey = "AIzaSyBf_8C6UB47dfu3Um5v36VfZhuZjaIjigg";
    // var youTubeURL = "https://www.googleapis.com/youtube/v3/search?";

    // function getVideo() {
    //     $.ajax({
    //     type: 'GET',
    //     url: youTubeURL,
    //     data: {
    //         key: youTubeKey,
    //         q: 'dota',
    //         part: 'snippet',
    //         maxResults: 5,
    //         type: 'video',
    //         videoEmbeddable: true,
    //     },
    //     success: function(data){
    //         console.log(data);
    //         embedVideo(data);
    //     },
    //     error: function(response){
    //         console.log("Request Failed");
    //     }
    //     });
    // }
    
    // getVideo();
    
    // function embedVideo(data) {
        
    //     for(i = 0; i < data.items.length; i++) {
    //         var div = $("<div>");
    //         div.attr("id", "vidDiv");
    //         div.addClass("vidDiv");
    //         var iframe = $("<iframe>");
    //         var header = $("<h3>");
    //         var p = $("<p>");
    //         iframe.attr('src', 'https://www.youtube.com/embed/' + data.items[i].id.videoId)
    //         header.text(data.items[i].snippet.title)
    //         p.text(data.items[i].snippet.description)
    //         div.append(header).append(iframe).append(p);
    //         $("#dotaYT").append(div);
            
    //     }
    // }
    
    
    //Twitch API
    
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
        
        console.log(streamsArr.streams[0]);
        
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
    
    //Calling the twich streams function for each game
   getTwitchStreams("Dota 2", 8, $("#dotaTwitchDiv"));
   getTwitchStreams("Overwatch", 8, $("#overwatchTwitchDiv"));
   getTwitchStreams("League of Legends", 8, $("#lolTwitchDiv"));
   
   

    
});