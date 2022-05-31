var map, view, graphicsLayer, i, roundScore, roundScore1, roundScore2, roundScore3, totalScore, highScores, datecheck, currentAvgScore, currentHighscore;

var latitudeGuess, longitudeGuess, mp, pt, pt2, polylineGuess, placeLat, placeLong, symbolGuess, symbolPlace, distParams, distanceResultRounded, extentMap, xMaxExtent, xMinExtent, yMaxExtent, yMinExtent

var xMinExtent1, xMinExtent2, yMinExtent1, yMinExtent2, xMaxExtent1, xMaxExtent2, yMaxExtent1, yMaxExtent2, guess1pt, guess2pt, place1pt, place2pt, jsonConst


// checks if one day has passed. 
function hasOneDayPassed(){
  // get today's date. eg: "7/37/2007"
  datecheck = new Date().toLocaleDateString();

  // if there's a date in localstorage and it's equal to the above: 
  // inferring a day has yet to pass since both dates are equal.
  if( localStorage.yourapp_date == datecheck ) {
    alert('has been run before');

    i = 4
    mappy()
        return false;

  }

  // PUT IN LOGIC HERE FOR IF GAME HAS ALREADY BEEN PLAYED ON THIS DAY


  // this portion of logic occurs when a day has passed

  return true;
  
}


// some function which should run once a day
function runOncePerDay(){
  if( !hasOneDayPassed() ) return false;

  // your code below
  alert('Good morning!');
  i = 0

}


runOncePerDay(); // run the code

let today = new Date()
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
date = String(date)
console.log(date)

// List of places for each day

