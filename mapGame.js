// Welcome to the inner workings of Mappin
// This version of Mappin uses the 3.x ArcGIS API
// Author: Cyan Bird, 2022

// Defining todays date
const today = new Date();
const date = (today.getMonth()+1)+'-'+today.getDate();

// Day of the year from 1-366
var start = new Date(today.getFullYear(), 0, 0);
var diff = (today - start) + ((start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000);
var oneDay = 1000 * 60 * 60 * 24;
var dayNumber = Math.floor(diff / oneDay);

// Declaring variables:
// Big ol' list of place names, one for each day
let placeName = ""

data = [{"0":"Meknes, MAR","1":"Trujillo, PER","2":"Sakarya, TUR"},
{"0":"Malaga, ESP","1":"Seville, ESP","2":"Basilan City, PHL"},
{"0":"San Diego, USA","1":"Meerut, IND","2":"Johannesburg, ZAF"},
{"0":"Duisburg, DEU","1":"Wellington, NZL","2":"Mar Del Plata, ARG"},
{"0":"Mogadishu, SOM","1":"Bremen, DEU","2":"Hai Phong, VNM"},
{"0":"Mataram, IDN","1":"Asuncion, PRY","2":"Mosul, IRQ"},
{"0":"Erbil, IRQ","1":"Diwaniyah, IRQ","2":"Antalya, TUR"},
{"0":"Ottawa, CAN","1":"Galway, IRL","2":"Krakow, POL"},
{"0":"Multan, PAK","1":"Nampula, MOZ","2":"Honolulu, USA"},
{"0":"Belfast, GBR","1":"Port Louis, MUS","2":"Khon Kaen, THA"},
{"0":"Katsina, NGA","1":"Salta, ARG","2":"Sanliurfa, TUR"},
{"0":"Seoul, KOR","1":"Oran, DZA","2":"Pekan Baru, IDN"},
{"0":"Albufeira, PRT","1":"Likasi, COD","2":"Damascus, SYR"},
{"0":"Queretaro, MEX","1":"Riyadh, SAU","2":"Mwanza, TZA"},
{"0":"Edmonton, CAN","1":"San Salvador, SLV","2":"Tainan, TWN"},
{"0":"Ibb, YEM","1":"Hillah, IRQ","2":"Dubai, ARE"},
{"0":"Tunis, TUN","1":"Munich, DEU","2":"Bangui, CAF"},
{"0":"Cabimas, VEN","1":"Madrid, ESP","2":"Zinder, NER"},
{"0":"Exeter, GBR","1":"Sao Jose Dos Campos, BRA","2":"Beira, MOZ"},
{"0":"Cali, COL","1":"Praia, CPV","2":"Novosibirsk, RUS"},
{"0":"Villahermosa, MEX","1":"Gujranwala, PAK","2":"Nagoya, JPN"},
{"0":"Saint Peter Port, GGY","1":"Kansas City, USA","2":"Izmir, TUR"},
{"0":"Qom, IRN","1":"Cucuta, COL","2":"Toluca De Lerdo, MEX"},
{"0":"Valencia, VEN","1":"Merida, MEX","2":"Tokyo, JPN"},
{"0":"Sheffield, GBR","1":"Islamabad, PAK","2":"Ouagadougou, BFA"},
{"0":"Brussels, BEL","1":"Nairobi, KEN","2":"Murcia, ESP"},
{"0":"Kuching, MYS","1":"Antipolo, PHL","2":"Las Vegas, USA"},
{"0":"Niamey, NER","1":"Osaka, JPN","2":"St. George's, GRD"},
{"0":"Teresina, BRA","1":"Tshikapa, COD","2":"Muscat, OMN"},
{"0":"Shenzhen, CHN","1":"Cuito, AGO","2":"Hermosillo, MEX"},
{"0":"Morelia, MEX","1":"Abakaliki, NGA","2":"Lattakia, SYR"},
{"0":"Shizuoka, JPN","1":"Kagoshima, JPN","2":"Karachi, PAK"},
{"0":"Istanbul, TUR","1":"Seregno, ITA","2":"Auckland, NZL"},
{"0":"Gibraltar, GIB","1":"Banjarmasin, IDN","2":"Kingston, JAM"},
{"0":"Marrakesh, MAR","1":"Rio De Janeiro, BRA","2":"Moroni, COM"},
{"0":"Sydney, AUS","1":"Canberra, AUS","2":"Hurghada, EGY"},
{"0":"Kahramanmaras, TUR","1":"Memphis, USA","2":"Faisalabad, PAK"},
{"0":"Montreal, CAN","1":"Al Mansurah, EGY","2":"Hong Kong, HKG"},
{"0":"Dongguan, CHN","1":"Bristol, GBR","2":"Haifa, ISR"},
{"0":"Cartagena, COL","1":"Barcelona, ESP","2":"Batam, IDN"},
{"0":"Agadir, MAR","1":"Tabuk, SAU","2":"Charlotte, USA"},
{"0":"Maracay, VEN","1":"Arusha, TZA","2":"Bunia, COD"},
{"0":"Curitiba, BRA","1":"Taoyuan, TWN","2":"La Plata, ARG"},
{"0":"Khartoum, SDN","1":"Accra, GHA","2":"Athens, GRC"},
{"0":"Tolyatti, RUS","1":"Phuket, THA","2":"Jūrmala, LVA"},
{"0":"San Antonio, USA","1":"Villavicencio, COL","2":"Xi An Shaanxi, CHN"},
{"0":"Castries, LCA","1":"San Sebastian, ESP","2":"Essen, DEU"},
{"0":"Hallstatt, AUT","1":"Bacolod, PHL","2":"Luxembourg City, LUX"},
{"0":"San Francisco, USA","1":"Indore, IND","2":"Kananga, COD"},
{"0":"Gombe, NGA","1":"Donetsk, UKR","2":"Budapest, HUN"},
{"0":"Taif, SAU","1":"Mecca, SAU","2":"Ado Ekiti, NGA"},
{"0":"Guadalajara, MEX","1":"Grenoble, FRA","2":"Tasikmalaya, IDN"},
{"0":"Tanger, MAR","1":"Bamako, MLI","2":"Riyadh, SAU"},
{"0":"Rome, ITA","1":"Kuala Lumpur, MYS","2":"Suva, FJI"},
{"0":"Denver, USA","1":"Bloemfontein, ZAF","2":"Semarang, IDN"},
{"0":"Berlin, DEU","1":"Marrakesh, MAR","2":"Geneva, CHE"},
{"0":"Uige, AGO","1":"Grande Vitoria, BRA","2":"Conakry, GIN"},
{"0":"Pietermaritzburg, ZAF","1":"Tokyo, JPN","2":"Bien Hoa, VNM"},
{"0":"Madurai, IND","1":"Mersin, TUR","2":"Birmingham, GBR"},
{"0":"Cuiaba, BRA","1":"Jakarta, IDN","2":"Miami, USA"},
{"0":"Valletta, MLT","1":"Almaty, KAZ","2":"Yaounde, CMR"},
{"0":"Da Nang, VNM","1":"Delhi, IND","2":"Saint Helier, JEY"},
{"0":"Catania, ITA","1":"San Luis Potosi, MEX","2":"El Djelfa, DZA"},
{"0":"Goyang, KOR","1":"Beijing, CHN","2":"Managua, NIC"},
{"0":"Liege, BEL","1":"Goma, COD","2":"Stockholm, SWE"},
{"0":"Hamhung, PRK","1":"Amsterdam, NLD","2":"Abuja, NGA"},
{"0":"Nasiriyah, IRQ","1":"Osaka, JPN","2":"Monaco, MCO"},
{"0":"Leon De Los Aldamas, MEX","1":"Feira De Santana, BRA","2":"Bouake, CIV"},
{"0":"Belo Horizonte, BRA","1":"Barisal, BGD","2":"General Santos City, PHL"},
{"0":"Sao Paulo, BRA","1":"Tepic, MEX","2":"Leicester, GBR"},
{"0":"Ankara, TUR","1":"Wuhan, CHN","2":"Sao Paulo, BRA"},
{"0":"Columbus, USA","1":"Salvador, BRA","2":"Port Sudan, SDN"},
{"0":"Cork, IRL","1":"Bandung, IDN","2":"Kanpur, IND"},
{"0":"Kolkata, IND","1":"Yamoussoukro, CIV","2":"San Jose Del Monte, PHL"},
{"0":"Surabaya, IDN","1":"Akureyri, ISL","2":"Phoenix, USA"},
{"0":"Ad Dammam, SAU","1":"Yekaterinburg, RUS","2":"Nouméa, NCL"},
{"0":"Bukavu, COD","1":"Bobo Dioulasso, BFA","2":"Nizhniy Novgorod, RUS"},
{"0":"Al Raqqa, SYR","1":"West Yorkshire, GBR","2":"Cartagena, COL"},
{"0":"Maseru, LSO","1":"Palembang, IDN","2":"Port of Spain, TTO"},
{"0":"Mbouda, CMR","1":"Chengdu, CHN","2":"Cebu City, NZL"},
{"0":"Gaziantep, TUR","1":"Eskisehir, TUR","2":"Cancun, MEX"},
{"0":"Florence, ITA","1":"Sri Jayawardenepura Kotte, LKA","2":"Brighton, GBR"},
{"0":"Loum, CMR","1":"Calgary, CAN","2":"Shenzhen, CHN"},
{"0":"Nay Pyi Taw, MMR","1":"Bahawalpur, PAK","2":"Stavanger, NOR"},
{"0":"Porto Velho, BRA","1":"Hamburg, DEU","2":"Lahore, PAK"},
{"0":"Sarajevo, BIH","1":"Dushanbe, TJK","2":"Cairo, EGY"},
{"0":"Banghazi, LBY","1":"Shenyang, CHN","2":"Tripoli, LBY"},
{"0":"Gaoxiong, TWN","1":"Naples, ITA","2":"Honiara, SLB"},
{"0":"Sofia, BGR","1":"San Juan, PRI","2":"Bursa, TUR"},
{"0":"Montreal, CAN","1":"Johannesburg, ZAF","2":"Santa Fe, ARG"},
{"0":"Karachi, PAK","1":"Dodoma, TZA","2":"Huambo, AGO"},
{"0":"Guangzhou, CHN","1":"Durban, ZAF","2":"Beijing, CHN"},
{"0":"Port Elizabeth, ZAF","1":"Nassau, BHS","2":"Casablanca, MAR"},
{"0":"Barquisimeto, VEN","1":"Saint Petersburg, RUS","2":"Kingstown, VCT"},
{"0":"Rayong, THA","1":"Hannover, DEU","2":"Baghdad, IRQ"},
{"0":"Belgrade, SRB","1":"Sylhet, BGD","2":"Ipoh, MYS"},
{"0":"Klaipėda, LTU","1":"Busan, KOR","2":"Zurich, CHE"},
{"0":"Medina, SAU","1":"Buenos Aires, ARG","2":"El Obeid, SDN"},
{"0":"Ulaanbaatar, MNG","1":"Fes, MAR","2":"Pune, IND"},
{"0":"Cape Town, ZAF","1":"David, PAN","2":"Beirut, LBN"},
{"0":"Zhuhai, CHN","1":"Quebec City, CAN","2":"Apia, WSM"},
{"0":"Douglas, IMN","1":"Kigali, RWA","2":"Hufuf Mubarraz, SAU"},
{"0":"Saipan, MNP","1":"Kumasi, GHA","2":"Cancún, MEX"},
{"0":"Kerman, IRN","1":"Chiang Rai, THA","2":"Lilongwe, MWI"},
{"0":"Jambi, IDN","1":"Tamale, GHA","2":"Hamilton, CAN"},
{"0":"Calabar, NGA","1":"Tlaxcala, MEX","2":"Macapa, BRA"},
{"0":"Chihuahua, MEX","1":"Culiacan, MEX","2":"Manama, BHR"},
{"0":"Quetta, PAK","1":"Milan, ITA","2":"Nashville, USA"},
{"0":"Prague, CZE","1":"Vadodara, IND","2":"Moscow, RUS"},
{"0":"San Jose, USA","1":"Kuantan, MYS","2":"Abu Dhabi, ARE"},
{"0":"Zagreb, HRV","1":"Kermanshah, IRN","2":"Omsk, RUS"},
{"0":"Nuuk, GRL","1":"Ho Chi Minh City, VNM","2":"Tabriz, IRN"},
{"0":"Dakar, SEN","1":"Campo Grande, BRA","2":"Singapore, SGP"},
{"0":"Medellin, COL","1":"Poza Rica De Hidalgo, MEX","2":"Chiang Mai, THA"},
{"0":"Stuttgart, DEU","1":"Tianjin, CHN","2":"Kryvyi Rih, UKR"},
{"0":"Saint Petersburg, RUS","1":"Nicosia, CYP","2":"Philadelphia, USA"},
{"0":"Los Angeles, USA","1":"Uyo, NGA","2":"Glasgow, GBR"},
{"0":"Matsuyama, JPN","1":"Zamboanga City, PHL","2":"Malatya, TUR"},
{"0":"Kampala, UGA","1":"Yongin, KOR","2":"Taipei, TWN"},
{"0":"Frankfurt, DEU","1":"Mandalay, MMR","2":"Los Angeles, USA"},
{"0":"Amman, JOR","1":"Namangan, UZB","2":"Benin City, NGA"},
{"0":"Nantes, FRA","1":"Cologne, DEU","2":"Kharkiv, UKR"},
{"0":"Asmara, ERI","1":"Manaus, BRA","2":"Al Hudaydah, YEM"},
{"0":"Bridgetown, BRB","1":"Samarkand, UZB","2":"Chittagong, BGD"},
{"0":"La Paz, BOL","1":"Uvira, COD","2":"Bucaramanga, COL"},
{"0":"Lome, TGO","1":"Nanjing, CHN","2":"Lubumbashi, COD"},
{"0":"Abu Dhabi, ARE","1":"Brasilia, BRA","2":"Caracas, VEN"},
{"0":"Shenzhen, CHN","1":"Cape Town, ZAF","2":"Jundiai, BRA"},
{"0":"Tegucigalpa, HND","1":"Thiruvananthapuram, IND","2":"Omaha, USA"},
{"0":"Medina, SAU","1":"Vaduz, LIE","2":"Mashhad, IRN"},
{"0":"Changwon, KOR","1":"Izmir, TUR","2":"Lisbon, PRT"},
{"0":"Niigata, JPN","1":"Dhaka, BGD","2":"Arak, IRN"},
{"0":"Washington, USA","1":"Skopje, MKD","2":"Ludhiana, IND"},
{"0":"Toronto, CAN","1":"Stockholm, SWE","2":"Al Mukalla, YEM"},
{"0":"Barranquilla, COL","1":"Braga, PRT","2":"Burgos, ESP"},
{"0":"Belem, BRA","1":"Santo Domingo, DMA","2":"Chennai, IND"},
{"0":"Bologna, ITA","1":"Paris, FRA","2":"Krakow, POL"},
{"0":"Bur Sa'id, EGY","1":"Brazzaville, COD","2":"Paris, FRA"},
{"0":"Beijing, CHN","1":"Aguascalientes, MEX","2":"Southampton, GBR"},
{"0":"Djibouti, DJI","1":"Irbid, JOR","2":"Ilorin, NGA"},
{"0":"The Hague, NLD","1":"Mexico City, MEX","2":"Karbala, IRQ"},
{"0":"Singapore, SGP","1":"Nakhon Ratchasima, THA","2":"Manila, PHL"},
{"0":"Mekele, ETH","1":"Brussels, BEL","2":"Jiddah, SAU"},
{"0":"Porto-Novo, BEN","1":"Tel Aviv, ISR","2":"Puebla, MEX"},
{"0":"Marseille, FRA","1":"Nyala, SDN","2":"Vijayawada, IND"},
{"0":"Guangzhou, CHN","1":"Edinburgh, GBR","2":"Ramallah (de facto), PSE"},
{"0":"Harare, ZWE","1":"Peshawar, PAK","2":"Hanoi, VNM"},
{"0":"Bissau, GNB","1":"Pathum Thani, THA","2":"Bandar Abbas, IRN"},
{"0":"Kota Kinabalu, MYS","1":"Chiang Mai, THA","2":"Ljubljana, SVN"},
{"0":"Dar Es Salaam, TZA","1":"Johor Bahru, MYS","2":"Comilla, BGD"},
{"0":"Austin, USA","1":"Eindhoven, GBR","2":"Caracas, VEN"},
{"0":"Fort Worth, USA","1":"Utsunomiya, JPN","2":"Papeete, PYF"},
{"0":"Santa Cruz, BOL","1":"Akure, NGA","2":"Chennai, IND"},
{"0":"Saratov, RUS","1":"Rabat, MAR","2":"Samut Sakhon, THA"},
{"0":"Herat, AFG","1":"Merca, SOM","2":"Kitchener, CAN"},
{"0":"Amsterdam, NLD","1":"Ikorodu, NGA","2":"Alicante, ESP"},
{"0":"Jakarta, IDN","1":"Brasilia, BRA","2":"Pointe Noire, COD"},
{"0":"Warsaw, POL","1":"Lisbon, PRT","2":"Zarqa, JOR"},
{"0":"Ndola, ZMB","1":"Bishkek, KGZ","2":"Tripoli, LBY"},
{"0":"Bhopal, IND","1":"Malanje, AGO","2":"Agra, IND"},
{"0":"Safaqis, TUN","1":"Sydney, AUS","2":"Gold Coast, AUS"},
{"0":"Pretoria, ZAF","1":"Chennai, IND","2":"Jaipur, IND"},
{"0":"Taipei, TWN","1":"Volgograd, RUS","2":"Kobe, JPN"},
{"0":"Santa Marta, COL","1":"Addis Ababa, ETH","2":"Portland, USA"},
{"0":"Indianapolis, USA","1":"Hyderabad, IND","2":"Pachuca De Soto, MEX"},
{"0":"Chon Buri, THA","1":"Taizhong, TWN","2":"Kiev, UKR"},
{"0":"Ciudad Juarez, MEX","1":"Panama City, PAN","2":"Bournemouth, GBR"},
{"0":"Nurenberg, DEU","1":"Adelaide, AUS","2":"Bacoor, PHL"},
{"0":"Monterrey, MEX","1":"Vereeniging, ZAF","2":"Tarawa, KIR"},
{"0":"Manila, PHL","1":"Acapulco De Juarez, MEX","2":"Jacksonville, USA"},
{"0":"Matamoros, MEX","1":"George Town, CYM","2":"Padang, IDN"},
{"0":"Odesa, UKR","1":"Monrovia, LBR","2":"Sheikhupura, PAK"},
{"0":"Palermo, ITA","1":"Tashkent, UZB","2":"Dammam, SAU"},
{"0":"Gloucester, GBR","1":"Tartu, EST","2":"Cebu City, PHL"},
{"0":"Warsaw, POL","1":"Bogra, BGD","2":"Bogor, IDN"},
{"0":"Fresno, USA","1":"Lyon, FRA","2":"Gomel, BLR"},
{"0":"Jiddah, SAU","1":"Toluca De Lerdo, MEX","2":"Alexandria, EGY"},
{"0":"Krabi, THA","1":"Da Nang, VNM","2":"Honolulu, USA"},
{"0":"Zaragoza, ESP","1":"Cotonou, BEN","2":"Amara, IRQ"},
{"0":"Veracruz, MEX","1":"Palikir, FSM","2":"Ha Long, VNM"},
{"0":"Leipzig, DEU","1":"Kikwit, COD","2":"Kabul, AFG"},
{"0":"Funafuti, TUV","1":"Doha, QAT","2":"Ahvaz, IRN"},
{"0":"Nagoya, JPN","1":"Antwerp, BEL","2":"Misratah, LBY"},
{"0":"Aracaju, BRA","1":"Aalborg, DNK","2":"San Francisco, USA"},
{"0":"Hamilton, CAN","1":"Cuernavaca, MEX","2":"Londrina, BRA"},
{"0":"Juiz De Fora, BRA","1":"Imus, PHL","2":"Tehran, IRN"},
{"0":"Chongqing, CHN","1":"Copenhagen, DNK","2":"Shimkent, KAZ"},
{"0":"Lima, PER","1":"Malaga, ESP","2":"Kiev, UKR"},
{"0":"Sargodha, PAK","1":"Cairo, EGY","2":"Amsterdam, NLD"},
{"0":"Cheonan, KOR","1":"Aden, YEM","2":"Braşov, ROU"},
{"0":"Van, TUR","1":"Casablanca, MAR","2":"Bari, ITA"},
{"0":"Xinbei, TWN","1":"Port Vila, VUT","2":"Gwangju, KOR"},
{"0":"Taiz, YEM","1":"Gaza, PSE","2":"Florence, ITA"},
{"0":"Busto Arsizio, ITA","1":"Valencia, ESP","2":"Venice, ITA"},
{"0":"Kanpur, IND","1":"Baixada Santista, BRA","2":"Graz, AUT"},
{"0":"London, GBR","1":"Bangkok, THA","2":"Udon Thani, THA"},
{"0":"Bekasi, IDN","1":"Tucson, USA","2":"Porto, PRT"},
{"0":"Algiers, DZA","1":"Venice, ITA","2":"Joinville, BRA"},
{"0":"Chiclayo, PER","1":"Aba, NGA","2":"Cardiff, GBR"},
{"0":"Krasnodar, RUS","1":"Mbuji Mayi, COD","2":"La Laguna, MEX"},
{"0":"Santiago, CHL","1":"Oujda, MAR","2":"Shanghai, CHN"},
{"0":"Padova, ITA","1":"San Miguel De Tucuman, ARG","2":"Belmopan, BLZ"},
{"0":"Thrissur, IND","1":"Managua, NIC","2":"Kuwait City, KWT"},
{"0":"Port Harcourt, NGA","1":"Detroit, USA","2":"Gaza, PSE"},
{"0":"Paramaribo, SUR","1":"Las Vegas, USA","2":"West Rand, ZAF"},
{"0":"Be'er Sheva, ISR","1":"Madrid, ESP","2":"Sekondi Takoradi, GHA"},
{"0":"Cordoba, ARG","1":"Sukkur, PAK","2":"Vale Do Aco, BRA"},
{"0":"Copenhagen, DNK","1":"St. John's, ATG","2":"Bangalore, IND"},
{"0":"Nakhon Pathom, THA","1":"Fortaleza, BRA","2":"Porto, PRT"},
{"0":"Ribeirao Preto, BRA","1":"Makassar, IDN","2":"Hyderabad, PAK"},
{"0":"Sanaa, YEM","1":"Dortmund, DEU","2":"Aberdeen , GBR"},
{"0":"Lahore, PAK","1":"Sucre, BOL","2":"Oslo, NOR"},
{"0":"Andorra la Vella, AND","1":"Utrecht, NLD","2":"Lille, FRA"},
{"0":"Natal, BRA","1":"Oklahoma City, USA","2":"Campinas, BRA"},
{"0":"Suweon, KOR","1":"Bandar Seri Begawan, BRN","2":"Monaco, MCO"},
{"0":"Kabinda, COD","1":"Liverpool, GBR","2":"Melbourne, AUS"},
{"0":"London Ca, CAN","1":"Manama, BHR","2":"Sharjah, ARE"},
{"0":"Osaka, JPN","1":"Medan, IDN","2":"Ciudad Guayana, VEN"},
{"0":"Mesa, USA","1":"Nottingham, GBR","2":"Patna, IND"},
{"0":"Ogbomosho, NGA","1":"Kayseri, TUR","2":"Dresden, DEU"},
{"0":"Ubon Ratchathani, THA","1":"Salzburg, AUT","2":"Nairobi, KEN"},
{"0":"Reynosa, MEX","1":"Khamis Mushayt, SAU","2":"Cochabamba, BOL"},
{"0":"Port Moresby, PNG","1":"Al Ain, ARE","2":"Kannur, IND"},
{"0":"Dasmarinas, PHL","1":"Barcelona Puerto La Cruz, VEN","2":"Voronezh, RUS"},
{"0":"Bali, IDN","1":"Grande Sao Luis, BRA","2":"Abidjan, CIV"},
{"0":"Hangzhou, CHN","1":"Bristol, GBR","2":"Toulouse, FRA"},
{"0":"Kraków, POL","1":"Brussels, BEL","2":"Buenos Aires, ARG"},
{"0":"Rio De Janeiro, BRA","1":"Rajkot, IND","2":"Cairo, EGY"},
{"0":"Muğla, TUR","1":"Nice, FRA","2":"Malé, MDV"},
{"0":"Havana, CUB","1":"Concepcion, CHL","2":"Vancouver, CAN"},
{"0":"Pereira, COL","1":"Rotterdam, NLD","2":"Maiduguri, NGA"},
{"0":"Nashville, USA","1":"Frankfurt am Main, DEU","2":"Rustenburg, ZAF"},
{"0":"Frankfurt, DEU","1":"Rhodes, GRC","2":"Tbilisi, GEO"},
{"0":"Kuala Lumpur, MYS","1":"Guangzhou, CHN","2":"Seattle, USA"},
{"0":"Macau, MAC","1":"Georgetown, GUY","2":"Macao, MAC"},
{"0":"Colombo, LKA","1":"Jerusalem, ISR","2":"Bandar Lampung, IDN"},
{"0":"Khulna, BGD","1":"Zurich, CHE","2":"Kochi, IND"},
{"0":"Podgorica, MNE","1":"Maputo, MOZ","2":"Ar Rayyan, QAT"},
{"0":"Montevideo, URY","1":"Winnipeg, CAN","2":"Basseterre, KNA"},
{"0":"Samarinda, IDN","1":"Guilin, CHN","2":"Astana, KAZ"},
{"0":"Melbourne, AUS","1":"Rupganj, BGD","2":"Monterrey, MEX"},
{"0":"Yaounde, CMR","1":"Najaf, IRQ","2":"Krasnoyarsk, RUS"},
{"0":"Kozhikode, IND","1":"Seoul, KOR","2":"Fukuoka, JPN"},
{"0":"Kirkuk, IRQ","1":"Jerusalem, PSE","2":"Charlotte Amalie, VIR"},
{"0":"Libreville, GAB","1":"Tanta, EGY","2":"Kathmandu, NPL"},
{"0":"Moscow, RUS","1":"Mariehamn, ALA","2":"Davao City, PHL"},
{"0":"Vancouver, CAN","1":"Lusaka, ZMB","2":"Fukuoka, JPN"},
{"0":"Sokoto, NGA","1":"Valparaiso, CHL","2":"Rio de Janeiro, BRA"},
{"0":"Perm, RUS","1":"Toulon, FRA","2":"Gitega, BDI"},
{"0":"Surat, IND","1":"Batam, IDN","2":"Anyang, KOR"},
{"0":"Celaya, MEX","1":"San Pedro Sula, HND","2":"Rawalpindi, PAK"},
{"0":"Yangon, MMR","1":"Barcelona, ESP","2":"Milwaukee, USA"},
{"0":"Baku, AZE","1":"Poznan, POL","2":"Cuautla Morelos, MEX"},
{"0":"Sialkot, PAK","1":"Chittagong, BGD","2":"Ansan, KOR"},
{"0":"Freetown, SLE","1":"Mumbai, IND","2":"Seoul, KOR"},
{"0":"Manchester, GBR","1":"Ardabil, IRN","2":"Buenos Aires, ARG"},
{"0":"Karaganda, KAZ","1":"As Suways, EGY","2":"Verona, ITA"},
{"0":"Ibague, COL","1":"Maceio, BRA","2":"Victoria, SYC"},
{"0":"Ar Rusayfah, JOR","1":"Vancouver, CAN","2":"Cali, COL"},
{"0":"Incheon, KOR","1":"Roseau, DMA","2":"Lagos, NGA"},
{"0":"Jeju, KOR","1":"Puerto Vallarta, MEX","2":"Coimbra, PRT"},
{"0":"Konya, TUR","1":"Road Town, VGB","2":"Ufa, RUS"},
{"0":"Mumbai, IND","1":"Vaduz, LIE","2":"Santiago, DMA"},
{"0":"San Jose, CRI","1":"Thimphu, BTN","2":"Diyarbakir, TUR"},
{"0":"Depok, IDN","1":"Surakarta, IDN","2":"Bauchi, NGA"},
{"0":"Lagos, NGA","1":"Cagayan De Oro City, PHL","2":"Mbeya, TZA"},
{"0":"Goiania, BRA","1":"Berlin, DEU","2":"Nonthaburi, THA"},
{"0":"Kolwezi, COD","1":"Split, HRV","2":"Dhaka, BGD"},
{"0":"Kalasin, THA","1":"Ahmedabad, IND","2":"Penang Island, MYS"},
{"0":"Lodz, POL","1":"Gaborone, BWA","2":"Suzhou, CHN"},
{"0":"Rome, ITA","1":"Kinshasa, COD","2":"Tórshavn, FRO"},
{"0":"Paris, FRA","1":"Torquay, GBR","2":"Zahedan, IRN"},
{"0":"Delhi, IND","1":"Nadi, FJI","2":"Ulsan, KOR"},
{"0":"Oshogbo, NGA","1":"Aarhus, DNK","2":"Phnom Penh, KHM"},
{"0":"Joao Pessoa, BRA","1":"Newcastle Upon Tyne, GBR","2":"Yazd, IRN"},
{"0":"Guatemala City, GTM","1":"Tel Aviv, ISR","2":"Kano, NGA"},
{"0":"Santiago, CHL","1":"Orlando, USA","2":"Surat Thani, THA"},
{"0":"Mumbai, IND","1":"Cheongju, KOR","2":"Sydney, AUS"},
{"0":"Barcelona, ESP","1":"Kaduna, NGA","2":"Pyongyang, PRK"},
{"0":"Bucheon, KOR","1":"Jubayl, SAU","2":"Tauranga, NZL"},
{"0":"Riga, LVA","1":"Dakar, SEN","2":"São Tomé, STP"},
{"0":"Wroclaw, POL","1":"London, GBR","2":"Thessaloniki, GRC"},
{"0":"Douala, CMR","1":"Blantyre Limbe, MWI","2":"Delhi, IND"},
{"0":"Malang, IDN","1":"Reykjavík, ISL","2":"Bogota, COL"},
{"0":"Cologne, DEU","1":"Port Au Prince, HTI","2":"Uberlandia, BRA"},
{"0":"Xalapa, MEX","1":"Hamah, SYR","2":"Beirut, LBN"},
{"0":"Lviv, UKR","1":"Albuquerque, USA","2":"Istanbul, TUR"},
{"0":"Kumamoto, JPN","1":"Nice, FRA","2":"Arequipa, PER"},
{"0":"Nashik, IND","1":"Visakhapatnam, IND","2":"Douai Lens, FRA"},
{"0":"Al Mahallah Al Kubra, EGY","1":"Homs, SYR","2":"San José, CRI"},
{"0":"Turin, ITA","1":"Hong Kong, HKG","2":"Umuahia, NGA"},
{"0":"Malappuram, IND","1":"N Djamena, TCD","2":"Onitsha, NGA"},
{"0":"Dublin, IRL","1":"Guayaquil, ECU","2":"Ambon, IDN"},
{"0":"Abeokuta, NGA","1":"Angeles City, PHL","2":"Tyumen, RUS"},
{"0":"Ho Chi Minh City, VNM","1":"Bangkok, THA","2":"Antalya, TUR"},
{"0":"Postojna, SVN","1":"Rasht, IRN","2":"Los Angeles, USA"},
{"0":"Marrakech, MAR","1":"Bucharest, ROU","2":"Lucerne, CHE"},
{"0":"Soshanguve, ZAF","1":"Tijuana, MEX","2":"Saltillo, MEX"},
{"0":"Groningen, GBR","1":"Kaunas, LTU","2":"Owerri, NGA"},
{"0":"Adana, TUR","1":"Bergen, NOR","2":"Lima, PER"},
{"0":"Tallinn, EST","1":"Oaxaca De Juarez, MEX","2":"Benguela, AGO"},
{"0":"Pyongyang, PRK","1":"Tuxtla Gutierrez, MEX","2":"Johor Bahru, MYS"},
{"0":"Vienna, AUT","1":"Berlin, DEU","2":"Florence, ITA"},
{"0":"Kinshasa, COD","1":"Denizli, TUR","2":"Valledupar, COL"},
{"0":"Zaporizhzhya, UKR","1":"Seongnam, KOR","2":"Tampico, MEX"},
{"0":"Dalian, CHN","1":"Aleppo, SYR","2":"Dallas, USA"},
{"0":"Shanghai, CHN","1":"Buraydah, SAU","2":"Geelong, AUS"},
{"0":"Brisbane, AUS","1":"Zell am See, AUT","2":"Recife, BRA"},
{"0":"Hargeysa, SOM","1":"Kismaayo, SOM","2":"Quito, ECU"},
{"0":"Vientiane, LAO","1":"Copenhagen, DNK","2":"Dubai, ARE"},
{"0":"Kolkata, IND","1":"Denpasar, IDN","2":"Oranjestad, ABW"},
{"0":"Jaipur, IND","1":"Lokoja, NGA","2":"Sacramento, USA"},
{"0":"Sendai, JPN","1":"Paamiut, GRL","2":"Shiraz, IRN"},
{"0":"Nice, FRA","1":"Lisbon, PRT","2":"Gebze, TUR"},
{"0":"Samsun, TUR","1":"Baltimore, USA","2":"Chelyabinsk, RUS"},
{"0":"Foshan, CHN","1":"Ibadan, NGA","2":"Nukuʻalofa, TON"},
{"0":"Moscow, RUS","1":"Hanoi, VNM","2":"Rostov On Don, RUS"},
{"0":"Pontianak, IDN","1":"Kisangani, COD","2":"Denpasar, IDN"},
{"0":"Rome, ITA","1":"Can Tho, VNM","2":"Daejon, KOR"},
{"0":"Dili, TLS","1":"Luanda, AGO","2":"Chongjin, PRK"},
{"0":"Maturin, VEN","1":"Port of Spain, TTO","2":"Haerbin, CHN"},
{"0":"Porto, PRT","1":"Istanbul, TUR","2":"Larkana, PAK"},
{"0":"San Juan, ARG","1":"Daegu, KOR","2":"Antananarivo, MDG"},
{"0":"Frankfurt, DEU","1":"Jeonju, KOR","2":"Bogota, COL"},
{"0":"Zaria, NGA","1":"Matola, MOZ","2":"Ekurhuleni, ZAF"},
{"0":"Hyderabad, IND","1":"Auckland, NZL","2":"Colombo, LKA"},
{"0":"Sorocaba, BRA","1":"Perth, AUS","2":"El Paso, USA"},
{"0":"Guatemala City, GTM","1":"Mecca, SAU","2":"Hanoi, VNM"},
{"0":"Rajshahi, BGD","1":"Florence, ITA","2":"Eslamshahr, IRN"},
{"0":"Karaj, IRN","1":"Kollam, IND","2":"Rosario, ARG"},
{"0":"Majuro, MHL","1":"Buffalo City, ZAF","2":"Yerevan, ARM"},
{"0":"La Serena Coquimbo, CHL","1":"Hiroshima, JPN","2":"Kitwe, ZMB"},
{"0":"Mbabane, SWZ","1":"Songkhla, THA","2":"Dubrovnik, HRV"},
{"0":"Boston, USA","1":"San Juan, PRI","2":"Abomey Calavi, BEN"},
{"0":"Zanzibar, TZA","1":"Chicago, USA","2":"Sanaa, YEM"},
{"0":"Houston, USA","1":"Tangerang, IDN","2":"Seattle, USA"},
{"0":"Raipur, IND","1":"Prague, CZE","2":"Kolkata, IND"},
{"0":"Basra, IRQ","1":"Madrid, ESP","2":"Bern, CHE"},
{"0":"Chicago, USA","1":"Bordeaux, FRA","2":"Hamburg, DEU"},
{"0":"Mombasa, KEN","1":"Warri, NGA","2":"Ashgabat, TKM"},
{"0":"Samara, RUS","1":"Dnipro, UKR","2":"London, GBR"},
{"0":"Constanţa, ROU","1":"Nagpur, IND","2":"Toronto, CAN"},
{"0":"Orumiyeh, IRN","1":"Banjul, GMB","2":"Bangalore, IND"},
{"0":"Tokyo, JPN","1":"York, GBR","2":"Minsk, BLR"},
{"0":"Atlanta, USA","1":"Athens, GRC","2":"Milan, ITA"},
{"0":"Vilnius, LTU","1":"Cabinda, AGO","2":"Mexico City, MEX"},
{"0":"Okayama, JPN","1":"Esfahan, IRN","2":"Chongqing, CHN"},
{"0":"Lucknow, IND","1":"Agra, IND","2":"Dublin, IRL"},
{"0":"Mexicali, MEX","1":"Maracaibo, VEN","2":"Toronto, CAN"},
{"0":"Nouakchott, MRT","1":"Sulaimaniya, IRQ","2":"Bangkok, THA"},
{"0":"Strasbourg, FRA","1":"Jos, NGA","2":"Shanghai, CHN"},
{"0":"Bangkok, THA","1":"Tel Aviv, ISR","2":"Enugu, NGA"},
{"0":"Duesseldorf, DEU","1":"Heraklion, GRC","2":"Gothenburg, SWE"},
{"0":"New York City, USA","1":"Chiba, JPN","2":"Bamenda, CMR"},
{"0":"Washington, USA","1":"Windhoek, NAM","2":"Berbera, SOM"},
{"0":"Lubango, AGO","1":"Tirana, ALB","2":"Bujumbura, BDI"},
{"0":"Basel, CHE","1":"Genoa, ITA","2":"Coimbatore, IND"},
{"0":"Malabo, GNQ","1":"Kazan, RUS","2":"Florianopolis, BRA"},
{"0":"Budapest, HUN","1":"Helsinki, FIN","2":"Sapporo, JPN"},
{"0":"Hamadan, IRN","1":"Seville, ESP","2":"Durango, MEX"},
{"0":"Munich, DEU","1":"Bulawayo, ZWE","2":"Vienna, AUT"},
{"0":"New York City, USA","1":"Kyoto, JPN","2":"Tianjin, CHN"},
{"0":"Calamba, PHL","1":"Milan, ITA","2":"Bergamo, ITA"},
{"0":"Porto Alegre, BRA","1":"Samut Prakan, THA","2":"Pattaya, THA"},
{"0":"Johannesburg, ZAF","1":"Dubai, ARE","2":"The Hague, NLD"},
{"0":"Jakarta, IDN","1":"Mendoza, ARG","2":"Dublin, IRL"}]

const placesToday = data[dayNumber];
console.log(placesToday)
placeName = placesToday
console.log(placeName["Round1"])



    // Get place names for each round and put them into a google URL for model in HTML
    const place1Plus = placeName["0"].replaceAll(' ', '+');
    const place2Plus = placeName["1"].replaceAll(' ', '+');
    const place3Plus = placeName["2"].replaceAll(' ', '+');
    const place1URL = "https://www.google.com/search?q=" + place1Plus;
    const place2URL = "https://www.google.com/search?q=" + place2Plus;
    const place3URL = "https://www.google.com/search?q=" + place3Plus;
    document.getElementById("place1").innerHTML = placeName["0"];
    document.getElementById("place2").innerHTML = placeName["1"];
    document.getElementById("place3").innerHTML = placeName["2"];
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
if (placeName != ""){
    document.getElementById("placeRound").innerHTML = "Round 1  of 3: Guess the location of " + placeName["0"];
}


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

            let roundedAverage = Math.round(findAverageScore(highScores) * 10) / 10;
            // If they have already played today then this will come up
            document.getElementById("placeRound").innerHTML = "Click to see and share your score";
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
            mappinGame();
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
                    place1pt = placePoint;
                    guess1pt = guessPoint;
                    // Adding to HTML elements
                    document.getElementById("distanceRound1").innerHTML = distanceResultRounded;
                    document.getElementById("roundScore1").innerHTML = roundScore;
                    // Saving to local storage for future reference
                    localStorage.setItem('distanceRound1', distanceResultRounded);
                    localStorage.setItem('roundScore1', roundScore);
                    roundScore1 = roundScore;
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
                    // Adding HTML elements
                    document.getElementById("distanceRound2").innerHTML = distanceResultRounded;
                    document.getElementById("roundScore2").innerHTML = roundScore;
                    localStorage.setItem('distanceRound2', distanceResultRounded);
                    localStorage.setItem('roundScore2', roundScore);
                    roundScore2 = roundScore;
                    // Setting the button to click for next round and enabling button
                    document.getElementById("placeRound").innerHTML = roundScore2 + " points! Click here for next round";
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
    let round1Emoji, round2Emoji, round3Emoji;
    let random = Math.floor(Math.random() * 3)
    if (localStorage.getItem('roundScore1') > 8) {
        round1Emoji = ["🤩", "🔥", "😎"];
    } else if (localStorage.getItem('roundScore1') > 6) {
        round1Emoji = ["💪", "😍", "😏"]; 
    } else if (localStorage.getItem('roundScore1') > 4) {
        round1Emoji = ["🧐", "👍", "😝"];
    } else if (localStorage.getItem('roundScore1') > 1) {
        round1Emoji = ["😵", "😱", "😵"];
    } else if (localStorage.getItem('roundScore1') == 0) {
        round1Emoji = ["🤫", "🙃", "🥶"];
    };
    if (localStorage.getItem('roundScore2') > 8) {
        round2Emoji = ["👌", "🤩", "🤑"];
    } else if (localStorage.getItem('roundScore2') > 6) {
        round2Emoji = ["🤓", "😜", "🤓"];; 
    } else if (localStorage.getItem('roundScore2') > 4) {
        round2Emoji = ["😊", "😁", "🤠"];;
    } else if (localStorage.getItem('roundScore2') > 1) {
        round2Emoji = ["😕", "😊", "😲"];;
    } else if (localStorage.getItem('roundScore2') == 0) {
        round2Emoji = ["🥴", "😶", "😩"];;
    };
    if (localStorage.getItem('roundScore3') > 8) {
        round3Emoji = ["🧠", "💃", "🕺"];;
    } else if (localStorage.getItem('roundScore3') > 6) {
        round3Emoji = ["🥳", "🤓", "🦾"];; 
    } else if (localStorage.getItem('roundScore3') > 4) {
        round3Emoji = ["😃", "🤯", "😊"];;
    } else if (localStorage.getItem('roundScore3') > 1) {
        round3Emoji = ["😳", "🤔", "😯"];;
    } else if (localStorage.getItem('roundScore3') == 0) {
        round3Emoji = ["🤐", "😬", "💀"];;
    };
    navigator.clipboard.writeText("I scored " + totalScore + " points on Mappin! 🌎 \n Round 1️⃣: " + localStorage.getItem('roundScore1') + round1Emoji[random] +"\n Round 2️⃣: " + localStorage.getItem('roundScore2') + round2Emoji[random] + " \n Round 3️⃣: " + localStorage.getItem('roundScore3') + round3Emoji[random] + "\n Can you beat my daily score? " + urlMappin);
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

