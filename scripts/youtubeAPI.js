$(document).ready(function () {
    
    var youTubeKey = "AIzaSyBf_8C6UB47dfu3Um5v36VfZhuZjaIjigg";
    var youTubeURL = "https://www.googleapis.com/youtube/v3/search?";

    function getVideo() {
        $.ajax({
        type: 'GET',
        url: youTubeURL,
        data: {
            key: youTubeKey,
            q: 'dota',
            part: 'snippet',
            maxResults: 5,
            type: 'video',
            videoEmbeddable: true,
        },
        success: function(data){
            console.log(data);
            embedVideo(data);
        },
        error: function(response){
            console.log("Request Failed");
        }
        });
    }
    
    getVideo();
    
    function embedVideo(data) {
        
        for(i = 0; i < data.items.length; i++) {
            var div = $("<div>");
            div.attr("id", "vidDiv");
            div.addClass("vidDiv");
            var iframe = $("<iframe>");
            var header = $("<h3>");
            var p = $("<p>");
            iframe.attr('src', 'https://www.youtube.com/embed/' + data.items[i].id.videoId)
            header.text(data.items[i].snippet.title)
            p.text(data.items[i].snippet.description)
            div.append(header).append(iframe).append(p);
            $("#dotaYT").append(div);
            
        }
    }
    

    
});