if (date == "2022-5-22") {
    console.log("Date is working")
    jsonConst = [
      {
          "round": "1",
          "place": "New York",
          "placeLatitude": "40.7128",
          "placeLongitude": "-74.0060"
          
      },
      {
          "round": "2",
          "place": "Zagreb",
          "placeLatitude": "45.8150",
          "placeLongitude": "15.9819"
      },
      {
          "round": "3",
          "place": "Santiago",
          "placeLatitude": "-33.4489",
          "placeLongitude": "-70.6693"
      }
    ]
  } else if (date ==="2022-5-23") {
    jsonConst = [
        {
            "round": "1",
            "place": "Edinburgh",
            "placeLatitude": "55.9533",
            "placeLongitude": "-3.1883"
            
        },
        {
            "round": "2",
            "place": "Mexico City",
            "placeLatitude": "19.4326",
            "placeLongitude": "-99.1332"
        },
        {
            "round": "3",
            "place": "Marrakesh",
            "placeLatitude": "31.6295",
            "placeLongitude": "-7.9811"
        }
    ]} 
    else if (date ==="2022-5-24") {
    jsonConst = [
        {
            "round": "1",
            "place": "Paris",
            "placeLatitude": "48.8566",
            "placeLongitude": "2.3522"
            
        },
        {
            "round": "2",
            "place": "Beijing",
            "placeLatitude": "39.9042",
            "placeLongitude": "116.4074"
        },
        {
            "round": "3",
            "place": "Havana",
            "placeLatitude": "23.1136",
            "placeLongitude": "-82.3666"
        }
    ]} else if (date ==="2022-5-25") {
  jsonConst = [
      {
          "round": "1",
          "place": "Seoul",
          "placeLatitude": "37.5665",
          "placeLongitude": "126.9780"
          
      },
      {
          "round": "2",
          "place": "Los Angeles",
          "placeLatitude": "34.0522",
          "placeLongitude": "-118.2437"
      },
      {
          "round": "3",
          "place": "Antananarivo",
          "placeLatitude": "-18.8792",
          "placeLongitude": "47.5079"
      }
  ]} else if (date ==="2022-5-26") {
  jsonConst = [
      {
          "round": "1",
          "place": "Venice",
          "placeLatitude": "45.4408",
          "placeLongitude": "12.3155"
          
      },
      {
          "round": "2",
          "place": "Reykjavík",
          "placeLatitude": "64.1466",
          "placeLongitude": "-21.9426"
      },
      {
          "round": "3",
          "place": "Paramaribo",
          "placeLatitude": "5.8520",
          "placeLongitude": "-55.2038"
      }
  ]} else if (date ==="2022-5-27") {
  jsonConst = [
      {
          "round": "1",
          "place": "Luxembourg City",
          "placeLatitude": "49.6116",
          "placeLongitude": "6.1319"
          
      },
      {
          "round": "2",
          "place": "Cape Town",
          "placeLatitude": "-33.9249",
          "placeLongitude": "18.4241"
      },
      {
          "round": "3",
          "place": "Okayama",
          "placeLatitude": "34.6555",
          "placeLongitude": "133.9198"
      }
  ]} else if (date ==="2022-5-28") {
  jsonConst = [
      {
          "round": "1",
          "place": "Osaka",
          "placeLatitude": "34.6937",
          "placeLongitude": "135.5023"
          
      },
      {
          "round": "2",
          "place": "Auckland",
          "placeLatitude": "-36.8509",
          "placeLongitude": "174.7645"
      },
      {
          "round": "3",
          "place": "Kaohsiung City",
          "placeLatitude": "22.6273",
          "placeLongitude": "120.3014"
      }
  ]} else if (date ==="2022-5-29") {
  jsonConst = [
      {
          "round": "1",
          "place": "Barcelona",
          "placeLatitude": "41.3874",
          "placeLongitude": "2.1686"
          
      },
      {
          "round": "2",
          "place": "Louisville",
          "placeLatitude": "38.2527",
          "placeLongitude": "-85.7585"
      },
      {
          "round": "3",
          "place": "Tripoli",
          "placeLatitude": "32.8872",
          "placeLongitude": "13.1913"
      }
  ]} else if (date ==="2022-5-30") {
  jsonConst = [
      {
          "round": "1",
          "place": "Vancouver",
          "placeLatitude": "49.2827",
          "placeLongitude": "-123.1207"
          
      },
      {
          "round": "2",
          "place": "Ho Chi Minh City",
          "placeLatitude": "10.8231",
          "placeLongitude": "106.6297"
      },
      {
          "round": "3",
          "place": "Ashgabat",
          "placeLatitude": "37.9601",
          "placeLongitude": "58.3261"
      }
  ]} else if (date ==="2022-5-31") {
  jsonConst = [
      {
          "round": "1",
          "place": "Melbourne",
          "placeLatitude": "-37.8136",
          "placeLongitude": "144.9631"
          
      },
      {
          "round": "2",
          "place": "Strasbourg",
          "placeLatitude": "48.5734",
          "placeLongitude": "7.7521"
      },
      {
          "round": "3",
          "place": "Chișinău",
          "placeLatitude": "47.0105",
          "placeLongitude": "28.8638"
      }
  ]} else if (date ==="2022-6-1") {
  jsonConst = [
      {
          "round": "1",
          "place": "Rio de Janeiro",
          "placeLatitude": "-22.9068",
          "placeLongitude": "-43.1729"
          
      },
      {
          "round": "2",
          "place": "Gloucester",
          "placeLatitude": "51.8642",
          "placeLongitude": "-2.2382"
      },
      {
          "round": "3",
          "place": "Santa Cruz de la Sierra",
          "placeLatitude": "-17.8146",
          "placeLongitude": "-63.1561"
      }
  ]} else if (date ==="2022-6-2") {
  jsonConst = [
      {
          "round": "1",
          "place": "Belfast",
          "placeLatitude": "54.5973",
          "placeLongitude": "-5.9301"
          
      },
      {
          "round": "2",
          "place": "Charlotte",
          "placeLatitude": "35.2271",
          "placeLongitude": "-80.8431"
      },
      {
          "round": "3",
          "place": "Nuuk",
          "placeLatitude": "64.1814",
          "placeLongitude": "-51.6941"
      }
  ]} else if (date ==="2022-6-3") {
  jsonConst = [
      {
          "round": "1",
          "place": "Adelaide",
          "placeLatitude": "-34.9285",
          "placeLongitude": "138.6007"
          
      },
      {
          "round": "2",
          "place": "Bologna",
          "placeLatitude": "44.4949",
          "placeLongitude": "11.3426"
      },
      {
          "round": "3",
          "place": "Nadi",
          "placeLatitude": "-17.7765",
          "placeLongitude": "177.4356"
      }
  ]} else if (date ==="2022-6-4") {
  jsonConst = [
      {
          "round": "1",
          "place": "Jakarta",
          "placeLatitude": "-6.2088",
          "placeLongitude": "106.8456"
          
      },
      {
          "round": "2",
          "place": "Berlin",
          "placeLatitude": "52.5200",
          "placeLongitude": "13.4050"
      },
      {
          "round": "3",
          "place": "Saskatoon",
          "placeLatitude": "52.1579",
          "placeLongitude": "-106.6702"
      }
  ]} else if (date ==="2022-6-5") {
  jsonConst = [
      {
          "round": "1",
          "place": "Lisbon",
          "placeLatitude": "38.7223",
          "placeLongitude": "-9.1393"
          
      },
      {
          "round": "2",
          "place": "Dubai",
          "placeLatitude": "25.2048",
          "placeLongitude": "55.2708"
      },
      {
          "round": "3",
          "place": "Abidjan",
          "placeLatitude": "5.3600",
          "placeLongitude": "-4.0083"
      }
  ]} else if (date ==="2022-6-6") {
  jsonConst = [
      {
          "round": "1",
          "place": "Seattle",
          "placeLatitude": "47.6062",
          "placeLongitude": "-122.3321"
          
      },
      {
          "round": "2",
          "place": "Naples",
          "placeLatitude": "40.8518",
          "placeLongitude": "14.2681"
      },
      {
          "round": "3",
          "place": "Chișinău",
          "placeLatitude": "47.0105",
          "placeLongitude": "28.8638"
      }
  ]} else if (date ==="2022-6-7") {
  jsonConst = [
      {
          "round": "1",
          "place": "Mumbai",
          "placeLatitude": "19.0760",
          "placeLongitude": "72.8777"
          
      },
      {
          "round": "2",
          "place": "Wellington",
          "placeLatitude": "-41.2924",
          "placeLongitude": "174.7787"
      },
      {
          "round": "3",
          "place": "Bogotá",
          "placeLatitude": "4.7110",
          "placeLongitude": "-74.0721"
      }
  ]} else if (date ==="2022-6-8") {
  jsonConst = [
      {
          "round": "1",
          "place": "Copenhagen",
          "placeLatitude": "55.6761",
          "placeLongitude": "12.5683"
          
      },
      {
          "round": "2",
          "place": "Kathmandu",
          "placeLatitude": "27.7172",
          "placeLongitude": "85.3240"
      },
      {
          "round": "3",
          "place": "Kampala",
          "placeLatitude": "0.3476",
          "placeLongitude": "32.5825"
      }
  ]} else if (date ==="2022-6-9") {
  jsonConst = [
      {
          "round": "1",
          "place": "Houston",
          "placeLatitude": "29.7604",
          "placeLongitude": "-95.3698"
          
      },
      {
          "round": "2",
          "place": "Lagos",
          "placeLatitude": "6.5244",
          "placeLongitude": "3.3792"
      },
      {
          "round": "3",
          "place": "Batumi",
          "placeLatitude": "41.6168",
          "placeLongitude": "41.6367"
      }
  ]} else if (date ==="2022-6-10") {
  jsonConst = [
      {
          "round": "1",
          "place": "Helsinki",
          "placeLatitude": "60.1699",
          "placeLongitude": "24.9384"
          
      },
      {
          "round": "2",
          "place": "Dhaka",
          "placeLatitude": "23.8103",
          "placeLongitude": "90.4125"
      },
      {
          "round": "3",
          "place": "Mecca",
          "placeLatitude": "21.3891",
          "placeLongitude": "39.8579"
      }
  ]} else if (date ==="2022-6-11") {
  jsonConst = [
      {
          "round": "1",
          "place": "Athens",
          "placeLatitude": "37.9838",
          "placeLongitude": "23.7275"
          
      },
      {
          "round": "2",
          "place": "Perth",
          "placeLatitude": "-31.9523",
          "placeLongitude": "115.8613"
      },
      {
          "round": "3",
          "place": "Zhangzhou",
          "placeLatitude": "24.5135",
          "placeLongitude": "117.6472"
      }
  ]} else if (date ==="2022-6-12") {
  jsonConst = [
      {
          "round": "1",
          "place": "Prague",
          "placeLatitude": "50.0755",
          "placeLongitude": "14.4378"
          
      },
      {
          "round": "2",
          "place": "Kyoto",
          "placeLatitude": "35.0116",
          "placeLongitude": "135.7681"
      },
      {
          "round": "3",
          "place": "Casablanca",
          "placeLatitude": "33.5731",
          "placeLongitude": "-7.5898"
      }
  ]} else if (date ==="2022-6-13") {
  jsonConst = [
      {
          "round": "1",
          "place": "Detroit",
          "placeLatitude": "42.3314",
          "placeLongitude": "-83.0458"
          
      },
      {
          "round": "2",
          "place": "Budapest",
          "placeLatitude": "47.4979",
          "placeLongitude": "19.0402"
      },
      {
          "round": "3",
          "place": "Kalfatellsstadhur",
          "placeLatitude": "64.1829",
          "placeLongitude": "-15.8720"
      }
  ]}



