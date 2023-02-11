let countryPage = false;

let countriesVisited = [];
let userName = "";
let countryName = "";
let isNewUser = "";

// function callSavedData(){
//     $(".countries-visited-container").empty()
//     let storedData = localStorage.getItem("countries")
//     if (storedData === null){
//         countriesVisited = []
//     } else if (typeof storedData === "string"){
//         countriesVisited.push(storedData)
//         displayHistory(countriesVisited)
//     } else {
//         storedData.forEach(function(element){
//             countriesVisited.push(element)
//         })
//         displayHistory(countriesVisited)
//     } 
// }
// function displayHistory (array){
//     $(".countries-visited-container").empty()
//     if (array.length === 1){
//         let newDiv = $(`<div>${array[0]}</div>`)
//         $(".countries-visited-container").append(newDiv)       
//     }
//     else {
//         array.forEach(function(element){
//             let newDiv = $(`<div>${element}</div>`)
//             $(".countries-visited-container").append(newDiv)
//         })
//     }
// }

// logs weather response based on city parameter
function getWeatherCondition(city) {

    console.log("The value of city: " + city);
    // API Key for Open Weather API
    const weatherApiKey = "3102f3b643256623c7321b2ed4853779"
    // Constructing a URL to search for current weather data
    const queryURLCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`;


    // Performing AJAX GET request
    $.ajax({
        url: queryURLCurrent,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {
            clear()
            let info = $(`<p class="speech-bubble-text">The Weather in ${city} is ${response.weather[0].description}!</p>`);
            $(".speech-bubble-container").append(info);
        })
        
}


$(function () {
    // retrieves saved values and displays them topleft
    // callSavedData()
    // Home Page
    if (!countryPage) {
        let welcomeMessage = $(`<p class="speech-bubble-text">Hi User, I'm Globey. What is your name?</p>`);
        $(".speech-bubble-container").append(welcomeMessage);
        $("#flag-container").empty()
        $(".btns-container").addClass("hide")
        $("#radio-div").addClass("hide")
    }
    // Input form for user name
    $("#name-input-form").on("submit", function (event) {
        event.preventDefault();
        countryPage = true;
        userName = $("#name-input").val().trim();
        console.log("The value of userName: " + userName)
        $("#name-input").val("");
        $("#name-input-form").hide();
        $("#country-input-form").removeClass("hide");
        $(".speech-bubble-text").hide();
        welcomeMessage = $(`<p class="speech-bubble-text">Hi! Where are you going today</p>`);
        $(".speech-bubble-container").append(welcomeMessage);
    });

    $("#country-input-form").on("submit", function (event) {
        event.preventDefault();
        countryName = $("#country-input").val().trim();
        console.log("The value of countryName: " + countryName)
        $("#country-input-form").val("");
        $("#country-input-form").hide();
        $("#welcome").removeClass("hide");
        $(".speech-bubble-text").hide();
        $("#globey-container").removeClass("hide");
        console.log("The value of countryName: " + countryName)
        var queryURLCountry = "https://restcountries.com/v2/name/" + countryName;
        $.ajax({
            url: queryURLCountry,
            method: "GET"
            // ,
            // error: function (err) {
            //     displayErrorScreen();
            // }
        }).then(function (response) {
            console.log("The value of response[0].name: " + response[0].name);
            welcomeMessage = (`<p class="speech-bubble-text">Welcome to ${response[0].name}`);
            $(".speech-bubble-container").append(welcomeMessage);
            $("#flag-container").empty();
            let flag = $(`<img src="${response[0].flag}" class="flag">`);
            $("#flag-container").append(flag);
            
            // $(".btns-container").removeClass("hide");
            // $(".speech-bubble-container").append(welcomeMessage);
            // $("#radio-div").removeClass("hide");
            // $("#saveBtn").removeClass("hide");
            // $("#saveBtn").text("I've been to ${response[0].name}");

        });
    });

    $("#welcome-globey").on("click", function (event) {
        event.preventDefault();
        // $(".speech-bubble-text").hide();
        console.log("The value of countryName: " + countryName)

        var queryURLCountry = "https://restcountries.com/v2/name/" + countryName;
        $.ajax({
            url: queryURLCountry,
            method: "GET"
            // ,
            // error: function (err) {
            //     displayErrorScreen();
            // }
        }).then(function (response) {
            console.log("The value of 1st ${response[0].name}: " + response[0].name);
            // welcomeMessage = (`<p class="speech-bubble-text">Welcome to ${response[0].name}`)
            // $(".speech-bubble-container").append(welcomeMessage);
            $("#flag-container").empty();
            let flag = $(`<img src="${response[0].flag}" class="flag">`)
            $("#flag-container").append(flag);
        });
    });
    $("#welcome-globey").on("click", function (event) {
        event.preventDefault();
        $(".speech-bubble-text").hide();

        var queryURLCountry = "https://restcountries.com/v2/name/" + countryName;
        $.ajax({
            url: queryURLCountry,
            method: "GET"
            // ,
            // error: function (err) {
            //     displayErrorScreen();
            // }
        }).then(function (response) {
            console.log("The value of 2nd ${response[0].name}: " + response[0].name);
            welcomeMessage = (`<p class="speech-bubble-text">What would you like to know about ${response[0].name} ?`);
            // $("#flag-container").hide();
            $(".speech-bubble-container").append(welcomeMessage);
            $(".btns-container").removeClass("hide");
            $('#radio-div').removeClass("hide");
            $('#saveBtn').removeClass("hide");
            $('#saveBtn').text(`I've been to ${response[0].name} `);
        })
    });
    // Search
    // $("#search-form").on("submit", function (event) {
    //     event.preventDefault();
        // countryPage = true;
        // $(".countries-visited-container").addClass("hide")
        // clear();
        // let countryName = $("#search-input").val().trim()
        // $("#search-input").val("")
        // console.log(countryName);
        // const countriesURL = `https://restcountries.com/v2/name/${countryName}`

    //     $.ajax({
    //         url: countriesURL,
    //         method: "GET",
    //         error: function (err) {
    //             displayErrorScreen();
    //         }
    //     }).then(function (response) {
    //         $("#globey").attr("src", "assets/images/Global Image.svg")
    //         welcomeMessage = (`<p class="speech-bubble-text">Welcome to ${response[0].name}`)
    //         $(".btns-container").removeClass("hide")
    //         $(".speech-bubble-container").append(welcomeMessage)
    //         $('#radio-div').removeClass("hide")
    //         $('#saveBtn').removeClass("hide")
    //         $('#saveBtn').text(`I've been to ${response[0].name} `)


    //         // Add Flag
    //         $("#flag-container").empty();
    //         let flag = $(`<img src="${response[0].flag}" class="flag">`)
    //         $("#flag-container").append(flag)

            // Add functionality to buttons
            $(".btns-container").on("click", ".btn", function (event) {
                event.preventDefault()
                let buttonClicked = event.target.innerHTML;
                var queryURLCountry = "https://restcountries.com/v2/name/" + countryName;
                $.ajax({
                    url: queryURLCountry,
                    method: "GET"
                    // ,
                    // error: function (err) {
                    //     displayErrorScreen();
                    // }
                }).then(function (response) {
                showInfo(response, buttonClicked);
                });
            })

            // saves country name
            $('#saveBtn').click(function (event) {
                event.preventDefault()
                let countryToSave = response[0].name;
                countriesVisited.push(countryToSave);
                localStorage.setItem("countries", countriesVisited);
                callSavedData();
            })

        // })
    // })

    // Home Button
    $("#home-button").click(function(event){
        // countryPage = false;
        $("#flag-container").empty()
        $(".btns-container").addClass("hide")
        $("#radio-div").addClass("hide")
        $(".countries-visited-container").removeClass("hide")
        $("#saveBtn").addClass("hide")
        $("#globey").attr("src", "assets/images/Global Image.svg")
        clear()
        let welcomeMessage = $(`<p class="speech-bubble-text">Hi User, Welcome back to the home page</p>`);
        $(".speech-bubble-container").append(welcomeMessage);

    })
})

