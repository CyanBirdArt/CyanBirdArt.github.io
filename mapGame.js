// Welcome to the inner workings of Mappin
// This version of Mappin uses the 3.x ArcGIS API
// Author: Cyan Bird, 2022

// Defining todays date
const today = new Date();
const date = String(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate());

// Declaring variables:
// Big ol' list of place names, one for each day
let placeName;
if (date ==="2022-7-29") {
    placeName = ["Christchurch, NZL", "Tallinn, EST", "Rio Branco , BRA"];
} else if (date ==="2022-7-30") {
    placeName = ["Nashville, USA", "Manama , BHR", "Nassau , BHS"];
} else if (date ==="2022-7-31") {
    placeName = ["Lima, PER", "Thessaloniki , GRC", "Sana'a , YEM"];
} else if (date ==="2022-8-1") {
    placeName = ["Toulouse, FRA", "Indianapolis, USA", "Zanzibar, TZA"];
};

// Get place names for each round and put them into a google URL for model in HTML
const  place1 = placeName[0];
const  place2 = placeName[1];
const  place3 = placeName[2];
const place1Plus = place1.replaceAll(' ', '+');
const place2Plus = place2.replaceAll(' ', '+');
const place3Plus = place3.replaceAll(' ', '+');
const place1URL = "https://www.google.com/search?q=" + place1Plus;
const place2URL = "https://www.google.com/search?q=" + place2Plus;
const place3URL = "https://www.google.com/search?q=" + place3Plus;
document.getElementById("place1").innerHTML = place1;
document.getElementById("place2").innerHTML = place2;
document.getElementById("place3").innerHTML = place3;
document.getElementById("place1").setAttribute("href", place1URL);
document.getElementById("place2").setAttribute("href", place2URL);
document.getElementById("place3").setAttribute("href", place3URL);

// Map variables
//var map, view, graphicsLayer;

// for the round counter
let roundCounter = 0; // variable previously called i

// Info about the point the user has clicked
let longitudeGuess, latitudeGuess;

// Defining the orange colour used
let initColor = "#ce641d";
let symbolPlace1, symbolPlace2, symbolPlace3;

// Storing highScores data
let highScores, dateCheck;

// Setting the intial value of the Navigation button
document.getElementById("placeRound").innerHTML = "Round 1  of 3: Guess the location of " + placeName[0]

disableButton = () => {
    // Disabling the button to be click while on a round
    document.querySelector("#placeRound").disabled = true;
}

enableButton = () => {
    // Disabling the button to be click while on a round
    document.querySelector("#placeRound").disabled = false;
}


// Checks if game has already been played on browser today
firstToday = () => {
    // dateCheck gets todays date
    dateCheck = new Date().toLocaleDateString();

    if(dateCheck == localStorage.yourapp_date){
        roundCounter = 4 ; // 4 is the value used for finished, as only plays up to 3 rounds
        // Runs mappin() function with roundCounter set to 4 to pop up with modal and not let the user play Mappin
        mappin();
        return false;
    }
    return true;  // MAYBE NEED TO MAKE SURE roundCounter has been changed and is accessible?
}

function runOncePerDay(){
    // If firstToday = false then just return false
    if(!firstToday()) {
        return false;
    };
    // Below code runs if it is true that it is browsers first game today
    // Clear local storage scores from previous days
    localStorage.removeItem('distanceRound1');
    localStorage.removeItem('roundScore1');
    localStorage.removeItem('distanceRound2');
    localStorage.removeItem('roundScore2');
    localStorage.removeItem('distanceRound3');
    localStorage.removeItem('roundScore3');
    localStorage.removeItem('totalScoreModal');
    // Sets roundCounter back to 0 so the game can be played again
    roundCounter = 0;
}