document.getElementById("placeRound").innerHTML = "Round 1  of 3: Guess the location of " + jsonConst[0].place

// Get place names for each round and put them into a google URL
const  place1 = jsonConst[0].place;
const place1Plus = place1.replaceAll(' ', '+');
const place1URL = "https://www.google.com/search?q=" + place1Plus

const  place2 = jsonConst[1].place
const place2Plus = place2.replaceAll(' ', '+');
const place2URL = "https://www.google.com/search?q=" + place2Plus

const  place3 = jsonConst[2].place
const place3Plus = place3.replaceAll(' ', '+');
const place3URL = "https://www.google.com/search?q=" + place3Plus

document.getElementById("place1").innerHTML = place1
document.getElementById("place2").innerHTML = place2
document.getElementById("place3").innerHTML = place3

document.getElementById("place1").setAttribute("href", place1URL)
document.getElementById("place2").setAttribute("href", place2URL)
document.getElementById("place3").setAttribute("href", place3URL)

// defining function which is the engine to run a round in mappyGame
function mappy() { 
  require([
    "esri/map", "esri/geometry/webMercatorUtils", "esri/geometry/Extent",
    "esri/tasks/GeometryService","esri/tasks/DistanceParameters",
    "esri/geometry/Point", "esri/geometry/Polyline", 
    "esri/dijit/Scalebar",
    "esri/graphic", "esri/InfoTemplate", "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol", "esri/Color", "dojo/dom", "dojo/domReady!"
  ], function(
    Map, webMercatorUtils, Extent,
    GeometryService, DistanceParameters,
    Point, Polyline,
    Scalebar,
    Graphic, InfoTemplate, SimpleMarkerSymbol,
    SimpleLineSymbol, Color, dom
  ) {

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

      var iconPathGuess = "M 12.408203 0.98242188 A 4.3063169 4.6209335 0 0 0 8.1015625 5.6035156 A 4.3063169 4.6209335 0 0 0 9.2382812 8.7226562 L 12.244141 14.019531 L 15.429688 8.8789062 A 4.3063169 4.6209335 0 0 0 16.712891 5.6035156 A 4.3063169 4.6209335 0 0 0 12.408203 0.98242188 z M 12.453125 3.1855469 A 2.2288775 2.3748119 0 0 1 14.681641 5.5605469 A 2.2288775 2.3748119 0 0 1 12.453125 7.9355469 A 2.2288775 2.3748119 0 0 1 10.224609 5.5605469 A 2.2288775 2.3748119 0 0 1 12.453125 3.1855469 z M 11.693359 14.017578 L 11.693359 23.794922 L 11.693359 14.017578 z ";
      var iconPathPlace = "M 10.847962,21.681107 C 8.4647718,21.425658 6.2030711,20.412787 4.491961,18.834662 1.6055107,16.172542 0.60444516,12.272705 1.8999584,8.737035 2.9867676,5.7709529 5.4640821,3.4861712 8.6801085,2.483827 12.511282,1.2897588 16.744023,2.2139564 19.628637,4.8743835 c 4.197141,3.8709466 4.197826,10.0915345 0.0015,13.9616955 -1.740107,1.604869 -3.950246,2.585592 -6.413278,2.845817 -0.655297,0.06923 -1.718966,0.06888 -2.368933,-7.9e-4 z M 8.3060514,17.987082 c 0.00724,-0.0082 0.02898,-2.085782 0.0483,-4.616923 l 0.035129,-4.6020745 1.2206845,4.6169235 1.2206841,4.616923 h 1.242628 c 0.683446,0 1.243897,-0.0067 1.245447,-0.01485 0.0016,-0.0082 0.564853,-2.086258 1.251782,-4.61798 l 1.248963,-4.603132 0.0041,1.544276 c 0.0023,0.849352 0.02329,2.927444 0.04676,4.617981 l 0.04266,3.073704 h 1.180878 1.180877 V 12.032709 6.0634863 h -1.957155 -1.957155 l -0.13261,0.4603131 c -0.07294,0.2531723 -0.569734,2.0238931 -1.103996,3.9349356 -0.534262,1.911042 -0.99216,3.521887 -1.017551,3.579657 -0.029,0.06598 -0.467993,-1.391491 -1.180732,-3.920087 L 9.7911669,6.0931839 7.8506167,6.0774642 5.9100672,6.0617444 v 5.9700936 5.970093 h 1.1914062 c 0.6552734,0 1.1973336,-0.0067 1.204578,-0.01485 z";
      var initColor = "#ce641d";

      symbolGuess = new esri.symbol.SimpleMarkerSymbol();
        symbolGuess.setPath(iconPathGuess);
        symbolGuess.setColor(new dojo.Color(initColor));
        symbolGuess.setOutline(null);    // removes the outline, if locator svg is redesigned could add it back in, but currently shows up the background over the invisble parts of the svg path
        symbolGuess.setSize("30");

      symbolPlace = new esri.symbol.SimpleMarkerSymbol();
        symbolPlace.setPath(iconPathPlace);
        symbolPlace.setColor(new dojo.Color(initColor));
        symbolPlace.setSize("20");


        if (i === 4) {
            // Find data from localStorage
            var dateScoreList = [];
            var dateScore = {
                'totalScore': totalScore,
                'date': date
            };
        
            dateScoreList = dateScoreList.concat(JSON.parse(localStorage.getItem('dateScoreList')||'[]'));
            console.log(dateScoreList);
        
            localStorage.setItem("showList", JSON.stringify(dateScoreList));
            localStorage.yourapp_date = datecheck;
        
            const NO_OF_HIGH_SCORES = 1000;
            const HIGH_SCORES = 'highScores';
            const highScoreString = localStorage.getItem(HIGH_SCORES);
            highScores = JSON.parse(highScoreString) ?? [];
            highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? []
            const newScore = { totalScore};
            
             // 2. Sort the list
             highScores.sort((a, b) => b.totalScore- a.totalScore);
            
             // 3. Select new list
             highScores.splice(NO_OF_HIGH_SCORES);
            
             // 4. Save to local storage
             localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
             localStorage.setItem('date',JSON.stringify(date));
             console.log("Test local storage")
             console.log(highScores)
            
             const findAverageScore = (arr) => {
               const { length } = arr;
               return arr.reduce((acc, val) => {
                  return acc + (val.totalScore/length);
               }, 0); 
            
            };
        
          var roundedAverage = Math.round(findAverageScore(highScores) * 10) / 10

            // If they have already played today then this will come up
            
            document.getElementById("placeRound").innerHTML = "Click to see and share your score"

            document.getElementById("highScoreEnd").innerHTML =    "Highscore:     " + highScores[0].totalScore;
            document.getElementById("averageScoreEnd").innerHTML = "Average score: " + roundedAverage;

            $('#scoreModalAlready').modal('show');

            //add the points on the map for them to see?
            
        }
        
      //when the map is clicked create a buffer around the click point of the specified distance.
       

      // defining function which finds coordinates where user clicks and works out distance to answer
      function mappyClick(mp){
        // Defining point using the lat and long of place
        // pt = correct place lat and long
        //pt2 = guessed location lat and long 
        pt = new Point(jsonConst[i].placeLongitude, jsonConst[i].placeLatitude)
        placeLat = jsonConst[i].placeLatitude
        placeLong = jsonConst[i].placeLongitude

        // Adding polyline between point of guess and point of place
        polylineGuess = new Polyline;
        polylineGuess.addPath([pt, pt2]);
        map.graphics.add(new esri.Graphic(polylineGuess, new esri.symbol.SimpleLineSymbol()));

        //set map extent based on guess and place x and y
        xMaxExtent = Math.max(jsonConst[i].placeLongitude, longitudeGuess);
        xMinExtent = Math.min(jsonConst[i].placeLongitude, longitudeGuess);
        yMaxExtent = Math.max(jsonConst[i].placeLatitude, latitudeGuess);
        yMinExtent = Math.min(jsonConst[i].placeLatitude, latitudeGuess);

        xMaxExtent = xMaxExtent + 10;
        xMinExtent = xMinExtent - 10;
        yMaxExtent = yMaxExtent + 10;
        yMinExtent = yMinExtent - 10;

        // Adding symbol to map 
        map.graphics.add(new Graphic(pt, symbolPlace));

        distParams = new DistanceParameters();
        distParams.distanceUnit = GeometryService.UNIT_KILOMETER;
      
        distParams.geometry1 = pt;
        distParams.geometry2 = pt2;
        distParams.geodesic = true;

        distance = geometryService.distance(distParams, function(distance) {
          // results of this is distance in kms
          console.log(distance);

          distanceResultRounded = Math.round(distance)

          //convert the result into points scored
          if (distanceResultRounded<= 50){
              roundScore = 10
          } else if (distanceResultRounded<= 200){
              roundScore = 8
          } else if (distanceResultRounded<= 500){
              roundScore = 6
          } else if (distanceResultRounded<= 1500){
              roundScore = 4
          }else if (distanceResultRounded<= 3000){
              roundScore = 2
          }else {
              roundScore = 0
          };


            // Add info pop up window in the centre of two points
          if (i < 2){
            map.infoWindow.setContent(distanceResultRounded + "km from " + jsonConst[i].place + ", scores " + roundScore + " points!");
            map.infoWindow.setTitle("Score")
            var xCentre = (Number(jsonConst[i].placeLongitude) + Number(longitudeGuess)) / 2;
            var yCentre = (Number(jsonConst[i].placeLatitude) + Number(latitudeGuess)) / 2;
            var centreOfLine = new Point(xCentre, yCentre);
            map.infoWindow.show(centreOfLine);
          }
          else if (i === 2){

 
          } else {};
          
          //putting score into element that can be called in html to put in table
          if (i === 0){
            document.getElementById("distanceRound1").innerHTML = distanceResultRounded
            document.getElementById("roundScore1").innerHTML = roundScore

            roundScore1 = roundScore
          } else if (i === 1){
            document.getElementById("distanceRound2").innerHTML = distanceResultRounded
            document.getElementById("roundScore2").innerHTML = roundScore
            roundScore2 = roundScore
          }
          else if (i === 2){
            document.getElementById("distanceRound3").innerHTML = distanceResultRounded
            document.getElementById("roundScore3").innerHTML = roundScore
            roundScore3 = roundScore
            totalScore = roundScore1 +roundScore2 + roundScore3
            console.log(totalScore)
            saveHighScore(totalScore, highScores)
          } else {};

          if (i<2){
            document.getElementById("placeRound").innerHTML = "Click here for next round"
            document.getElementById("placeRound").id = "nextRound";
              i = i +1
          } else {
            i = i +1
            document.getElementById("yourScore").innerHTML = "Your score today: " + totalScore+ "/30 points!"
            document.getElementById("placeRound").innerHTML = "Congratulations you scored " + totalScore+ "/30 points!"
            $('#scoreModal').modal('show');
          }
          document.getElementById('mapDiv').style.pointerEvents = 'none';

          if (i === 1){
            //save gemetries from round 1 into variable
            place1pt = pt
            guess1pt = pt2

  
            const extent1 = new Extent();
            extent1.xmin = xMinExtent;
            extent1.ymin = yMinExtent;
            extent1.xmax = xMaxExtent;
            extent1.ymax = yMaxExtent;
            xMinExtent1 = xMinExtent;
            yMinExtent1 = yMinExtent;
            xMaxExtent1 = xMaxExtent;
            yMaxExtent1 = yMaxExtent;
            map.setExtent(extent1);
            console.log("this is number 1 in if")
            console.log(yMaxExtent1)
                    // allows you to pan the map around
                    document.getElementById('mapDiv').style.pointerEvents = 'auto';
            return
          } else if (i === 2){
            // Save geometries from round 2
            place2pt = pt
            guess2pt = pt2

            const extent2 = new Extent();
            extent2.xmin = xMinExtent;
            extent2.ymin = yMinExtent;
            extent2.xmax = xMaxExtent;
            extent2.ymax = yMaxExtent;
            xMinExtent2 = xMinExtent;
            yMinExtent2 = yMinExtent;
            xMaxExtent2 = xMaxExtent;
            yMaxExtent2 = yMaxExtent;
            map.setExtent(extent2);
            console.log("this is number 2 in if")
            console.log(yMaxExtent2)
                                // allows you to pan the map around
                                document.getElementById('mapDiv').style.pointerEvents = 'auto';
            return
          }
          else if (i > 2){
            // Save geometries from round 3
            const extent3 = new Extent();
            extent3.xmin = Math.min(xMinExtent, xMinExtent1, xMinExtent2);
            extent3.ymin = Math.min(yMinExtent, yMinExtent1, yMinExtent2);
            extent3.xmax = Math.max(xMaxExtent, xMaxExtent1, xMaxExtent2);
            extent3.ymax = Math.max(yMaxExtent, yMaxExtent1, yMaxExtent2);
            map.setExtent(extent3);
            console.log("this else number 3 in if")
            console.log(yMaxExtent1)
            console.log(yMaxExtent2)
            // add geometries from rounds 1 and 2 to the map
            mapEnd()
            map.graphics.add(new Graphic(place1pt, symbolPlace));
            map.graphics.add(new Graphic(guess1pt, symbolGuess));
            map.graphics.add(new Graphic(place2pt, symbolPlace));
            map.graphics.add(new Graphic(guess2pt, symbolGuess));

            var polylineGuess1 = new Polyline;
            polylineGuess1.addPath([place1pt, guess1pt]);
            map.graphics.add(new esri.Graphic(polylineGuess1, new esri.symbol.SimpleLineSymbol()));
            var polylineGuess2 = new Polyline;
            polylineGuess2.addPath([place2pt, guess2pt]);
            map.graphics.add(new esri.Graphic(polylineGuess2, new esri.symbol.SimpleLineSymbol()));
            // Work out extent from max x, y for guesses and places

          } else {}

          return

        });

        function mapEnd(){
          // allows you to pan the map around
          document.getElementById('mapDiv').style.pointerEvents = 'auto';
          // put in code to add geometries from the first two rounds
        }


      };
     


        map.on("click", function(evt, mp){ 
          if (document.getElementById("placeRound").innerHTML === "Click here for next round"){
          }else if (i < 3){
            map.infoWindow.setTitle("Are you sure?");
            let btn = document.createElement("button")
            btn.innerHTML = "Confirm guess";
            map.infoWindow.setContent(btn);
            map.infoWindow.show(evt.screenPoint);
            btn.onclick = function(){
              map.infoWindow.hide();
              mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
                map.graphics.add(new Graphic(evt.mapPoint, symbolGuess));
                latitudeGuess = mp.y.toString()
                longitudeGuess = mp.x.toString()
                // Puts long and lat of the guess into a pt 
                pt2 = new Point (longitudeGuess, latitudeGuess)
                mappyClick();
            };
          } else {}
        });
  
    });
}

