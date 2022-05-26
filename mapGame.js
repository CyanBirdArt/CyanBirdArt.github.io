var map, view, graphicsLayer, i, roundScore, roundScore1, roundScore2, roundScore3, totalScore, highScores;

var latitudeGuess, longitudeGuess, mp, pt, pt2, polylineGuess, placeLat, placeLong, symbolGuess, symbolPlace, distParams, distanceResultRounded, extentMap, xMaxExtent, xMinExtent, yMaxExtent, yMinExtent

var xMinExtent1, xMinExtent2, yMinExtent1, yMinExtent2, xMaxExtent1, xMaxExtent2, yMaxExtent1, yMaxExtent2, guess1pt, guess2pt, place1pt, place2pt, jsonConst

i = 0

console.log("today's date:")
let today = new Date()
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
date = String(date)
console.log(date)

 /*  
//use dojo from Andrews example

require(['dojo/json', "dojo/text!./places.json"], function(JSON, places) {
  let jsonConst = JSON.parse(places);
  console.log(jsonConst.placesJSON.length);
  return jsonConst
}
)
*/
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
  ]} else {
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
  ]
  }




document.getElementById("placeRound").innerHTML = "Round 1  of 3: Guess the location of " + jsonConst[0].place
const  place1 = jsonConst[0].place
const  place2 = jsonConst[1].place
const  place3 = jsonConst[2].place

document.getElementById("place1").innerHTML = place1
document.getElementById("place2").innerHTML = place2
document.getElementById("place3").innerHTML = place3


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
  if (document.getElementById("nextRound").innerHTML === "Click here for next round"){
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

function saveHighScore(totalScore, highScores) {
  const NO_OF_HIGH_SCORES = 10;
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
  document.getElementById("averageScore").innerHTML = "Average score: " + roundedAverage;
};


