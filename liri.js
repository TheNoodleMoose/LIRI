
let dotenv = require("dotenv").config();

let keys = require("./keys.js");

let fs = require("fs");

let moment = require("moment");

let Spotify = require('node-spotify-api');

let spotify = new Spotify(keys.spotify);

let axios = require("axios");

let command = process.argv[2];

let arguments = process.argv;

let searchTerms = process.argv.splice(3).join(" ");



function runCommand(command, searchTerms) {

    if (command == "spotify-this-song") {
        spotify
            .search({ type: 'track', query: searchTerms })
            .then(function (response) {
                // console.log(response.tracks)

                console.log("=====================")
                console.log(`Name Of Artists: ${response.tracks.items[0].artists[0].name}`)
                console.log(`Name Of Song: ${response.tracks.items[0].name}`)
                console.log(`Preview URL: ${response.tracks.items[0].preview_url}`)
                console.log(`From The Album: ${response.tracks.items[0].album.name}`)
                console.log("=====================")

            })
            .catch(function (err) {
                console.log(err);
            });
    } else if (command == "movie-this") {

        console.log(searchTerms)
        if (searchTerms == null) {
            searchTerms = "Mr.Nobody"
        }
        axios.get("https://www.omdbapi.com/?t=" + searchTerms + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                console.log("======================");
                console.log(`Title Of Movie: ${response.data.Title}`);
                console.log(`Year Released: ${response.data.Year}`);
                console.log(`imdb Rating: ${response.data.imdbRating}`);
                console.log(`Rotten Tomoatoes Score: ${response.data.Ratings[1].Value}`);
                console.log(`Country Filmed In: ${response.data.Country}`);
                console.log(`Languages Of Film: ${response.data.Languages}`);
                console.log(`Plot Of Film: ${response.data.Plot}`);
                console.log(`Actors: ${response.data.Actors}`);
                console.log("======================");
            })

    } else if (command == "concert-this") {

        axios.get("https://rest.bandsintown.com/artists/" + searchTerms + "/events?app_id=codingbootcamp").then(
            function (response) {
                // If the axios was successful...
                // Then log the body from the site!
                for (i = 0; i < response.data.length; i++) {
                    console.log("=========================")
                    console.log(`Artist Lineup: ${response.data[i].lineup.join(", ")}`)
                    console.log(`Venue Name: ${response.data[i].venue.name}`)
                    console.log(`Location: ${response.data[i].venue.city}, ${response.data[i].venue.region}, ${response.data[i].venue.country}`);
                    console.log("Date Of Concert: " + moment(response.data[i].datetime).format("MM/DD/YYYY"))
                    console.log("=========================")
                }
            },

            function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            })

    } else if (command == "do-what-it-says") {
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }
            var dataArr = data.split(",");
            // If the text in random.txt is spotify-this-song run spotify search
            command = dataArr[0];
            searchTerms = dataArr[1];
            runCommand(command, searchTerms);
        })
    } else {
        console.log("COMMAND NOT FOUND")
    }
}

runCommand(command, searchTerms)