function mappin(){
    require([
        "esri/map", "esri/geometry/webMercatorUtils", "esri/geometry/Extent",
        "esri/tasks/GeometryService","esri/tasks/DistanceParameters", 
        "esri/tasks/locator", "esri/geometry/Point", "esri/geometry/Polyline", 
        "esri/dijit/Scalebar", "esri/dijit/InfoWindow", "esri/graphic",
        "dojo/dom", "dojo/domReady!"
    ], function(
        Map, webMercatorUtils, Extent,
        GeometryService, DistanceParameters, 
        Locator, Point, Polyline,
        Scalebar, InfoWindow, Graphic,
        dom
    ){
        const geometryService = new GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");

        //creating new map 
        map = new Map("mapDiv", {
          basemap: "satellite",
          center: [0,20],
          zoom: 2,
          minZoom: 2,
          maxZoom: 8,
          slider: false,
          constraints: {
            snapToZoom: false,
            rotationEnabled: false
          }
        });
        //adding scalebar to the map
        const scalebar = new Scalebar({
            attachTo: "bottom-left",
            map: map,
            scalebarUnit: "metric"
        });

        // If already played today then get info from localStorage and display modal
        if (roundCounter === 4) {
            document.querySelector("#placeRound").disabled = false;
            const NO_OF_HIGH_SCORES = 1000;
            const HIGH_SCORES = 'highScores';
            const highScoreString = localStorage.getItem(HIGH_SCORES);
            highScores = JSON.parse(highScoreString) ?? [];
            highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
            
            // 2. Sort the list
            highScores.sort((a, b) => b.totalScore- a.totalScore);
        
            // 3. Select new list
            highScores.splice(NO_OF_HIGH_SCORES);
        
            // 4. Save to local storage
            localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
            localStorage.setItem('date',JSON.stringify(date));
        
            const findAverageScore = (arr) => {
               const { length } = arr;
               return arr.reduce((acc, val) => {
                  return acc + (val.totalScore/length);
               }, 0); 
            };

            let roundedAverage = Math.round(findAverageScore(highScores) * 10) / 10
            // If they have already played today then this will come up
            document.getElementById("placeRound").innerHTML = "Click to see and share your score"
            document.getElementById("highScore").innerHTML =    "Highscore:     " + highScores[0].totalScore;
            document.getElementById("averageScore").innerHTML = "Average score: " + roundedAverage;
            totalScore = localStorage.getItem('totalScoreModal');
            document.getElementById("yourScore").innerHTML = "You have already played Mappin today 🌎 \n Your score today: " + totalScore + "/30 points!";

            document.getElementById("distanceRound1").innerHTML = localStorage.getItem('distanceRound1');
            document.getElementById("roundScore1").innerHTML = localStorage.getItem('roundScore1');
            document.getElementById("distanceRound2").innerHTML = localStorage.getItem('distanceRound2');
            document.getElementById("roundScore2").innerHTML = localStorage.getItem('roundScore2');
            document.getElementById("distanceRound3").innerHTML = localStorage.getItem('distanceRound3');
            document.getElementById("roundScore3").innerHTML = localStorage.getItem('roundScore3');

            $('#scoreModal').modal('show');

            

            //add the points on the map for them to see?
            
        }

        locator = new Locator("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"); 
        
        //Find location info of place
        locator.on("address-to-locations-complete", function(evt) {
            let placeLocation = evt.addresses[0];
            placeLong = placeLocation.location.x.toFixed(5);
            placeLat = placeLocation.location.y.toFixed(5);
            mappinGame()
        });

        //Perform the geocode to find x and y of place for each round
        function locate() {
            let placeGeocode = placeName[roundCounter]
            let address = {
                SingleLine: placeGeocode
            };
            let options = {
            address: address,
            outFields: ["*"]
            };
            //return the out fields if you need to calculate the extent of the geocoded point
            locator.addressToLocations(options);
        }

        function mappinGame() {
            // Set map extent based on guess and place x and y
            let xMaxExtent = Math.max(placeLong, longitudeGuess) + 10;
            let xMinExtent = Math.min(placeLong, longitudeGuess) - 10;
            let yMaxExtent = Math.max(placeLat, latitudeGuess) + 10;
            let yMinExtent = Math.min(placeLat, latitudeGuess) - 10;

            let extentRound = new Extent();
            extentRound.xmin = xMinExtent;
            extentRound.ymin = yMinExtent;
            extentRound.xmax = xMaxExtent;
            extentRound.ymax = yMaxExtent;
            map.setExtent(extentRound);

            // Defining point using the lat and long of place
            // placePoint (pt) = correct place lat and long
            // guessPoint (pt2) = guessed location lat and long 
            placePoint = new Point (placeLong, placeLat);
            guessPoint = new Point (longitudeGuess, latitudeGuess);

            // Each place SVG has the number round in a circle
            symbolPlace = new esri.symbol.SimpleMarkerSymbol();
            symbolPlace.setColor(new dojo.Color(initColor));
            symbolPlace.setSize("20");
            let placePath = ""
            if ( roundCounter === 0 ){
                placePath = "M 188.13477 8.7597656 C 149.25147 8.8994267 110.34746 21.663253 77.902344 47.029297 C 60.35193 60.75046 42.792167 81.110386 31.974609 100.28125 C -11.512033 177.34832 8.0314888 274.89358 77.902344 329.51953 C 105.03009 350.72837 137.44252 363.71828 171.39844 366.99023 C 232.24962 372.85372 292.17984 347.10364 329.97461 298.85547 C 348.10116 275.71539 360.437 248.20852 365.59961 219.41602 C 368.74743 201.86091 368.77299 174.81993 365.6582 157.46875 C 357.7053 113.17107 333.94356 73.971169 298.23828 46.238281 C 265.87991 21.105053 227.01802 8.6200955 188.13477 8.7597656 z M 188.00781 41.984375 C 203.65695 41.845553 219.42519 44.25052 234.97266 49.226562 C 246.55634 52.933973 267.60246 63.801406 277.26758 71.066406 C 288.55824 79.553294 304.31709 96.077857 311.61328 107.08203 C 350.40741 165.59168 343.89045 241.42404 295.76758 291.48438 C 282.75553 305.02033 271.7002 313.20898 255.73438 321.13477 C 236.94823 330.46067 223.08702 334.5388 202.98828 336.65625 C 144.48773 342.81934 85.763617 310.7459 58.361328 257.66602 C 29.029141 200.84782 38.65638 133.67117 82.699219 87.849609 C 95.07004 74.97918 106.35441 66.473755 121.23438 58.800781 C 142.52183 47.823722 165.136 42.187245 188.00781 41.984375 z M 203.70703 77.095703 C 199.01519 77.095703 195.8201 77.99414 194.12305 79.791016 C 192.426 81.587889 188.78364 86.379554 183.19336 94.166016 C 177.60308 101.95247 171.16428 108.99023 163.87695 115.2793 C 156.68945 121.56836 147.05556 127.55794 134.97656 133.24805 C 126.89062 137.04145 121.25108 140.13542 118.05664 142.53125 C 114.86219 144.92708 113.26367 148.67057 113.26367 153.76172 C 113.26367 158.15408 114.86219 162.04731 118.05664 165.44141 C 121.35091 168.73568 125.0944 170.38281 129.28711 170.38281 C 138.07183 170.38281 155.14214 160.64974 180.49805 141.18359 L 180.49805 277.44727 C 180.49805 285.43338 182.34353 291.47352 186.03711 295.56641 C 189.73069 299.65929 194.62348 301.70508 200.71289 301.70508 C 214.38911 301.70508 221.22656 291.67253 221.22656 271.60742 L 221.22656 100.15625 C 221.22656 92.968748 219.62999 87.327258 216.43555 83.234375 C 213.2411 79.141494 208.99783 77.095703 203.70703 77.095703 z ";
                symbolPlace1 = symbolPlace.setPath(placePath);
            } else if ( roundCounter === 1 ){
                placePath = "m 43.76453,68.951098 h 20.680912 q 3.090251,0 4.714613,1.267795 1.624363,1.267796 1.624363,3.446819 0,1.941311 -1.307414,3.288344 -1.267795,1.347032 -3.882623,1.347032 H 36.435089 q -2.971396,0 -4.635377,-1.624362 -1.663981,-1.663982 -1.663981,-3.882624 0,-1.426269 1.069702,-3.763767 1.069702,-2.377116 2.337498,-3.724149 5.269274,-5.467367 9.508464,-9.34999 4.239191,-3.922242 6.061647,-5.150419 3.248725,-2.297879 5.38813,-4.595758 2.179023,-2.337497 3.288344,-4.754232 1.14894,-2.456354 1.14894,-4.793851 0,-2.535591 -1.228177,-4.516521 -1.188558,-2.020549 -3.288344,-3.12987 -2.060168,-1.109321 -4.516521,-1.109321 -5.190037,0 -8.161432,4.55614 -0.396186,0.594279 -1.347033,3.248725 -0.911228,2.654447 -2.099786,4.080716 -1.148939,1.42627 -3.4072,1.42627 -1.98093,0 -3.288344,-1.307414 -1.307414,-1.307414 -1.307414,-3.565674 0,-2.733684 1.228177,-5.705079 1.228176,-2.971395 3.644911,-5.38813 2.456354,-2.416735 6.180503,-3.882623 3.763767,-1.505507 8.79533,-1.505507 6.061646,0 10.340455,1.901693 2.773302,1.267795 4.873088,3.486437 2.099786,2.218642 3.248726,5.150418 1.188558,2.892158 1.188558,6.022028 0,4.912707 -2.456353,8.953805 -2.416735,4.001479 -4.952326,6.299358 -2.53559,2.25826 -8.518,7.131348 -5.94279,4.873089 -8.161432,7.567154 -0.950847,1.069702 -1.941312,2.575209 z M 49.953885,5.0334387 C 40.241295,5.0683587 30.523538,8.2600407 22.419131,14.602365 18.035242,18.033097 13.649059,23.123468 10.94696,27.9168 0.0845071,47.18604 4.9662101,71.575477 22.419131,85.233716 c 6.776191,5.30289 14.87234,8.550844 23.354134,9.368936 15.1999,1.466059 30.1698,-4.972064 39.61049,-17.035651 4.5278,-5.785763 7.60912,-12.663305 8.89868,-19.862355 0.7863,-4.38934 0.79259,-11.150627 0.0145,-15.488978 -1.9865,-11.075841 -7.92155,-20.877113 -16.84031,-27.811225 -8.08274,-6.2841133 -17.79013,-9.4059263 -27.5027,-9.3710043 z m -0.21032,6.0750833 c 4.1405,-0.03673 8.3125,0.599583 12.4261,1.916161 3.06485,0.980919 8.6333,3.856262 11.19053,5.77846 2.98732,2.245489 7.15686,6.617614 9.08731,9.529135 10.26428,15.480679 8.53999,35.544658 -4.19252,48.789789 -3.44277,3.581387 -6.36782,5.747967 -10.59211,7.844999 -4.9705,2.467478 -8.63794,3.546483 -13.95573,4.106725 C 38.228875,90.704442 22.691448,82.218342 15.441259,68.17429 7.6804511,53.141142 10.227658,35.36732 21.880659,23.2437 c 3.273113,-3.405301 6.25877,-5.655696 10.195761,-7.685837 5.632305,-2.904347 11.615645,-4.395665 17.667145,-4.449341 z";
                symbolPlace2 = symbolPlace.setPath(placePath);
            } else if ( roundCounter === 2 ){
                placePath = "M 49.953885,5.0334387 C 40.241295,5.0683587 30.523538,8.2600407 22.419131,14.602365 18.035242,18.033097 13.649059,23.123468 10.94696,27.9168 0.0845071,47.18604 4.9662101,71.575477 22.419131,85.233716 c 6.776191,5.30289 14.87234,8.550844 23.354134,9.368936 15.1999,1.466059 30.1698,-4.972064 39.61049,-17.035651 4.5278,-5.785763 7.60912,-12.663305 8.89868,-19.862355 0.7863,-4.38934 0.79259,-11.150627 0.0145,-15.488978 -1.9865,-11.075841 -7.92155,-20.877113 -16.84031,-27.811225 -8.08274,-6.2841133 -17.79013,-9.4059263 -27.5027,-9.3710043 z m -0.21032,6.0750833 c 4.1405,-0.03673 8.3125,0.599583 12.4261,1.916161 3.06485,0.980919 8.6333,3.856262 11.19053,5.77846 2.98732,2.245489 7.15686,6.617614 9.08731,9.529135 10.26428,15.480679 8.53999,35.544658 -4.19252,48.789789 -3.44277,3.581387 -6.36782,5.747967 -10.59211,7.844999 -4.9705,2.467478 -8.63794,3.546483 -13.95573,4.106725 C 38.228875,90.704442 22.691448,82.218342 15.441259,68.17429 7.6804511,53.141142 10.227658,35.36732 21.880659,23.2437 c 3.273113,-3.405301 6.25877,-5.655696 10.195761,-7.685837 5.632305,-2.904347 11.615645,-4.395665 17.667145,-4.449341 z m -1.8587,32.130102 q 3.644912,0 6.25974,-2.139405 2.654446,-2.139404 2.654446,-6.140883 0,-3.050633 -2.099786,-5.229656 -2.099786,-2.218642 -5.66546,-2.218642 -2.416735,0 -4.001479,0.673516 -1.545126,0.673517 -2.456354,1.782838 -0.911228,1.109321 -1.743218,2.852539 -0.792372,1.743219 -1.465889,3.288344 -0.396186,0.831991 -1.426269,1.307414 -1.030084,0.475423 -2.377117,0.475423 -1.584744,0 -2.931776,-1.267795 -1.307414,-1.307414 -1.307414,-3.446818 0,-2.060168 1.228176,-4.318428 1.267796,-2.297879 3.644912,-4.358047 2.416735,-2.060167 5.982409,-3.288344 3.565675,-1.267795 7.96334,-1.267795 3.843004,0 7.012492,1.069702 3.169489,1.030084 5.506986,3.011014 2.337498,1.98093 3.526056,4.595758 1.188558,2.614828 1.188558,5.625842 0,3.96186 -1.743218,6.8144 -1.7036,2.812921 -4.912707,5.506986 3.090251,1.663981 5.190037,3.803386 2.139405,2.139404 3.209107,4.754232 1.069702,2.575209 1.069702,5.586223 0,3.605293 -1.465888,6.972875 -1.42627,3.367581 -4.239191,6.022027 -2.812921,2.614828 -6.695544,4.120335 -3.843004,1.465888 -8.518,1.465888 -4.754232,0 -8.518,-1.703599 -3.763767,-1.7036 -6.22012,-4.239191 -2.416735,-2.575209 -3.684531,-5.308893 -1.228176,-2.733684 -1.228176,-4.516521 0,-2.297879 1.465888,-3.68453 1.505507,-1.42627 3.724149,-1.42627 1.109321,0 2.139404,0.673517 1.030084,0.633897 1.347033,1.545125 2.060167,5.506986 4.397665,8.201051 2.377116,2.654447 6.655925,2.654447 2.456354,0 4.714614,-1.188559 2.297879,-1.228176 3.763768,-3.605293 1.505507,-2.377116 1.505507,-5.506985 0,-4.635377 -2.535591,-7.250205 -2.535591,-2.654446 -7.052111,-2.654446 -0.792373,0 -2.456354,0.158474 -1.663981,0.158474 -2.139405,0.158474 -2.179023,0 -3.367581,-1.069702 -1.188558,-1.109321 -1.188558,-3.050632 0,-1.901693 1.42627,-3.050633 1.42627,-1.188558 4.23919,-1.188558 z"
                symbolPlace3 = symbolPlace.setPath(placePath);
            }
            // Setting the symbolPlace for whatever round it is on, location geocoded later
            symbolPlace.setPath(placePath);

            map.graphics.add(new Graphic(placePoint, symbolPlace));

            // Adding polyline between the two points
            polylineGuess = new Polyline;
            polylineGuess.addPath([placePoint, guessPoint]);
            map.graphics.add(new esri.Graphic(polylineGuess, new esri.symbol.SimpleLineSymbol()));

            // Calculating distance between points
            distParams = new DistanceParameters();
            distParams.distanceUnit = GeometryService.UNIT_KILOMETER;
            distParams.geometry1 = placePoint;
            distParams.geometry2 = guessPoint;
            distParams.geodesic = true;

            distance = geometryService.distance(distParams, function(distance) {
                // Rounding distance to nearest whole number 
                distanceResultRounded = Math.round(distance);

                //convert the result into points scored
                if (distanceResultRounded<= 50){
                    roundScore = 10;
                } else if (distanceResultRounded<= 200){
                    roundScore = 8;
                } else if (distanceResultRounded<= 500){
                    roundScore = 6;
                } else if (distanceResultRounded<= 1500){
                    roundScore = 4;
                }else if (distanceResultRounded<= 3000){
                    roundScore = 2;
                }else {
                    roundScore = 0;
                };

                // Add info pop up window in the centre of two points
                if (roundCounter < 2){
                    map.infoWindow.setContent(distanceResultRounded + "km from " + placeName[roundCounter] + ", scores " + roundScore + " points!");
                    map.infoWindow.setTitle("Score");
                    var xCentre = (Number(placeLong) + Number(longitudeGuess)) / 2;
                    var yCentre = (Number(placeLat) + Number(latitudeGuess)) / 2;
                    var centreOfLine = new Point(xCentre, yCentre);
                    map.infoWindow.show(centreOfLine, InfoWindow.ANCHOR_UPPERLEFT);
                } else {};

                // Putting scores into element that can be called in HTML
                if ( roundCounter === 0) {
                    //save gemetries from round 1 into variable
                    place1pt = placePoint
                    guess1pt = guessPoint
                    // Adding to HTML elements
                    document.getElementById("distanceRound1").innerHTML = distanceResultRounded;
                    document.getElementById("roundScore1").innerHTML = roundScore;
                    // Saving to local storage for future reference
                    localStorage.setItem('distanceRound1', distanceResultRounded);
                    localStorage.setItem('roundScore1', roundScore);
                    roundScore1 = roundScore
                    // Setting the button to click for next round and enabling button
                    document.getElementById("placeRound").innerHTML = roundScore1 + " points! Click here for next round";
                    document.querySelector("#placeRound").disabled = false;
                    // Adding one to round counter to go to next item in array, 'next round'
                    roundCounter ++;
                    // allows you to pan the map around
                    document.getElementById('mapDiv').style.pointerEvents = 'auto';
                } else if (roundCounter === 1){
                    // Save geometries from round 2
                    place2pt = placePoint;
                    guess2pt = guessPoint;
                    document.getElementById("distanceRound2").innerHTML = distanceResultRounded;
                    document.getElementById("roundScore2").innerHTML = roundScore;
                    localStorage.setItem('distanceRound2', distanceResultRounded);
                    localStorage.setItem('roundScore2', roundScore);
                    roundScore2 = roundScore;
                    // Setting the button to click for next round and enabling button
                    document.getElementById("placeRound").innerHTML = roundScore1 + " points! Click here for next round";
                    document.querySelector("#placeRound").disabled = false;
                    // Adding one to round counter to go to next item in array, 'next round'
                    roundCounter ++;
                    // allows you to pan the map around
                    document.getElementById('mapDiv').style.pointerEvents = 'auto';
                } else if (roundCounter === 2){
                    // Save geometries from round 3
                    place3pt = placePoint;
                    guess3pt = guessPoint;
                    document.getElementById("distanceRound3").innerHTML = distanceResultRounded;
                    document.getElementById("roundScore3").innerHTML = roundScore;
                    localStorage.setItem('distanceRound3', distanceResultRounded);
                    localStorage.setItem('roundScore3', roundScore);
                    // Save score and work out total score
                    roundScore3 = roundScore;
                    totalScore = roundScore1 +roundScore2 + roundScore3;
                    saveHighScore(totalScore, highScores);
                    // Add one to the round counter
                    roundCounter ++;
                    // Setting details of HTML elements
                    document.getElementById("yourScore").innerHTML = "Your score today: " + totalScore+ "/30 points!";
                    localStorage.setItem('totalScoreModal', totalScore);
                    let arrayMessage = [];
                    const getRandom = (arrayMessage) => {
                      return arrayMessage[Math.floor(Math.random() * arrayMessage.length)];
                    };
                    //Giving random messages depending on score
                    if ( totalScore === 0 ) {
                      arrayMessage = ["One to forget, you", "Ouch! You", "Can't do any worse tomorrow, you"];
                    } else if ( totalScore < 7) {
                      arrayMessage = ["Not your best, you", "Could be worse, you", "Oh dear! You"];
                    } else if ( totalScore < 13) {
                      arrayMessage = ["Not even half, you", "Seen worse, you", "Not even half, you"];
                    } else if ( totalScore < 18) {
                      arrayMessage = ["Middle of the road, you", "Down the middle! You", "Nearly there! You"];
                    } else if ( totalScore < 25) {
                      arrayMessage = ["Hard to beat! You", "Nicely done! You", "Promising stuff! You"];
                    } else if ( totalScore < 30) {
                      arrayMessage = ["Amazing! You", "Flying high! You", "Congratulations! You"];
                    } else if ( totalScore === 30) {
                      arrayMessage = ["100%! You", "Flawless! You", "Perfect! You"];
                    } else {
                      arrayMessage = ["Congratulations, you" ];
                    }
                    document.getElementById("placeRound").innerHTML = getRandom(arrayMessage) + " scored " + totalScore+ "/30 points! Click for score breakdown";
                    $('#scoreModal').modal('show');
                    document.querySelector("#placeRound").disabled = false;
                    // add geometries from rounds 1 and 2 to the map
                    map.graphics.add(new Graphic(place1pt, symbolPlace1));
                    map.graphics.add(new Graphic(guess1pt, symbolGuess));
                    map.graphics.add(new Graphic(place2pt, symbolPlace2));
                    map.graphics.add(new Graphic(guess2pt, symbolGuess));
                    var polylineGuess1 = new Polyline;
                    polylineGuess1.addPath([place1pt, guess1pt]);
                    map.graphics.add(new esri.Graphic(polylineGuess1, new esri.symbol.SimpleLineSymbol()));
                    var polylineGuess2 = new Polyline;
                    polylineGuess2.addPath([place2pt, guess2pt]);
                    map.graphics.add(new esri.Graphic(polylineGuess2, new esri.symbol.SimpleLineSymbol()));
                    // allows you to pan the map around
                    document.getElementById('mapDiv').style.pointerEvents = 'auto';
                } else {};
            })
        }

        // Function defining the logic to play each round
        function playRound(evt){
            // Definining the SVG paths for the guess pin and places
            // Guess pin always looks the same:
            let iconPathGuess = "M 12.408203 0.98242188 A 4.3063169 4.6209335 0 0 0 8.1015625 5.6035156 A 4.3063169 4.6209335 0 0 0 9.2382812 8.7226562 L 12.244141 14.019531 L 15.429688 8.8789062 A 4.3063169 4.6209335 0 0 0 16.712891 5.6035156 A 4.3063169 4.6209335 0 0 0 12.408203 0.98242188 z M 12.453125 3.1855469 A 2.2288775 2.3748119 0 0 1 14.681641 5.5605469 A 2.2288775 2.3748119 0 0 1 12.453125 7.9355469 A 2.2288775 2.3748119 0 0 1 10.224609 5.5605469 A 2.2288775 2.3748119 0 0 1 12.453125 3.1855469 z M 11.693359 14.017578 L 11.693359 23.794922 L 11.693359 14.017578 z ";
            symbolGuess = new esri.symbol.SimpleMarkerSymbol();
            symbolGuess.setPath(iconPathGuess);
            symbolGuess.setColor(new dojo.Color(initColor));
            symbolGuess.setOutline(null);    // removes the outline, if locator svg is redesigned could add it back in, but currently shows up the background over the invisble parts of the svg path
            symbolGuess.setSize("30");
            // Hide the infoWindow and 
            map.infoWindow.hide();
            mapPoint = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
            map.graphics.add(new Graphic(evt.mapPoint, symbolGuess));
            latitudeGuess = mapPoint.y.toString();
            longitudeGuess = mapPoint.x.toString();
            locate();
        } 

        // Function to allow functionality when map is clicked
        map.on("click", function(evt, mapPoint){
            if (document.querySelector("#placeRound").disabled === false){
                // Do nothing between rounds
                return;
            } else if ( roundCounter < 3){
                // Produce popup window to confirm guess
                map.infoWindow.setTitle("Are you sure?");
                let checkButton = document.createElement("button");
                checkButton.innerHTML = "Confirm Guess";
                map.infoWindow.setContent(checkButton);
                map.infoWindow.show(evt.screenPoint);
                // when checkButton is clicked run the game
                checkButton.onclick = function(){
                    playRound(evt, mapPoint);
                }
            } else {}
        })
    })
}

