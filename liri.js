
let dotenv = require("dotenv").config();

let keys = require("./keys.js");

let fs = require("fs");

let moment = require("moment");

let Spotify = require('node-spotify-api');

let spotify = new Spotify(keys.spotify);

let axios = require("axios");

let command = process.argv[2];

let arguments = process.argv;

let searchTerms = "";

if (command == "spotify-this-song") {
    for (i = 3; i < arguments.length; i++) {
        searchTerms += arguments[i] + " ";
    }
    spotify
        .search({ type: 'track', query: searchTerms })
        .then(function (response) {
            // console.log(response.tracks)
            for (i = 0; i < response.tracks.items.length; i++) {
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
} else if (command == "movie-this") {
    for (i = 3; i < arguments.length; i++) {
        searchTerms += arguments[i] + " ";
    }
    axios.get("https://www.omdbapi.com/?t=" + searchTerms + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("======================");
            console.log(`Title Of Movie: ${response.data.Title}`);
            console.log(`Year Released: ${response.data.Year}`);
            console.log(`imdb Rating: ${response.data.imdbRating}`);
            console.log(`Country Filmed In: ${response.data.Country}`);
            console.log(`Languages Of Film: ${response.data.Languages}`);
            console.log(`Plot Of Film: ${response.data.Plot}`);
            console.log(`Actors: ${response.data.Actors}`);
            console.log(`Metascore: ${response.data.Metascore}`);
            console.log("======================");
        })

} else if (command == "concert-this") {
    for (i = 3; i < arguments.length; i++) {
        searchTerms += arguments[i];
    }

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
        if (dataArr[0] == "spotify-this-song") {
            spotify
                .search({ type: 'track', query: dataArr[1] })
                .then(function (response) {
                    // console.log(response.tracks)
                    for (i = 0; i < response.tracks.items.length; i++) {
                        console.log("=====================")
                        console.log(`Name Of Artists: ${response.tracks.items[i].artists[0].name}`)
                        console.log(`Name Of Song: ${response.tracks.items[i].name}`)
                        console.log(`Preview URL: ${response.tracks.items[i].preview_url}`)
                        console.log(`From The Album: ${response.tracks.items[i].album.name}`)
                        console.log("=====================")
                    }
                })
        } else if (dataArr[0] == "concert-this") {
            axios.get("https://rest.bandsintown.com/artists/" + dataArr[1] + "/events?app_id=codingbootcamp").then(
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

        } else if (dataArr[0] == "movie-this") {
            axios.get("https://www.omdbapi.com/?t=" + dataArr[1] + "&y=&plot=short&apikey=trilogy").then(
                function (response) {
                    console.log("======================");
                    console.log(`Title Of Movie: ${response.data.Title}`);
                    console.log(`Year Released: ${response.data.Year}`);
                    console.log(`imdb Rating: ${response.data.imdbRating}`);
                    console.log(`Country Filmed In: ${response.data.Country}`);
                    console.log(`Languages Of Film: ${response.data.Languages}`);
                    console.log(`Plot Of Film: ${response.data.Plot}`);
                    console.log(`Actors: ${response.data.Actors}`);
                    console.log(`Metascore: ${response.data.Metascore}`);
                    console.log("======================");
                })
        }
        else {
            console.log("Command Not Found")
        }



    })
} else {
    console.log("COMMAND NOT FOUND")
}