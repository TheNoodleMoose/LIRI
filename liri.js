
//Initializes dotenv and requires it
let dotenv = require("dotenv").config();
//Initializes keys.js and requires it
let keys = require("./keys.js");
//Initializes fs and requires it
let fs = require("fs");
//Initializes moment and requires it
let moment = require("moment");
//Initializes spotify api and requires it
let Spotify = require('node-spotify-api');
//Initializes the key codes for spotify and requires it
let spotify = new Spotify(keys.spotify);
//Initializes axios and requires it
let axios = require("axios");
//Sets the second index of process.argv to be the command
let command = process.argv[2];
//Sets searchTerm to be equal to the spliced and rejoined string of what the user types in
let searchTerms = process.argv.splice(3).join(" ");

//This is the function that runs the whole liri bot
//It takes in the arguments of command and  searchTerms
function runCommand(command, searchTerms) {
    //THIS RUNS THE SPOTIFY-THIS-SONG COMMAND
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
    //THIS RUNS THE MOVIE-THIS COMMAND
    } else if (command == "movie-this") {
        //This checks if searchTerms is null than set searchTerms to Mr.Nobody
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
    //THIS RUNS THE CONCERT-THIS COMMAND
    } else if (command == "concert-this") {

        axios.get("https://rest.bandsintown.com/artists/" + searchTerms + "/events?app_id=codingbootcamp").then(
            function (response) {
                // If the axios was successful...
                for (i = 0; i < response.data.length; i++) {
                    console.log("=========================")
                    console.log(`Artist Lineup: ${response.data[i].lineup.join(", ")}`)
                    console.log(`Venue Name: ${response.data[i].venue.name}`)
                    console.log(`Location: ${response.data[i].venue.city}, ${response.data[i].venue.region}, ${response.data[i].venue.country}`);
                    console.log("Date Of Concert: " + moment(response.data[i].datetime).format("MM/DD/YYYY"))
                    console.log("=========================")
                }
            },
            //If there is an error run this..
            function (error) {
                if (error.response) {
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
    //THIS RUNS THE DO-WHAT-IT-SAYS COMMAND
    } else if (command == "do-what-it-says") {
        //This reads the random.txt file
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }
            
            //This function will grab a random command from random.txt and run it
            function grabCommand() {
                //This grabs a random number between 0 and 5 and stores it in index
                let index = Math.floor(Math.random() * 6);
                //If index is even  than set command to index and searchTerms to index + 1
                //Then run the runCommand Function
                if(index % 2 == 0) { 
                    var dataArr = data.split(",");
                    command = dataArr[index];
                    searchTerms = dataArr[(index + 1)];
                    runCommand(command, searchTerms);
                } else {
                    //If the index is off than run again until it grabs a even number
                    grabCommand();
                }
            }
            grabCommand();
            
            
        })
    //If the command is not one of the options than console log this
    } else {
        console.log("COMMAND NOT FOUND")
    }
}
//Run the runCommand function right from the start
runCommand(command, searchTerms)