// $(document).ready(function () {
//     $("#globey-1").on("click", function (event) {
//         // Prevent the default behavior
//         event.preventDefault();

//         // create user object from submission
//         let userInput = [{
//             name: $("#name-input").val(),
//             country: $("#country-input").val(),
//             newUser: $("#check").is(":checked"),
//         }];

//         console.log("The value of userInput: " + JSON.stringify(userInput));
//         console.log("The value of user.name: " + userInput[0].name);
//         console.log("The value of user.country: " + userInput[0].country);
//         console.log("The value of user.visit: " + userInput[0].newUser);

//         var userInf = JSON.parse(localStorage.getItem("userLog"));
//         console.log("The value getting from localStorage: " + JSON.stringify(userInf));
        
//         userInf.push(userInput[0]);
//         localStorage.setItem("userLog", JSON.stringify(userInf));
//         var userInf2 = JSON.parse(localStorage.getItem("userLog"));
//         console.log("The value getting from localStorage after pushing: " + JSON.stringify(userInf2));
//         console.log("No. of Users: " + userInf2.length);
//     });
// })

//Function to empty out the speechbubble
function clear() {
    $(".speech-bubble-container").empty();
  }

// Function to display the country info in the bubble
function showInfo(response, buttonClicked) {
    clear();
    console.log("The value of response: " + response);
    let info;
    switch (buttonClicked){
        case 'Population':
            info = $(`<p class="speech-bubble-text">${response[0].name} has a population of ${response[0].population} people!</p>`);
            $(".speech-bubble-container").append(info);
            break;
        case 'Weather':
            getWeatherCondition(response[0].capital)
            break;
        case 'Capital':
            info = $(`<p class="speech-bubble-text">The capital of ${response[0].name} is ${response[0].capital}!</p>`);
            $(".speech-bubble-container").append(info);
            break;
        case 'Currency':
            info = $(`<p class="speech-bubble-text">In ${response[0].name}, the local currency is ${response[0].currencies[0].name}, ${response[0].currencies[0].symbol}!</p>`)
            $(".speech-bubble-container").append(info);
            break;
        case 'Language':
            info =  $(`<p class="speech-bubble-text">In ${response[0].name}, they speak ${response[0].languages[0].name}!</p>`);
            $(".speech-bubble-container").append(info);
            break;
        case 'Region':
            info = $(`<p class="speech-bubble-text">In case you weren't sure, ${response[0].name} is located in ${response[0].subregion}!</p>`);
            $(".speech-bubble-container").append(info);
            break;
    }   
}

// function displayErrorScreen(){
//     let errorMessage = $(`<p class="speech-bubble-text">Oh Oh! I don't think that's a country </p>`);
//     $(".speech-bubble-container").append(errorMessage);
//     $("#globey").attr("src", "assets/images/sad-globey.svg")
//     $(".flag-container").empty()
//     $(".btns-container").addClass("hide")
//     $("#saveBtn").addClass("hide")
// }
