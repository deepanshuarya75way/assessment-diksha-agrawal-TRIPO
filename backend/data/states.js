const states = [

{
name:"Andhra Pradesh",
code:"AP",
type:"State",
capital:"Amaravati",
image:"https://images.unsplash.com/photo-1599661046289-e31897846e41",
description:"Known for Tirupati Temple, Araku Valley and beautiful beaches.",
latitude:15.9129,
longitude:79.7400,
touristPlaces:[
"Tirupati",
"Araku Valley",
"Visakhapatnam",
"Lepakshi"
],
famousFood:[
"Pulihora",
"Gongura Pickle",
"Pootharekulu"
],
bestTime:"October to March"
},

{
name:"Arunachal Pradesh",
code:"AR",
type:"State",
capital:"Itanagar",
image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
description:"Known for Tawang Monastery and Himalayan beauty.",
latitude:28.2180,
longitude:94.7278,
touristPlaces:[
"Tawang",
"Ziro Valley",
"Bomdila"
],
famousFood:[
"Thukpa",
"Momos"
],
bestTime:"October to April"
},

{
name:"Assam",
code:"AS",
type:"State",
capital:"Dispur",
image:"https://images.unsplash.com/photo-1528127269322-539801943592",
description:"Home of Kaziranga National Park and Assam Tea.",
latitude:26.2006,
longitude:92.9376,
touristPlaces:[
"Kaziranga",
"Majuli",
"Kamakhya Temple"
],
famousFood:[
"Assam Tea",
"Khar",
"Masor Tenga"
],
bestTime:"October to April"
},

{
name:"Bihar",
code:"BR",
type:"State",
capital:"Patna",
image:"https://images.unsplash.com/photo-1570168007204-dfb528c6958f",
description:"Birthplace of Buddhism and Nalanda University.",
latitude:25.0961,
longitude:85.3131,
touristPlaces:[
"Bodh Gaya",
"Rajgir",
"Nalanda",
"Patna Sahib"
],
famousFood:[
"Litti Chokha",
"Thekua",
"Khaja"
],
bestTime:"October to March"
},

{
name:"Chhattisgarh",
code:"CG",
type:"State",
capital:"Raipur",
image:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
description:"Known for waterfalls, forests and tribal culture.",
latitude:21.2787,
longitude:81.8661,
touristPlaces:[
"Chitrakote Falls",
"Tirathgarh Falls",
"Barnawapara"
],
famousFood:[
"Chila",
"Faraa"
],
bestTime:"October to February"
},

{
name:"Goa",
code:"GA",
type:"State",
capital:"Panaji",
image:"https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
description:"India's beach paradise famous for nightlife.",
latitude:15.2993,
longitude:74.1240,
touristPlaces:[
"Baga Beach",
"Calangute",
"Dudhsagar Falls",
"Fort Aguada"
],
famousFood:[
"Goan Fish Curry",
"Bebinca",
"Prawn Balchao"
],
bestTime:"November to February"
},

{
name:"Gujarat",
code:"GJ",
type:"State",
capital:"Gandhinagar",
image:"https://images.unsplash.com/photo-1593693411515-c20261bcad6e",
description:"Home of Statue of Unity and Gir Forest.",
latitude:22.2587,
longitude:71.1924,
touristPlaces:[
"Statue of Unity",
"Somnath",
"Dwarka",
"Rann of Kutch"
],
famousFood:[
"Dhokla",
"Fafda",
"Khandvi"
],
bestTime:"October to February"
},

{
name:"Haryana",
code:"HR",
type:"State",
capital:"Chandigarh",
image:"https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
description:"Known for agriculture, sports and modern cities.",
latitude:29.0588,
longitude:76.0856,
touristPlaces:[
"Kurukshetra",
"Sultanpur Bird Sanctuary",
"Pinjore Garden"
],
famousFood:[
"Bajra Khichdi",
"Kadhi Pakora",
"Mixed Paratha"
],
bestTime:"October to March"
},

{
name:"Himachal Pradesh",
code:"HP",
type:"State",
capital:"Shimla",
image:"https://images.unsplash.com/photo-1516483638261-f4dbaf036963",
description:"Snow mountains, Shimla, Manali and adventure tourism.",
latitude:31.1048,
longitude:77.1734,
touristPlaces:[
"Shimla",
"Manali",
"Dharamshala",
"Spiti Valley"
],
famousFood:[
"Siddu",
"Madra",
"Babru"
],
bestTime:"March to June"
},

{
name:"Jharkhand",
code:"JH",
type:"State",
capital:"Ranchi",
image:"https://images.unsplash.com/photo-1500534314209-a26db0f5b0df",
description:"Known for waterfalls, forests and wildlife.",
latitude:23.6102,
longitude:85.2799,
touristPlaces:[
"Hundru Falls",
"Netarhat",
"Betla National Park"
],
famousFood:[
"Dhuska",
"Rugra"
],
bestTime:"October to February"
},

{
name:"Karnataka",
code:"KA",
type:"State",
capital:"Bengaluru",
image:"https://images.unsplash.com/photo-1588416499018-df1d8f9c8c8d",
description:"Famous for Bengaluru, Mysore Palace, Coorg and Hampi.",
latitude:15.3173,
longitude:75.7139,
touristPlaces:[
"Mysore Palace",
"Hampi",
"Coorg",
"Gokarna"
],
famousFood:[
"Bisi Bele Bath",
"Mysore Pak",
"Ragi Mudde"
],
bestTime:"October to March"
},

{
name:"Kerala",
code:"KL",
type:"State",
capital:"Thiruvananthapuram",
image:"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
description:"God's Own Country famous for backwaters and beaches.",
latitude:10.8505,
longitude:76.2711,
touristPlaces:[
"Munnar",
"Alleppey",
"Kochi",
"Thekkady"
],
famousFood:[
"Appam",
"Puttu",
"Kerala Sadya"
],
bestTime:"September to March"
},

{
name:"Madhya Pradesh",
code:"MP",
type:"State",
capital:"Bhopal",
image:"https://images.unsplash.com/photo-1595815771614-ade9d652a65d",
description:"Heart of India famous for Khajuraho and wildlife.",
latitude:22.9734,
longitude:78.6569,
touristPlaces:[
"Khajuraho",
"Sanchi",
"Kanha National Park",
"Pachmarhi"
],
famousFood:[
"Poha",
"Bhutte Ka Kees"
],
bestTime:"October to March"
},

{
name:"Maharashtra",
code:"MH",
type:"State",
capital:"Mumbai",
image:"https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7",
description:"Home of Mumbai, Ajanta Ellora caves and beaches.",
latitude:19.7515,
longitude:75.7139,
touristPlaces:[
"Gateway of India",
"Ajanta Caves",
"Mahabaleshwar",
"Lonavala"
],
famousFood:[
"Vada Pav",
"Misal Pav",
"Puran Poli"
],
bestTime:"October to March"
},

{
name:"Manipur",
code:"MN",
type:"State",
capital:"Imphal",
image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
description:"Known for Loktak Lake and natural beauty.",
latitude:24.6637,
longitude:93.9063,
touristPlaces:[
"Loktak Lake",
"Kangla Fort",
"Keibul Lamjao National Park"
],
famousFood:[
"Eromba",
"Chamthong"
],
bestTime:"October to March"
},

{
name:"Meghalaya",
code:"ML",
type:"State",
capital:"Shillong",
image:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
description:"Known for Cherrapunji, living root bridges and waterfalls.",
latitude:25.4670,
longitude:91.3662,
touristPlaces:[
"Shillong",
"Cherrapunji",
"Dawki",
"Living Root Bridge"
],
famousFood:[
"Jadoh",
"Dohneiiong"
],
bestTime:"October to April"
},

{
name:"Mizoram",
code:"MZ",
type:"State",
capital:"Aizawl",
image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
description:"Known for mountains, forests and peaceful environment.",
latitude:23.1645,
longitude:92.9376,
touristPlaces:[
"Aizawl",
"Vantawng Falls",
"Reiek"
],
famousFood:[
"Bai",
"Sawhchiar"
],
bestTime:"October to March"
},

{
name:"Nagaland",
code:"NL",
type:"State",
capital:"Kohima",
image:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
description:"Famous for Hornbill Festival and tribal culture.",
latitude:26.1584,
longitude:94.5624,
touristPlaces:[
"Kohima",
"Dzukou Valley",
"Mokokchung"
],
famousFood:[
"Smoked Pork",
"Axone"
],
bestTime:"October to May"
},

{
name:"Odisha",
code:"OD",
type:"State",
capital:"Bhubaneswar",
image:"https://images.unsplash.com/photo-1570168007204-dfb528c6958f",
description:"Home of Jagannath Temple, Konark Sun Temple and Chilika Lake.",
latitude:20.9517,
longitude:85.0985,
touristPlaces:[
"Puri",
"Konark",
"Chilika Lake",
"Bhubaneswar"
],
famousFood:[
"Dalma",
"Chhena Poda"
],
bestTime:"October to February"
},

{
name:"Punjab",
code:"PB",
type:"State",
capital:"Chandigarh",
image:"https://images.unsplash.com/photo-1593693411515-c20261bcad6e",
description:"Known for Golden Temple and Punjabi culture.",
latitude:31.1471,
longitude:75.3412,
touristPlaces:[
"Golden Temple",
"Wagah Border",
"Jallianwala Bagh"
],
famousFood:[
"Makki Ki Roti",
"Sarson Ka Saag",
"Lassi"
],
bestTime:"October to March"
},

{
name:"Rajasthan",
code:"RJ",
type:"State",
capital:"Jaipur",
image:"https://images.unsplash.com/photo-1477587458883-47145ed94245",
description:"Known for Jaipur, Udaipur, Jaisalmer forts and Thar Desert.",
latitude:27.0238,
longitude:74.2179,
touristPlaces:[
"Jaipur",
"Udaipur",
"Jaisalmer",
"Mount Abu"
],
famousFood:[
"Dal Baati Churma",
"Ghewar"
],
bestTime:"October to March"
},

{
name:"Sikkim",
code:"SK",
type:"State",
capital:"Gangtok",
image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
description:"Famous for Kanchenjunga and monasteries.",
latitude:27.5330,
longitude:88.5122,
touristPlaces:[
"Gangtok",
"Tsomgo Lake",
"Nathula Pass"
],
famousFood:[
"Momos",
"Thukpa"
],
bestTime:"March to June"
},

{
name:"Tamil Nadu",
code:"TN",
type:"State",
capital:"Chennai",
image:"https://images.unsplash.com/photo-1588416499018-df1d8f9c8c8d",
description:"Known for Marina Beach, Ooty and Meenakshi Temple.",
latitude:11.1271,
longitude:78.6569,
touristPlaces:[
"Chennai",
"Ooty",
"Kodaikanal",
"Madurai"
],
famousFood:[
"Idli",
"Dosa",
"Pongal"
],
bestTime:"October to March"
},

{
name:"Telangana",
code:"TG",
type:"State",
capital:"Hyderabad",
image:"https://images.unsplash.com/photo-1564507592333-c60657eea523",
description:"Home of Charminar and Golconda Fort.",
latitude:18.1124,
longitude:79.0193,
touristPlaces:[
"Charminar",
"Golconda Fort",
"Ramoji Film City"
],
famousFood:[
"Hyderabadi Biryani",
"Haleem"
],
bestTime:"October to February"
},

{
name:"Tripura",
code:"TR",
type:"State",
capital:"Agartala",
image:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
description:"Known for Ujjayanta Palace and green landscapes.",
latitude:23.9408,
longitude:91.9882,
touristPlaces:[
"Ujjayanta Palace",
"Neermahal"
],
famousFood:[
"Mui Borok"
],
bestTime:"October to March"
},

{
name:"Uttar Pradesh",
code:"UP",
type:"State",
capital:"Lucknow",
image:"https://images.unsplash.com/photo-1564507592333-c60657eea523",
description:"Home of Taj Mahal, Ayodhya and Varanasi.",
latitude:26.8467,
longitude:80.9462,
touristPlaces:[
"Agra",
"Varanasi",
"Ayodhya",
"Prayagraj"
],
famousFood:[
"Tunday Kabab",
"Petha",
"Bedai"
],
bestTime:"October to March"
},

{
name:"Uttarakhand",
code:"UK",
type:"State",
capital:"Dehradun",
image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
description:"Known for Kedarnath, Badrinath, Mussoorie and Rishikesh.",
latitude:30.0668,
longitude:79.0193,
touristPlaces:[
"Kedarnath",
"Badrinath",
"Rishikesh",
"Mussoorie",
"Nainital"
],
famousFood:[
"Aloo Ke Gutke",
"Kafuli",
"Bal Mithai"
],
bestTime:"March to June"
},

{
name:"West Bengal",
code:"WB",
type:"State",
capital:"Kolkata",
image:"https://images.unsplash.com/photo-1524499982521-1ffd58dd89ea",
description:"Known for Kolkata, Darjeeling and Sundarbans.",
latitude:22.9868,
longitude:87.8550,
touristPlaces:[
"Darjeeling",
"Sundarbans",
"Victoria Memorial",
"Digha"
],
famousFood:[
"Rosogolla",
"Misti Doi",
"Kathi Roll"
],
bestTime:"October to March"
},

{
name:"Andaman and Nicobar Islands",
code:"AN",
type:"Union Territory",
capital:"Port Blair",
image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
description:"Crystal clear beaches and scuba diving.",
latitude:11.7401,
longitude:92.6586,
touristPlaces:["Havelock Island","Cellular Jail"],
famousFood:["Sea Food"],
bestTime:"October to May"
},

{
name:"Chandigarh",
code:"CH",
type:"Union Territory",
capital:"Chandigarh",
image:"https://images.unsplash.com/photo-1519501025264-65ba15a82390",
description:"India's first planned city.",
latitude:30.7333,
longitude:76.7794,
touristPlaces:["Rock Garden","Sukhna Lake"],
famousFood:["Chole Bhature"],
bestTime:"October to March"
},

{
name:"Dadra and Nagar Haveli and Daman and Diu",
code:"DN",
type:"Union Territory",
capital:"Daman",
image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
description:"Portuguese heritage and beaches.",
latitude:20.3974,
longitude:72.8328,
touristPlaces:["Devka Beach","Jampore Beach"],
famousFood:["Sea Food"],
bestTime:"October to March"
},

{
name:"Delhi",
code:"DL",
type:"Union Territory",
capital:"New Delhi",
image:"https://images.unsplash.com/photo-1587474260584-136574528ed5",
description:"Capital of India.",
latitude:28.6139,
longitude:77.2090,
touristPlaces:[
"India Gate",
"Red Fort",
"Qutub Minar",
"Lotus Temple"
],
famousFood:[
"Chole Bhature",
"Paratha",
"Butter Chicken"
],
bestTime:"October to March"
},

{
name:"Jammu and Kashmir",
code:"JK",
type:"Union Territory",
capital:"Srinagar",
image:"https://images.unsplash.com/photo-1595815771614-ade9d652a65d",
description:"Paradise on Earth.",
latitude:34.0837,
longitude:74.7973,
touristPlaces:[
"Dal Lake",
"Gulmarg",
"Pahalgam",
"Sonmarg"
],
famousFood:[
"Rogan Josh",
"Kahwa"
],
bestTime:"April to October"
},

{
name:"Ladakh",
code:"LA",
type:"Union Territory",
capital:"Leh",
image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
description:"Himalayan landscapes and Pangong Lake.",
latitude:34.1526,
longitude:77.5770,
touristPlaces:[
"Pangong Lake",
"Nubra Valley",
"Magnetic Hill"
],
famousFood:[
"Thukpa",
"Momos"
],
bestTime:"May to September"
},

{
name:"Lakshadweep",
code:"LD",
type:"Union Territory",
capital:"Kavaratti",
image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
description:"Coral islands and beaches.",
latitude:10.5667,
longitude:72.6417,
touristPlaces:[
"Agatti Island",
"Bangaram Island"
],
famousFood:[
"Sea Food"
],
bestTime:"October to March"
},

{
name:"Puducherry",
code:"PY",
type:"Union Territory",
capital:"Puducherry",
image:"https://images.unsplash.com/photo-1524499982521-1ffd58dd89ea",
description:"French architecture and beaches.",
latitude:11.9416,
longitude:79.8083,
touristPlaces:[
"Auroville",
"Promenade Beach"
],
famousFood:[
"French Cuisine",
"Sea Food"
],
bestTime:"October to March"
}

];

export default states;