mappy()



function hello() {
  if (i === 3) {
      document.getElementById("placeRound").innerHTML.onclick = $('#scoreModal').modal('show');
  } else if (document.getElementById("nextRound").innerHTML === "Click here for next round"){
      map.graphics.clear();
      map.infoWindow.hide();
      document.getElementById('mapDiv').style.pointerEvents = 'auto';
      //view.graphics.removeAll();
      document.getElementById("nextRound").id = "placeRound";
      document.getElementById("placeRound").innerHTML = "Round "+ (i+1) +" of 3: Guess the location of " + jsonConst[i].place
      onClick()

      return 
  } else {}

}   

function copyClipboard(){
  // to Copy score to clipboard and url to mappin-game.com to share 
  let urlMappin = new URL('https://www.mappin-game.com/');
  navigator.clipboard.writeText("I scored " + totalScore + " points on Mappin! 🌎 Can you beat my daily score? " + urlMappin)
  document.getElementById("copyClip").innerHTML = "Copied to clipboard, paste to share!"
}

function saveHighScore(totalScore, highScores, date) {

    var dateScoreList = [];
    var dateScore = {
        'totalScore': totalScore,
        'date': date
    };

    dateScoreList.push(dateScore);
    dateScoreList = dateScoreList.concat(JSON.parse(localStorage.getItem('dateScoreList')||'[]'));
    console.log(dateScoreList);

    localStorage.setItem("showList", JSON.stringify(dateScoreList));
    localStorage.yourapp_date = datecheck;

    const NO_OF_HIGH_SCORES = 1000;
    const HIGH_SCORES = 'highScores';
    const highScoreString = localStorage.getItem(HIGH_SCORES);
    highScores = JSON.parse(highScoreString) ?? [];
    highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? []
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
  console.log("Test local storage")
  console.log(highScores)

  const findAverageScore = (arr) => {
    const { length } = arr;
    return arr.reduce((acc, val) => {
       return acc + (val.totalScore/length);
    }, 0); 

 };

  var roundedAverage = Math.round(findAverageScore(highScores) * 10) / 10

  document.getElementById("highScore").innerHTML =    "Highscore:     " + highScores[0].totalScore;
  currentHighscore = highScores[0].totalScore;
  document.getElementById("averageScore").innerHTML = "Average score: " + roundedAverage;
  currentAvgScore = roundedAverage;
};