// Function to define the behaviour of the placeRound button 
function navigateButton() {
    if (roundCounter === 3) {
        // If they have finished the game clicking the button loads the score Modal again
        document.getElementById("placeRound").innerHTML.onclick = $('#scoreModal').modal('show');
    } else if (roundCounter === 4) {
        // To show modal when button is clicked if already played today
        document.getElementById("placeRound").innerHTML.onclick = $('#scoreModal').modal('show');
    } else if ( roundCounter < 3){
        map.graphics.clear();
        map.infoWindow.hide();
        document.getElementById('mapDiv').style.pointerEvents = 'auto';
        document.getElementById("placeRound").innerHTML = "Round "+ (roundCounter + 1 ) +" of 3: Guess the location of " + placeName[roundCounter];
        document.querySelector("#placeRound").disabled = true;
        return 
    }
} 

function copyClipboard(){
    // to Copy score to clipboard and url to mappin-game.com to share 
    let urlMappin = new URL('https://mappin-game.com/');
    navigator.clipboard.writeText("I scored " + totalScore + " points on Mappin! 🌎 Can you beat my daily score? " + urlMappin);
    document.getElementById("copyClip").innerHTML = "Copied to clipboard, paste to share!";
}
  
function saveHighScore(totalScore, highScores, date) {
    // Function to save highScores in localStorage
    let dateScoreList = [];
    let dateScore = {
        'totalScore': totalScore,
        'date': date
    };

    dateScoreList.push(dateScore);
    dateScoreList = dateScoreList.concat(JSON.parse(localStorage.getItem('dateScoreList')||'[]'));

    localStorage.setItem("showList", JSON.stringify(dateScoreList));
    localStorage.yourapp_date = dateCheck;

    const NO_OF_HIGH_SCORES = 1000;
    const HIGH_SCORES = 'highScores';
    const highScoreString = localStorage.getItem(HIGH_SCORES);
    highScores = JSON.parse(highScoreString) ?? [];
    highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
    const newScore = { totalScore};
    
    // 1. Add to list
    highScores.push(newScore);
  
    // 2. Sort the list
    highScores.sort((a, b) => b.totalScore- a.totalScore);
    
    // 3. Select new list
    highScores.splice(NO_OF_HIGH_SCORES);
    
    // 4. Save to local storage
    localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
    localStorage.setItem('date',JSON.stringify(date));
  
    const findAverageScore = (arr) => {
        const { length } = arr;
        return arr.reduce((acc, val) => {
            return acc + (val.totalScore/length);
        }, 0); 
    };
  
    let roundedAverage = Math.round(findAverageScore(highScores) * 10) / 10;
  
    document.getElementById("highScore").innerHTML =    "Highscore:     " + highScores[0].totalScore;
    currentHighscore = highScores[0].totalScore;
    document.getElementById("averageScore").innerHTML = "Average score: " + roundedAverage;
    currentAvgScore = roundedAverage;
};
  

// Function to disable the button while it is not meant to navigate
disableButton();

// Function to check if already run once today to run at the start
runOncePerDay();

// Function to run mappin and create the initial map on the screen to allow the onclick
mappin();

