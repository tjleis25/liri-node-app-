// Require Keys
// =================================================

require("dotenv").config();

var keys = require("./keys.js");

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require('request');

var fs = require("fs");

//Twitter
// ==================================================
var getTweets = function() {

    //pull keys from keys.js
    var client = new Twitter(keys.twitter);
   
    var params = {screen_name: 'Tejota33922523'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        //console.log(tweets);
        for(var i = 0; i< tweets.length; i++) {
            console.log(tweets[i].created_at);
            console.log('');
            console.log(tweets[i].text)
        }
      }
    });
}

// Spotify
// =================================================
var getArtistNames = function(artist){
    return artist.name;
}
var getSpotify = function(songName) {
 
    //pull keys form keys.js
    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
        } 
        
        // console.log(data);
        // console.log(data.tracks.items[0]);   
        var songs = data.tracks.items; 
        for(var i = 19; i< songs.length; i++){
            
            console.log('artist(s): ' + songs[0].artists.map(getArtistNames));
            console.log('song name: ' + songs[0].name); 
            console.log('preview link: ' + songs[0].preview_url);
            console.log('album: ' + songs[0].album.name);
            console.log('-----------------------------------------');
        }       
        
    });
}

// OMDB
// ===================================================
var getMovie = function(movieName){

    request('http://www.omdbapi.com/?t=' + movieName + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
    
    var body = JSON.parse(body);
    console.log('Title: ' + body.Title);
    console.log('Year: ' + body.Year);
    console.log('imdb Rating: ' + body.imdbRating);
    console.log('Rotten Tomatoes: ' + body.Ratings[1].Value);
    console.log('Country: ' + body.Country);
    console.log('Language: ' + body.Language);
    console.log('Plot: ' + body.Plot);
    console.log('Actors: ' + body.Actors);
});
}

// fs 
// ===================================================
var doWhatItSays = function(){
    fs.readFile("random.text", "utf8", function(error, data) {

    // If an error was experienced we say it.
    if (error) throw err;

    var dataArr = data.split(',');

    if(dataArr.length == 2){
        pick(dataArr[0], dataArr[1]);
    } else if (dataArr.length == 1){
        pick(dataArr[0]);
    }

    });
}
    
// Switch Statements to hold different arguments from user
// ===================================================

var pick = function(caseData, functionData) {
    switch(caseData) {
        case 'my-tweets':
             getTweets();
             break;

        case 'spotify-this-song':
            if(functionData){
                getSpotify(functionData);
            } else {
                getSpotify('ace of base, sign');
            }
            break;

        case 'movie-this':
            if(functionData){
                getMovie(functionData);
            } else {
                getMovie('Mr. Nobody');
            }
            break;

        case 'do-what-it-says':
                doWhatItSays();
                break;
            }
            
    }


var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);

