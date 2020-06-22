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
    
    //var twitchQuery = "Overwatch";
    var twitchQuery = "Dota 2";
    var twitchSearchStreams = "https://cors-anywhere.herokuapp.com/https://api.twitch.tv/kraken/streams/?game=" + twitchQuery + "&api_version=5&limit=10&language=en";
    
    var twitchSearchGames = "https://cors-anywhere.herokuapp.com/https://api.twitch.tv/kraken/search/games?query=" + twitchQuery + "&api_version=5";
    
    var twitchSearchChannels = "https://cors-anywhere.herokuapp.com/https://api.twitch.tv/kraken/search/channels?query=" + twitchQuery + "&api_version=5";
    
    var twitchId = "5im67pxtrmahhr4u8f270ntw5l5srp";
    
    $.ajax({
        type: "GET",
        url: twitchSearchStreams,
        headers: {"Client-ID": twitchId},
        success: function (json) {
        console.log(json);
        }
    });

    
    
});