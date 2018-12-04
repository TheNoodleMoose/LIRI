
let dotenv = require("dotenv").config();

let keys = require("./keys.js");

let Spotify = require('node-spotify-api')

let spotify = new Spotify(keys.spotify);

let command = process.argv[2];

let arguments = process.argv;

let searchTerms = "";

if (command == "spotify-this-song") {
    for (i = 3; i < arguments.length; i++) {
        searchTerms += arguments[i] + " ";
    }
    spotify
        .search({type: 'track', query: searchTerms})
        .then(function (response) {
            // console.log(response.tracks)
            for(i=0; i < response.tracks.items.length; i++) {
                console.log("=====================")
                console.log(`Name Of Artists: ${response.tracks.items[i].artists[0].name}`)
                console.log(`Name Of Song: ${response.tracks.items[i].name}`)
                console.log(`Preview URL: ${response.tracks.items[i].preview_url}`)
                console.log(`From The Album: ${response.tracks.items[i].album.name}`)
                console.log("=====================")
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}