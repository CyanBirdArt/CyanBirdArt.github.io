var map, view, graphicsLayer, i, roundScore, roundScore1, roundScore2, roundScore3, totalScore, highScores, datecheck, currentAvgScore, currentHighscore;

var latitudeGuess, longitudeGuess, mp, pt, pt2, polylineGuess, placeLat, placeLong, symbolGuess, symbolPlace1, symbolPlace2, symbolPlace3, distParams, distanceResultRounded, extentMap, xMaxExtent, xMinExtent, yMaxExtent, yMinExtent

var xMinExtent1, xMinExtent2, yMinExtent1, yMinExtent2, xMaxExtent1, xMaxExtent2, yMaxExtent1, yMaxExtent2, guess1pt, guess2pt, place1pt, place2pt, jsonConst


// checks if one day has passed. 
function hasOneDayPassed(){
  // get today's date. eg: "7/37/2007"
  datecheck = new Date().toLocaleDateString();

  // if there's a date in localstorage and it's equal to the above: 
  // inferring a day has yet to pass since both dates are equal.
  if( localStorage.yourapp_date == datecheck ) {
    //alert('has been run before');

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

    //clear local storage scores from previous days
    localStorage.removeItem('distanceRound1');
    localStorage.removeItem('roundScore1');
    localStorage.removeItem('distanceRound2');
    localStorage.removeItem('roundScore2');
    localStorage.removeItem('distanceRound3');
    localStorage.removeItem('roundScore3');
    localStorage.removeItem('totalScoreModal');
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
  ]} else if (date ==="2022-6-14") {
    jsonConst = [
        {
            "round": "1",
            "place": "Brisbane",
            "placeLatitude": "-27.4705",
            "placeLongitude": "153.0260"
            
        },
        {
            "round": "2",
            "place": "Lyon",
            "placeLatitude": "45.7640",
            "placeLongitude": "4.8357"
        },
        {
            "round": "3",
            "place": "Santa Cruz de la Sierra",
            "placeLatitude": "-17.8146",
            "placeLongitude": "-63.1561"
        }
    ]} else if (date ==="2022-6-15") {
        jsonConst = [
            {
                "round": "1",
                "place": "Singapore",
                "placeLatitude": "1.3521",
                "placeLongitude": "103.8198"
                
            },
            {
                "round": "2",
                "place": "Valencia",
                "placeLatitude": "39.4699",
                "placeLongitude": "-0.3763"
            },
            {
                "round": "3",
                "place": "Mérida",
                "placeLatitude": "38.9394",
                "placeLongitude": "-6.3652"
            }
        ]} else if (date ==="2022-6-16") {
            jsonConst = [
                {
                    "round": "1",
                    "place": "Chicago",
                    "placeLatitude": "41.8781",
                    "placeLongitude": "-87.6298"
                    
                },
                {
                    "round": "2",
                    "place": "Jerusalem",
                    "placeLatitude": "31.7683",
                    "placeLongitude": "35.2137"
                },
                {
                    "round": "3",
                    "place": "Guadalajara",
                    "placeLatitude": "20.6597",
                    "placeLongitude": "-103.3496"
                }
            ]} else if (date ==="2022-6-17") {
                jsonConst = [
                    {
                        "round": "1",
                        "place": "Stockholm",
                        "placeLatitude": "59.3293",
                        "placeLongitude": "18.0686"
                        
                    },
                    {
                        "round": "2",
                        "place": "Istanbul",
                        "placeLatitude": "41.0082",
                        "placeLongitude": "28.9784"
                    },
                    {
                        "round": "3",
                        "place": "Khartoum",
                        "placeLatitude": "15.5007",
                        "placeLongitude": "32.5599"
                    }
                ]} else if (date ==="2022-6-18") {
                jsonConst = [
                    {
                        "round": "1",
                        "place": "Hong Kong",
                        "placeLatitude": "22.3193",
                        "placeLongitude": "114.1694"
                        
                    },
                    {
                        "round": "2",
                        "place": "Quebec City",
                        "placeLatitude": "46.8139",
                        "placeLongitude": "-71.2080"
                    },
                    {
                        "round": "3",
                        "place": "Riau Islands",
                        "placeLatitude": "3.9457",
                        "placeLongitude": "108.1429"
                    }
                ]} else if (date ==="2022-6-19") {
                    jsonConst = [
                        {
                            "round": "1",
                            "place": "Bucharest",
                            "placeLatitude": "44.4268",
                            "placeLongitude": "26.1025"
                            
                        },
                        {
                            "round": "2",
                            "place": "Hanoi",
                            "placeLatitude": "21.0278",
                            "placeLongitude": "105.8342"
                        },
                        {
                            "round": "3",
                            "place": "Luanda",
                            "placeLatitude": "-8.8147",
                            "placeLongitude": "13.2302"
                        }
                    ]} else if (date ==="2022-6-20") {
                        jsonConst = [
                            {
                                "round": "1",
                                "place": "Rotterdam",
                                "placeLatitude": "51.9244",
                                "placeLongitude": "4.4777"
                                
                            },
                            {
                                "round": "2",
                                "place": "Guayaquil",
                                "placeLatitude": "-2.1894",
                                "placeLongitude": "-79.8891"
                            },
                            {
                                "round": "3",
                                "place": "Port Moresby",
                                "placeLatitude": "-9.4438",
                                "placeLongitude": "147.1803"
                            }
                        ]} else if (date ==="2022-6-21") {
                            jsonConst = [
                                {
                                    "round": "1",
                                    "place": "São Paulo",
                                    "placeLatitude": "-23.5558",
                                    "placeLongitude": "-46.6396"
                                    
                                },
                                {
                                    "round": "2",
                                    "place": "Honolulu",
                                    "placeLatitude": "21.3099",
                                    "placeLongitude": "-157.8581"
                                },
                                {
                                    "round": "3",
                                    "place": "Lerwick",
                                    "placeLatitude": "60.1530",
                                    "placeLongitude": "-1.1493"
                                }
                            ]} else if (date ==="2022-6-22") {
                                jsonConst = [
                                    {
                                        "round": "1",
                                        "place": "Denver",
                                        "placeLatitude": "39.7392",
                                        "placeLongitude": "-104.9903"
                                        
                                    },
                                    {
                                        "round": "2",
                                        "place": "Manilla",
                                        "placeLatitude": "14.5995",
                                        "placeLongitude": "120.9842"
                                    },
                                    {
                                        "round": "3",
                                        "place": "Arctic Bay",
                                        "placeLatitude": "73.0376",
                                        "placeLongitude": "-85.1480"
                                    }
                                ]} 
                                else if (date ==="2022-6-23") {
                                jsonConst = [
                                    {
                                        "round": "1",
                                        "place": "Faroe Islands",
                                        "placeLatitude": "61.8926",
                                        "placeLongitude": "-6.9118"
                                        
                                    },
                                    {
                                        "round": "2",
                                        "place": "Kuwait City",
                                        "placeLatitude": "29.3759",
                                        "placeLongitude": "47.9774"
                                    },
                                    {
                                        "round": "3",
                                        "place": "Islamabad",
                                        "placeLatitude": "33.6844",
                                        "placeLongitude": "73.0479"
                                    }
                                ]}else if (date ==="2022-6-24") {
                                    jsonConst = [
                                        {
                                            "round": "1",
                                            "place": "Hamburg",
                                            "placeLatitude": "53.5511",
                                            "placeLongitude": "9.9937"
                                            
                                        },
                                        {
                                            "round": "2",
                                            "place": "Bratislava",
                                            "placeLatitude": "48.1486",
                                            "placeLongitude": "17.1077"
                                        },
                                        {
                                            "round": "3",
                                            "place": "Luanda",
                                            "placeLatitude": "-8.8147",
                                            "placeLongitude": "13.2302"
                                        }
                                    ]}else if (date ==="2022-6-25") {
                                        jsonConst = [
                                            {
                                                "round": "1",
                                                "place": "Salt Lake City",
                                                "placeLatitude": "40.7608",
                                                "placeLongitude": "-111.8910"
                                                
                                            },
                                            {
                                                "round": "2",
                                                "place": "Santo Domingo",
                                                "placeLatitude": "18.4861",
                                                "placeLongitude": "-69.9312"
                                            },
                                            {
                                                "round": "3",
                                                "place": "Mandalay",
                                                "placeLatitude": "21.9588",
                                                "placeLongitude": "96.0891"
                                            }
                                        ]}else if (date ==="2022-6-26") {
                                            jsonConst = [
                                                {
                                                    "round": "1",
                                                    "place": "Antwerp",
                                                    "placeLatitude": "51.2213",
                                                    "placeLongitude": "4.4051"
                                                    
                                                },
                                                {
                                                    "round": "2",
                                                    "place": "Kolkata",
                                                    "placeLatitude": "22.5726",
                                                    "placeLongitude": "88.3639"
                                                },
                                                {
                                                    "round": "3",
                                                    "place": "Mbabane",
                                                    "placeLatitude": "-26.3054",
                                                    "placeLongitude": "31.1367"
                                                }
                                            ]} else if (date ==="2022-6-27") {
                                                jsonConst = [
                                                    {
                                                        "round": "1",
                                                        "place": "Minneapolis",
                                                        "placeLatitude": "44.9778",
                                                        "placeLongitude": "-93.2650"
                                                        
                                                    },
                                                    {
                                                        "round": "2",
                                                        "place": "Coral Bay",
                                                        "placeLatitude": "-23.1423",
                                                        "placeLongitude": "113.7723"
                                                    },
                                                    {
                                                        "round": "3",
                                                        "place": "Davao",
                                                        "placeLatitude": "7.1907",
                                                        "placeLongitude": "125.4553"
                                                    }
                                                ]} else if (date ==="2022-6-28") {
                                                    jsonConst = [
                                                        {
                                                            "round": "1",
                                                            "place": "Montreal",
                                                            "placeLatitude": "45.5017",
                                                            "placeLongitude": "-73.5673"
                                                            
                                                        },
                                                        {
                                                            "round": "2",
                                                            "place": "Palma",
                                                            "placeLatitude": "39.5696",
                                                            "placeLongitude": "2.6502"
                                                        },
                                                        {
                                                            "round": "3",
                                                            "place": "Mersin",
                                                            "placeLatitude": "36.8121",
                                                            "placeLongitude": "34.6415"
                                                        }
                                                    ]} else if (date ==="2022-6-29") {
                                                        jsonConst = [
                                                            {
                                                                "round": "1",
                                                                "place": "Rome",
                                                                "placeLatitude": "41.9028",
                                                                "placeLongitude": "12.4964"
                                                                
                                                            },
                                                            {
                                                                "round": "2",
                                                                "place": "Beirut",
                                                                "placeLatitude": "33.8938",
                                                                "placeLongitude": "35.5018"
                                                            },
                                                            {
                                                                "round": "3",
                                                                "place": "Samarkand",
                                                                "placeLatitude": "39.6270",
                                                                "placeLongitude": "66.9750"
                                                            }
                                                        ]}
                                                        else if (date ==="2022-6-30") {
                                                            jsonConst = [
                                                                {
                                                                    "round": "1",
                                                                    "place": "Zürich",
                                                                    "placeLatitude": "47.3769",
                                                                    "placeLongitude": "8.5417"
                                                                    
                                                                },
                                                                {
                                                                    "round": "2",
                                                                    "place": "Calgary",
                                                                    "placeLatitude": "51.0447",
                                                                    "placeLongitude": "-114.0719"
                                                                },
                                                                {
                                                                    "round": "3",
                                                                    "place": "Asunción",
                                                                    "placeLatitude": "-25.2637",
                                                                    "placeLongitude": "-57.5759"
                                                                }
                                                            ]} else if (date ==="2022-7-1") {
                                                                jsonConst = [
                                                                    {
                                                                        "round": "1",
                                                                        "place": "Maimi, US",
                                                                        "placeLatitude": "25.7617",
                                                                        "placeLongitude": "-80.1918"
                                                                        
                                                                    },
                                                                    {
                                                                        "round": "2",
                                                                        "place": "Canberra, AU",
                                                                        "placeLatitude": "-35.2802",
                                                                        "placeLongitude": "149.1310"
                                                                    },
                                                                    {
                                                                        "round": "3",
                                                                        "place": "Juba, SS",
                                                                        "placeLatitude": "4.8594",
                                                                        "placeLongitude": "31.5713"
                                                                    }
                                                                ]} else if (date ==="2022-7-2") {
                                                                    jsonConst = [
                                                                        {
                                                                            "round": "1",
                                                                            "place": "Krakow, PL",
                                                                            "placeLatitude": "50.0647",
                                                                            "placeLongitude": "19.9450"
                                                                            
                                                                        },
                                                                        {
                                                                            "round": "2",
                                                                            "place": "Anchorage, US",
                                                                            "placeLatitude": "61.2176",
                                                                            "placeLongitude": "-149.8997"
                                                                        },
                                                                        {
                                                                            "round": "3",
                                                                            "place": "Kochi, IN",
                                                                            "placeLatitude": "9.9312",
                                                                            "placeLongitude": "76.2673"
                                                                        }
                                                                    ]} else if (date ==="2022-7-3") {
                                                                        jsonConst = [
                                                                            {
                                                                                "round": "1",
                                                                                "place": "Vienna, AT",
                                                                                "placeLatitude": "48.2082",
                                                                                "placeLongitude": "16.3738"
                                                                                
                                                                            },
                                                                            {
                                                                                "round": "2",
                                                                                "place": "Muscat, OM",
                                                                                "placeLatitude": "23.5880",
                                                                                "placeLongitude": "58.3829"
                                                                            },
                                                                            {
                                                                                "round": "3",
                                                                                "place": "Port Macquarie, AU",
                                                                                "placeLatitude": "-31.4580",
                                                                                "placeLongitude": "152.8975"
                                                                            }
                                                                        ]} else if (date ==="2022-7-4") {
                                                                            jsonConst = [
                                                                                {
                                                                                    "round": "1",
                                                                                    "place": "Dallas, US",
                                                                                    "placeLatitude": "32.7767",
                                                                                    "placeLongitude": "-96.7970"
                                                                                    
                                                                                },
                                                                                {
                                                                                    "round": "2",
                                                                                    "place": "Bangkok, TH",
                                                                                    "placeLatitude": "13.7563",
                                                                                    "placeLongitude": "100.5018"
                                                                                },
                                                                                {
                                                                                    "round": "3",
                                                                                    "place": "Fukuoka, JP",
                                                                                    "placeLatitude": "33.5902",
                                                                                    "placeLongitude": "130.4017"
                                                                                }
                                                                            ]} else if (date ==="2022-7-5") {
                                                                                jsonConst = [
                                                                                    {
                                                                                        "round": "1",
                                                                                        "place": "Belfast, GBR",
                                                                                        "placeLatitude": "54.5973",
                                                                                        "placeLongitude": "-5.9301"
                                                                                        
                                                                                    },
                                                                                    {
                                                                                        "round": "2",
                                                                                        "place": "Belgrade, SRB",
                                                                                        "placeLatitude": "44.8125",
                                                                                        "placeLongitude": "20.4612"
                                                                                    },
                                                                                    {
                                                                                        "round": "3",
                                                                                        "place": "Windhoek, NAM",
                                                                                        "placeLatitude": "-22.5609",
                                                                                        "placeLongitude": "17.0658"
                                                                                    }
                                                                                ]}
                                                                                else if (date ==="2022-7-6") {
                                                                                jsonConst = [
                                                                                    {
                                                                                        "round": "1",
                                                                                        "place": "Wellington, NZL",
                                                                                        "placeLatitude": "-41.2924",
                                                                                        "placeLongitude": "174.7787"
                                                                                        
                                                                                    },
                                                                                    {
                                                                                        "round": "2",
                                                                                        "place": "Portland, USA",
                                                                                        "placeLatitude": "45.5152",
                                                                                        "placeLongitude": "-122.6784"
                                                                                    },
                                                                                    {
                                                                                        "round": "3",
                                                                                        "place": "Caracas, VEN",
                                                                                        "placeLatitude": "10.4806",
                                                                                        "placeLongitude": "-66.9036"
                                                                                    }
                                                                                ]} else if (date ==="2022-7-7") {
                                                                                    jsonConst = [
                                                                                        {
                                                                                            "round": "1",
                                                                                            "place": "Oslo, NOR",
                                                                                            "placeLatitude": "59.9139",
                                                                                            "placeLongitude": "10.7522"
                                                                                            
                                                                                        },
                                                                                        {
                                                                                            "round": "2",
                                                                                            "place": "Hanoi, VNM",
                                                                                            "placeLatitude": "21.0278",
                                                                                            "placeLongitude": "105.8342"
                                                                                        },
                                                                                        {
                                                                                            "round": "3",
                                                                                            "place": "Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch, GBR",
                                                                                            "placeLatitude": "53.2246",
                                                                                            "placeLongitude": "-4.1980"
                                                                                        }
                                                                                    ]} else if (date ==="2022-7-8") {
                                                                                        jsonConst = [
                                                                                            {
                                                                                                "round": "1",
                                                                                                "place": "Las Vegas, USA",
                                                                                                "placeLatitude": "36.114647",
                                                                                                "placeLongitude": "-115.172813"
                                                                                                
                                                                                            },
                                                                                            {
                                                                                                "round": "2",
                                                                                                "place": "Sofia, BGR",
                                                                                                "placeLatitude": "42.698334",
                                                                                                "placeLongitude": "23.319941"
                                                                                            },
                                                                                            {
                                                                                                "round": "3",
                                                                                                "place": "Managua, NIC",
                                                                                                "placeLatitude": "12.13282",
                                                                                                "placeLongitude": "-86.2504"
                                                                                            }
                                                                                        ]} else if (date ==="2022-7-9") {
                                                                                            jsonConst = [
                                                                                                {
                                                                                                    "round": "1",
                                                                                                    "place": "Warsaw, POL",
                                                                                                    "placeLatitude": "52.237049",
                                                                                                    "placeLongitude": "21.017532"
                                                                                                    
                                                                                                },
                                                                                                {
                                                                                                    "round": "2",
                                                                                                    "place": "Kingston, JAM",
                                                                                                    "placeLatitude": "17.99702",
                                                                                                    "placeLongitude": "-76.79358"
                                                                                                },
                                                                                                {
                                                                                                    "round": "3",
                                                                                                    "place": "Bangui, CAF",
                                                                                                    "placeLatitude": "4.3947",
                                                                                                    "placeLongitude": "18.5582"
                                                                                                }
                                                                                            ]} else if (date ==="2022-7-10") {
                                                                                                jsonConst = [
                                                                                                    {
                                                                                                        "round": "1",
                                                                                                        "place": "Sydney, AUS",
                                                                                                        "placeLatitude": "-33.8688",
                                                                                                        "placeLongitude": "151.2093"
                                                                                                        
                                                                                                    },
                                                                                                    {
                                                                                                        "round": "2",
                                                                                                        "place": "Kathmandu, NPL",
                                                                                                        "placeLatitude": "27.7172",
                                                                                                        "placeLongitude": "85.3240"
                                                                                                    },
                                                                                                    {
                                                                                                        "round": "3",
                                                                                                        "place": "Bandar Seri Begawan, BRN",
                                                                                                        "placeLatitude": "4.9031",
                                                                                                        "placeLongitude": "114.9398"
                                                                                                    }
                                                                                                ]} else if (date ==="2022-7-11") {
                                                                                                    jsonConst = [
                                                                                                        {
                                                                                                            "round": "1",
                                                                                                            "place": "Hanover, DEU",
                                                                                                            "placeLatitude": "52.37599",
                                                                                                            "placeLongitude": "9.73202"
                                                                                                            
                                                                                                        },
                                                                                                        {
                                                                                                            "round": "2",
                                                                                                            "place": "New Delhi, IND",
                                                                                                            "placeLatitude": "28.6139",
                                                                                                            "placeLongitude": "77.2090"
                                                                                                        },
                                                                                                        {
                                                                                                            "round": "3",
                                                                                                            "place": "Serrekunda, GMB",
                                                                                                            "placeLatitude": "13.4370",
                                                                                                            "placeLongitude": "-16.6812"
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
    "esri/dijit/Scalebar", "esri/dijit/InfoWindow",
    "esri/graphic", "esri/InfoTemplate", "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol", "esri/Color", "dojo/dom", "dojo/domReady!"
  ], function(
    Map, webMercatorUtils, Extent,
    GeometryService, DistanceParameters,
    Point, Polyline,
    Scalebar, InfoWindow,
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

            document.getElementById("highScore").innerHTML =    "Highscore:     " + highScores[0].totalScore;
            document.getElementById("averageScore").innerHTML = "Average score: " + roundedAverage;

            totalScore = localStorage.getItem('totalScoreModal')
            console.log(localStorage.getItem('totalScoreModal'))
            document.getElementById("yourScore").innerHTML = "You have already played Mappin today 🌎 \n Your score today: " + totalScore + "/30 points!"

            document.getElementById("distanceRound1").innerHTML = localStorage.getItem('distanceRound1');
            document.getElementById("roundScore1").innerHTML = localStorage.getItem('roundScore1');
            document.getElementById("distanceRound2").innerHTML = localStorage.getItem('distanceRound2');
            document.getElementById("roundScore2").innerHTML = localStorage.getItem('roundScore2');
            document.getElementById("distanceRound3").innerHTML = localStorage.getItem('distanceRound3');
            document.getElementById("roundScore3").innerHTML = localStorage.getItem('roundScore3');

            $('#scoreModal').modal('show');

            

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
            map.infoWindow.show(centreOfLine, InfoWindow.ANCHOR_UPPERLEFT);
          }
          else if (i === 2){

 
          } else {};
          
          //putting score into element that can be called in html to put in table
          if (i === 0){
            // Adding symbol to map 
            map.graphics.add(new Graphic(pt, symbolPlace1));

            document.getElementById("distanceRound1").innerHTML = distanceResultRounded
            document.getElementById("roundScore1").innerHTML = roundScore
            localStorage.setItem('distanceRound1', distanceResultRounded);
            localStorage.setItem('roundScore1', roundScore);

            roundScore1 = roundScore
          } else if (i === 1){
            // Adding symbol to map 
            map.graphics.add(new Graphic(pt, symbolPlace2));

            document.getElementById("distanceRound2").innerHTML = distanceResultRounded
            document.getElementById("roundScore2").innerHTML = roundScore
            localStorage.setItem('distanceRound2', distanceResultRounded);
            localStorage.setItem('roundScore2', roundScore);
            roundScore2 = roundScore
          }
          else if (i === 2){
            // Adding symbol to map 
            map.graphics.add(new Graphic(pt, symbolPlace3));

            document.getElementById("distanceRound3").innerHTML = distanceResultRounded
            document.getElementById("roundScore3").innerHTML = roundScore
            localStorage.setItem('distanceRound3', distanceResultRounded);
            localStorage.setItem('roundScore3', roundScore);
            roundScore3 = roundScore
            totalScore = roundScore1 +roundScore2 + roundScore3
            console.log(totalScore)
            saveHighScore(totalScore, highScores)
          } else {};

          if (i === 0){
            document.getElementById("placeRound").innerHTML = roundScore1 + " points! Click here for next round"
            document.getElementById("placeRound").id = "nextRound";
            i = i +1
          } else if (i === 1){
            document.getElementById("placeRound").innerHTML = roundScore2 + " points! Click here for next round"
            document.getElementById("placeRound").id = "nextRound";
            i = i +1
          } else if (i === 2){
            i = i +1
            document.getElementById("yourScore").innerHTML = "Your score today: " + totalScore+ "/30 points!"
            localStorage.setItem('totalScoreModal', totalScore);
            let arrayMessage = []
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
              arrayMessage = ["Congratulations, you" ]
            }
            document.getElementById("placeRound").innerHTML = getRandom(arrayMessage) + " scored " + totalScore+ "/30 points! Click for score breakdown"
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
          if (document.getElementById("placeRound").id === "nextRound"){
          }else if (i < 3){
            map.infoWindow.setTitle("Are you sure?");
            let btn = document.createElement("button")
            btn.innerHTML = "Confirm guess";
            map.infoWindow.setContent(btn);
            map.infoWindow.show(evt.screenPoint);
                          // Setting the SVG path for the guess pin and the location of each round as numbers
            var iconPathGuess = "M 12.408203 0.98242188 A 4.3063169 4.6209335 0 0 0 8.1015625 5.6035156 A 4.3063169 4.6209335 0 0 0 9.2382812 8.7226562 L 12.244141 14.019531 L 15.429688 8.8789062 A 4.3063169 4.6209335 0 0 0 16.712891 5.6035156 A 4.3063169 4.6209335 0 0 0 12.408203 0.98242188 z M 12.453125 3.1855469 A 2.2288775 2.3748119 0 0 1 14.681641 5.5605469 A 2.2288775 2.3748119 0 0 1 12.453125 7.9355469 A 2.2288775 2.3748119 0 0 1 10.224609 5.5605469 A 2.2288775 2.3748119 0 0 1 12.453125 3.1855469 z M 11.693359 14.017578 L 11.693359 23.794922 L 11.693359 14.017578 z ";
            if ( i === 0 ) {
              var iconPathPlace1 = "M 188.13477 8.7597656 C 149.25147 8.8994267 110.34746 21.663253 77.902344 47.029297 C 60.35193 60.75046 42.792167 81.110386 31.974609 100.28125 C -11.512033 177.34832 8.0314888 274.89358 77.902344 329.51953 C 105.03009 350.72837 137.44252 363.71828 171.39844 366.99023 C 232.24962 372.85372 292.17984 347.10364 329.97461 298.85547 C 348.10116 275.71539 360.437 248.20852 365.59961 219.41602 C 368.74743 201.86091 368.77299 174.81993 365.6582 157.46875 C 357.7053 113.17107 333.94356 73.971169 298.23828 46.238281 C 265.87991 21.105053 227.01802 8.6200955 188.13477 8.7597656 z M 188.00781 41.984375 C 203.65695 41.845553 219.42519 44.25052 234.97266 49.226562 C 246.55634 52.933973 267.60246 63.801406 277.26758 71.066406 C 288.55824 79.553294 304.31709 96.077857 311.61328 107.08203 C 350.40741 165.59168 343.89045 241.42404 295.76758 291.48438 C 282.75553 305.02033 271.7002 313.20898 255.73438 321.13477 C 236.94823 330.46067 223.08702 334.5388 202.98828 336.65625 C 144.48773 342.81934 85.763617 310.7459 58.361328 257.66602 C 29.029141 200.84782 38.65638 133.67117 82.699219 87.849609 C 95.07004 74.97918 106.35441 66.473755 121.23438 58.800781 C 142.52183 47.823722 165.136 42.187245 188.00781 41.984375 z M 203.70703 77.095703 C 199.01519 77.095703 195.8201 77.99414 194.12305 79.791016 C 192.426 81.587889 188.78364 86.379554 183.19336 94.166016 C 177.60308 101.95247 171.16428 108.99023 163.87695 115.2793 C 156.68945 121.56836 147.05556 127.55794 134.97656 133.24805 C 126.89062 137.04145 121.25108 140.13542 118.05664 142.53125 C 114.86219 144.92708 113.26367 148.67057 113.26367 153.76172 C 113.26367 158.15408 114.86219 162.04731 118.05664 165.44141 C 121.35091 168.73568 125.0944 170.38281 129.28711 170.38281 C 138.07183 170.38281 155.14214 160.64974 180.49805 141.18359 L 180.49805 277.44727 C 180.49805 285.43338 182.34353 291.47352 186.03711 295.56641 C 189.73069 299.65929 194.62348 301.70508 200.71289 301.70508 C 214.38911 301.70508 221.22656 291.67253 221.22656 271.60742 L 221.22656 100.15625 C 221.22656 92.968748 219.62999 87.327258 216.43555 83.234375 C 213.2411 79.141494 208.99783 77.095703 203.70703 77.095703 z ";
            } else if ( i === 1 ) {
              var iconPathPlace2 = "m 43.76453,68.951098 h 20.680912 q 3.090251,0 4.714613,1.267795 1.624363,1.267796 1.624363,3.446819 0,1.941311 -1.307414,3.288344 -1.267795,1.347032 -3.882623,1.347032 H 36.435089 q -2.971396,0 -4.635377,-1.624362 -1.663981,-1.663982 -1.663981,-3.882624 0,-1.426269 1.069702,-3.763767 1.069702,-2.377116 2.337498,-3.724149 5.269274,-5.467367 9.508464,-9.34999 4.239191,-3.922242 6.061647,-5.150419 3.248725,-2.297879 5.38813,-4.595758 2.179023,-2.337497 3.288344,-4.754232 1.14894,-2.456354 1.14894,-4.793851 0,-2.535591 -1.228177,-4.516521 -1.188558,-2.020549 -3.288344,-3.12987 -2.060168,-1.109321 -4.516521,-1.109321 -5.190037,0 -8.161432,4.55614 -0.396186,0.594279 -1.347033,3.248725 -0.911228,2.654447 -2.099786,4.080716 -1.148939,1.42627 -3.4072,1.42627 -1.98093,0 -3.288344,-1.307414 -1.307414,-1.307414 -1.307414,-3.565674 0,-2.733684 1.228177,-5.705079 1.228176,-2.971395 3.644911,-5.38813 2.456354,-2.416735 6.180503,-3.882623 3.763767,-1.505507 8.79533,-1.505507 6.061646,0 10.340455,1.901693 2.773302,1.267795 4.873088,3.486437 2.099786,2.218642 3.248726,5.150418 1.188558,2.892158 1.188558,6.022028 0,4.912707 -2.456353,8.953805 -2.416735,4.001479 -4.952326,6.299358 -2.53559,2.25826 -8.518,7.131348 -5.94279,4.873089 -8.161432,7.567154 -0.950847,1.069702 -1.941312,2.575209 z M 49.953885,5.0334387 C 40.241295,5.0683587 30.523538,8.2600407 22.419131,14.602365 18.035242,18.033097 13.649059,23.123468 10.94696,27.9168 0.0845071,47.18604 4.9662101,71.575477 22.419131,85.233716 c 6.776191,5.30289 14.87234,8.550844 23.354134,9.368936 15.1999,1.466059 30.1698,-4.972064 39.61049,-17.035651 4.5278,-5.785763 7.60912,-12.663305 8.89868,-19.862355 0.7863,-4.38934 0.79259,-11.150627 0.0145,-15.488978 -1.9865,-11.075841 -7.92155,-20.877113 -16.84031,-27.811225 -8.08274,-6.2841133 -17.79013,-9.4059263 -27.5027,-9.3710043 z m -0.21032,6.0750833 c 4.1405,-0.03673 8.3125,0.599583 12.4261,1.916161 3.06485,0.980919 8.6333,3.856262 11.19053,5.77846 2.98732,2.245489 7.15686,6.617614 9.08731,9.529135 10.26428,15.480679 8.53999,35.544658 -4.19252,48.789789 -3.44277,3.581387 -6.36782,5.747967 -10.59211,7.844999 -4.9705,2.467478 -8.63794,3.546483 -13.95573,4.106725 C 38.228875,90.704442 22.691448,82.218342 15.441259,68.17429 7.6804511,53.141142 10.227658,35.36732 21.880659,23.2437 c 3.273113,-3.405301 6.25877,-5.655696 10.195761,-7.685837 5.632305,-2.904347 11.615645,-4.395665 17.667145,-4.449341 z"
            
            } else if ( i === 2 ) {
              var iconPathPlace3 = "M 49.953885,5.0334387 C 40.241295,5.0683587 30.523538,8.2600407 22.419131,14.602365 18.035242,18.033097 13.649059,23.123468 10.94696,27.9168 0.0845071,47.18604 4.9662101,71.575477 22.419131,85.233716 c 6.776191,5.30289 14.87234,8.550844 23.354134,9.368936 15.1999,1.466059 30.1698,-4.972064 39.61049,-17.035651 4.5278,-5.785763 7.60912,-12.663305 8.89868,-19.862355 0.7863,-4.38934 0.79259,-11.150627 0.0145,-15.488978 -1.9865,-11.075841 -7.92155,-20.877113 -16.84031,-27.811225 -8.08274,-6.2841133 -17.79013,-9.4059263 -27.5027,-9.3710043 z m -0.21032,6.0750833 c 4.1405,-0.03673 8.3125,0.599583 12.4261,1.916161 3.06485,0.980919 8.6333,3.856262 11.19053,5.77846 2.98732,2.245489 7.15686,6.617614 9.08731,9.529135 10.26428,15.480679 8.53999,35.544658 -4.19252,48.789789 -3.44277,3.581387 -6.36782,5.747967 -10.59211,7.844999 -4.9705,2.467478 -8.63794,3.546483 -13.95573,4.106725 C 38.228875,90.704442 22.691448,82.218342 15.441259,68.17429 7.6804511,53.141142 10.227658,35.36732 21.880659,23.2437 c 3.273113,-3.405301 6.25877,-5.655696 10.195761,-7.685837 5.632305,-2.904347 11.615645,-4.395665 17.667145,-4.449341 z m -1.8587,32.130102 q 3.644912,0 6.25974,-2.139405 2.654446,-2.139404 2.654446,-6.140883 0,-3.050633 -2.099786,-5.229656 -2.099786,-2.218642 -5.66546,-2.218642 -2.416735,0 -4.001479,0.673516 -1.545126,0.673517 -2.456354,1.782838 -0.911228,1.109321 -1.743218,2.852539 -0.792372,1.743219 -1.465889,3.288344 -0.396186,0.831991 -1.426269,1.307414 -1.030084,0.475423 -2.377117,0.475423 -1.584744,0 -2.931776,-1.267795 -1.307414,-1.307414 -1.307414,-3.446818 0,-2.060168 1.228176,-4.318428 1.267796,-2.297879 3.644912,-4.358047 2.416735,-2.060167 5.982409,-3.288344 3.565675,-1.267795 7.96334,-1.267795 3.843004,0 7.012492,1.069702 3.169489,1.030084 5.506986,3.011014 2.337498,1.98093 3.526056,4.595758 1.188558,2.614828 1.188558,5.625842 0,3.96186 -1.743218,6.8144 -1.7036,2.812921 -4.912707,5.506986 3.090251,1.663981 5.190037,3.803386 2.139405,2.139404 3.209107,4.754232 1.069702,2.575209 1.069702,5.586223 0,3.605293 -1.465888,6.972875 -1.42627,3.367581 -4.239191,6.022027 -2.812921,2.614828 -6.695544,4.120335 -3.843004,1.465888 -8.518,1.465888 -4.754232,0 -8.518,-1.703599 -3.763767,-1.7036 -6.22012,-4.239191 -2.416735,-2.575209 -3.684531,-5.308893 -1.228176,-2.733684 -1.228176,-4.516521 0,-2.297879 1.465888,-3.68453 1.505507,-1.42627 3.724149,-1.42627 1.109321,0 2.139404,0.673517 1.030084,0.633897 1.347033,1.545125 2.060167,5.506986 4.397665,8.201051 2.377116,2.654447 6.655925,2.654447 2.456354,0 4.714614,-1.188559 2.297879,-1.228176 3.763768,-3.605293 1.505507,-2.377116 1.505507,-5.506985 0,-4.635377 -2.535591,-7.250205 -2.535591,-2.654446 -7.052111,-2.654446 -0.792373,0 -2.456354,0.158474 -1.663981,0.158474 -2.139405,0.158474 -2.179023,0 -3.367581,-1.069702 -1.188558,-1.109321 -1.188558,-3.050632 0,-1.901693 1.42627,-3.050633 1.42627,-1.188558 4.23919,-1.188558 z"
            }
            var initColor = "#ce641d";
          
            symbolGuess = new esri.symbol.SimpleMarkerSymbol();
              symbolGuess.setPath(iconPathGuess);
              symbolGuess.setColor(new dojo.Color(initColor));
              symbolGuess.setOutline(null);    // removes the outline, if locator svg is redesigned could add it back in, but currently shows up the background over the invisble parts of the svg path
              symbolGuess.setSize("30");
          
            
              if ( i === 0 ) {
                symbolPlace1 = new esri.symbol.SimpleMarkerSymbol();
                symbolPlace1.setPath(iconPathPlace1);
                symbolPlace1.setColor(new dojo.Color(initColor));
                symbolPlace1.setSize("20");
              } else if ( i === 1 ) {
                symbolPlace2 = new esri.symbol.SimpleMarkerSymbol();
                symbolPlace2.setPath(iconPathPlace2);
                symbolPlace2.setColor(new dojo.Color(initColor));
                symbolPlace2.setSize("20");
              } else if ( i === 2 ) {
                symbolPlace3 = new esri.symbol.SimpleMarkerSymbol();
                symbolPlace3.setPath(iconPathPlace3);
                symbolPlace3.setColor(new dojo.Color(initColor));
                symbolPlace3.setSize("20");
              }


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



function hello() { console.log(i)
  if (i === 3) {
      document.getElementById("placeRound").innerHTML.onclick = $('#scoreModal').modal('show');
  } else if (i === 4) {
    // To show modal when button is clicked if already played today
    document.getElementById("placeRound").innerHTML.onclick = $('#scoreModal').modal('show');
} else if (document.getElementById("nextRound").id === "nextRound" && 1 < 3){
      map.graphics.clear();
      map.infoWindow.hide();
      document.getElementById('mapDiv').style.pointerEvents = 'auto';
      //view.graphics.removeAll();
      document.getElementById("nextRound").id = "placeRound";
      document.getElementById("placeRound").innerHTML = "Round "+ (i+1) +" of 3: Guess the location of " + jsonConst[i].place
      //onClick()

      return 
  }
}   

function copyClipboard(){
  // to Copy score to clipboard and url to mappin-game.com to share 
  let urlMappin = new URL('https://mappin-game.com/');
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




