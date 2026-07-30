import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { GoogleGenAI } from "@google/genai";
import State from "../models/State.js";

const router = express.Router();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ GEMINI_API_KEY is missing from backend .env");
}

const ai = apiKey
  ? new GoogleGenAI({ apiKey })
  : null;

/* =========================================================
   TRIPO HOTEL + RESTAURANT DATABASE
   4 HOTELS + 4 RESTAURANTS FOR EVERY STATE / UT
   ========================================================= */

const TRIPO_PLACES = {

  "Andhra Pradesh": {
    hotels: [
      "Taj Tirupati - Tirupati",
      "Marasa Sarovar Premiere - Tirupati",
      "Novotel Visakhapatnam Varun Beach - Visakhapatnam",
      "The Gateway Hotel Beach Road - Visakhapatnam"
    ],
    restaurants: [
      "Daspalla Executive Court Restaurant - Visakhapatnam",
      "Dharani Restaurant - Vijayawada",
      "RRR Restaurant - Tirupati",
      "Southern Spice - Visakhapatnam"
    ]
  },

  "Arunachal Pradesh": {
    hotels: [
      "Hotel Donyi Polo Ashok - Itanagar",
      "Cygnett Inn Trendz - Itanagar",
      "Hotel Nefa - Itanagar",
      "Hotel Toshi - Tawang"
    ],
    restaurants: [
      "Chakraborty Restaurant - Itanagar",
      "Hotel Neha Restaurant - Itanagar",
      "Dragon Restaurant - Tawang",
      "Orange Restaurant - Tawang"
    ]
  },

  "Assam": {
    hotels: [
      "Radisson Blu Hotel Guwahati - Guwahati",
      "Vivanta Guwahati - Guwahati",
      "Hotel Palacio - Guwahati",
      "Kiranshree Grand - Guwahati"
    ],
    restaurants: [
      "Khorikaa - Guwahati",
      "Guwahati Address - Guwahati",
      "Paradise Restaurant - Guwahati",
      "Gam's Delicacy - Guwahati"
    ]
  },

  "Bihar": {
    hotels: [
      "Maurya Patna - Patna",
      "Lemon Tree Premier Patna - Patna",
      "Hotel Chanakya - Patna",
      "Amalfi Grand - Patna"
    ],
    restaurants: [
      "Pind Balluchi - Patna",
      "Bansi Vihar - Patna",
      "Biryani Mahal - Patna",
      "17 Degrees - Patna"
    ]
  },

  "Chhattisgarh": {
    hotels: [
      "Courtyard by Marriott Raipur - Raipur",
      "Sayaji Raipur - Raipur",
      "Hyatt Raipur - Raipur",
      "Hotel Babylon International - Raipur"
    ],
    restaurants: [
      "Girnar Restaurant - Raipur",
      "The Yellow Chilli - Raipur",
      "Mocha - Raipur",
      "Saffron Restaurant - Raipur"
    ]
  },

  "Goa": {
    hotels: [
      "Taj Exotica Resort & Spa - Benaulim",
      "ITC Grand Goa Resort & Spa - Cansaulim",
      "Caravela Beach Resort - Varca",
      "The Leela Goa - Cavelossim"
    ],
    restaurants: [
      "Martin's Corner - Betalbatim",
      "Fisherman's Wharf - Cavelossim",
      "Thalassa - Vagator",
      "Gunpowder - Assagao"
    ]
  },

  "Gujarat": {
    hotels: [
      "Hyatt Regency Ahmedabad - Ahmedabad",
      "ITC Narmada - Ahmedabad",
      "Courtyard by Marriott Ahmedabad - Ahmedabad",
      "The Fern Ahmedabad - Ahmedabad"
    ],
    restaurants: [
      "Agashiye - Ahmedabad",
      "Gordhan Thal - Ahmedabad",
      "Swati Snacks - Ahmedabad",
      "Vishalla - Ahmedabad"
    ]
  },

  "Haryana": {
    hotels: [
      "The Oberoi Gurgaon - Gurugram",
      "Trident Gurgaon - Gurugram",
      "The Leela Ambience Gurugram Hotel & Residences - Gurugram",
      "Hyatt Regency Gurgaon - Gurugram"
    ],
    restaurants: [
      "Indian Grill Room - Gurugram",
      "Carnatic Cafe - Gurugram",
      "Farzi Cafe - Gurugram",
      "Prankster - Gurugram"
    ]
  },

  "Himachal Pradesh": {
    hotels: [
      "The Oberoi Cecil - Shimla",
      "Wildflower Hall - Shimla",
      "Radisson Hotel Shimla - Shimla",
      "The Himalayan - Manali"
    ],
    restaurants: [
      "Cafe Simla Times - Shimla",
      "Wake & Bake Cafe - Shimla",
      "Johnson's Cafe - Manali",
      "Chopsticks Restaurant - Manali"
    ]
  },

  "Jharkhand": {
    hotels: [
      "Radisson Blu Hotel Ranchi - Ranchi",
      "Le Lac Sarovar Portico - Ranchi",
      "Capitol Hill - Ranchi",
      "The Sonnet - Jamshedpur"
    ],
    restaurants: [
      "Kaveri Restaurant - Ranchi",
      "Moti Mahal Delux - Ranchi",
      "The Oriental Kitchen - Ranchi",
      "Novelty Restaurant - Jamshedpur"
    ]
  },

  "Karnataka": {
    hotels: [
      "Taj West End - Bengaluru",
      "The Leela Palace Bengaluru - Bengaluru",
      "ITC Gardenia - Bengaluru",
      "The Oberoi Bengaluru - Bengaluru"
    ],
    restaurants: [
      "Mavalli Tiffin Rooms - Bengaluru",
      "Karavalli - Bengaluru",
      "Vidyarthi Bhavan - Bengaluru",
      "Nagarjuna - Bengaluru"
    ]
  },

  "Kerala": {
    hotels: [
      "Taj Malabar Resort & Spa - Kochi",
      "Grand Hyatt Kochi Bolgatty - Kochi",
      "Kumarakom Lake Resort - Kumarakom",
      "The Leela Kovalam - Kovalam"
    ],
    restaurants: [
      "Paragon Restaurant - Kozhikode",
      "Kadal Sadhya - Kochi",
      "Dhe Puttu - Kochi",
      "Fort House Restaurant - Kochi"
    ]
  },

  "Madhya Pradesh": {
    hotels: [
      "Taj Lakefront Bhopal - Bhopal",
      "Jehan Numa Palace - Bhopal",
      "Radisson Blu Hotel Indore - Indore",
      "The Lalit Temple View Khajuraho - Khajuraho"
    ],
    restaurants: [
      "Sarafa Bazaar - Indore",
      "Shree Gurukripa - Indore",
      "Indian Coffee House - Bhopal",
      "Prithvi Restaurant - Khajuraho"
    ]
  },

  "Maharashtra": {
    hotels: [
      "Taj Mahal Palace - Mumbai",
      "The Oberoi Mumbai - Mumbai",
      "Trident Nariman Point - Mumbai",
      "The Leela Mumbai - Mumbai"
    ],
    restaurants: [
      "Trishna - Mumbai",
      "Britannia & Co. - Mumbai",
      "Leopold Cafe - Mumbai",
      "Vada Pav at Ashok Vada Pav - Mumbai"
    ]
  },

  "Manipur": {
    hotels: [
      "Classic Grande - Imphal",
      "The Classic Hotel - Imphal",
      "Hotel Imphal - Imphal",
      "Hotel Sangai Continental - Imphal"
    ],
    restaurants: [
      "Chakluk Restaurant - Imphal",
      "Naorem Restaurant - Imphal",
      "Classic Cafe - Imphal",
      "Hotel Imphal Restaurant - Imphal"
    ]
  },

  "Meghalaya": {
    hotels: [
      "Ri Kynjai Serenity by the Lake - Shillong",
      "Courtyard by Marriott Shillong - Shillong",
      "Hotel Polo Towers - Shillong",
      "The Centre Point - Shillong"
    ],
    restaurants: [
      "Trattoria - Shillong",
      "City Hut Dhaba - Shillong",
      "Jiva Grill - Shillong",
      "Dylan's Cafe - Shillong"
    ]
  },

  "Mizoram": {
    hotels: [
      "Hotel Regency - Aizawl",
      "Hotel Floria - Aizawl",
      "Hotel Chief - Aizawl",
      "The Grand Hotel - Aizawl"
    ],
    restaurants: [
      "David's Kitchen - Aizawl",
      "Red Pepper Restaurant - Aizawl",
      "Mizo Diner - Aizawl",
      "Taste of Mizoram - Aizawl"
    ]
  },

  "Nagaland": {
    hotels: [
      "Hotel Japfu - Kohima",
      "Hotel Vivor - Kohima",
      "Hotel Cimorb - Kohima",
      "The Heritage - Kohima"
    ],
    restaurants: [
      "Naga Bowl - Kohima",
      "Kathi Junction - Kohima",
      "Dream Cafe - Kohima",
      "Funky Buddha - Kohima"
    ]
  },

  "Odisha": {
    hotels: [
      "Mayfair Lagoon - Bhubaneswar",
      "Trident Bhubaneswar - Bhubaneswar",
      "Mayfair Heritage - Puri",
      "Swosti Premium - Bhubaneswar"
    ],
    restaurants: [
      "Dalma - Bhubaneswar",
      "The Zaika - Bhubaneswar",
      "Wildgrass Restaurant - Bhubaneswar",
      "Chung Wah - Bhubaneswar"
    ]
  },

  "Punjab": {
    hotels: [
      "Taj Swarna - Amritsar",
      "Hyatt Regency Amritsar - Amritsar",
      "Ramada by Wyndham Amritsar - Amritsar",
      "Radisson Blu Hotel Amritsar - Amritsar"
    ],
    restaurants: [
      "Kesar Da Dhaba - Amritsar",
      "Bharawan Da Dhaba - Amritsar",
      "Beera Chicken House - Amritsar",
      "Makhan Fish & Chicken Corner - Amritsar"
    ]
  },

  "Rajasthan": {
    hotels: [
      "Rambagh Palace - Jaipur",
      "ITC Rajputana - Jaipur",
      "Taj Lake Palace - Udaipur",
      "The Oberoi Udaivilas - Udaipur"
    ],
    restaurants: [
      "Suvarna Mahal - Jaipur",
      "1135 AD - Jaipur",
      "Spice Court - Jaipur",
      "Ambrai - Udaipur"
    ]
  },

  "Sikkim": {
    hotels: [
      "Mayfair Spa Resort & Casino - Gangtok",
      "The Elgin Nor-Khill - Gangtok",
      "Taj Guras Kutir Resort & Spa - Gangtok",
      "Summit Norling Resort & Spa - Gangtok"
    ],
    restaurants: [
      "Taste of Tibet - Gangtok",
      "The Coffee Shop - Gangtok",
      "Nimtho - Gangtok",
      "Baker's Cafe - Gangtok"
    ]
  },

  "Tamil Nadu": {
    hotels: [
      "Taj Coromandel - Chennai",
      "ITC Grand Chola - Chennai",
      "The Leela Palace Chennai - Chennai",
      "Taj Fisherman's Cove Resort & Spa - Mahabalipuram"
    ],
    restaurants: [
      "Murugan Idli Shop - Chennai",
      "Dakshin - Chennai",
      "Saravana Bhavan - Chennai",
      "Kumar Mess - Madurai"
    ]
  },

  "Telangana": {
    hotels: [
      "Taj Falaknuma Palace - Hyderabad",
      "ITC Kohenur - Hyderabad",
      "Park Hyatt Hyderabad - Hyderabad",
      "Trident Hyderabad - Hyderabad"
    ],
    restaurants: [
      "Paradise Biryani - Hyderabad",
      "Shah Ghouse - Hyderabad",
      "Bawarchi - Hyderabad",
      "Chutneys - Hyderabad"
    ]
  },

  "Tripura": {
    hotels: [
      "Hotel Polo Towers - Agartala",
      "Ginger Hotel Agartala - Agartala",
      "Hotel Sonar Tori - Agartala",
      "Hotel Welcome Palace - Agartala"
    ],
    restaurants: [
      "Ambrosia Restaurant - Agartala",
      "Ginger Restaurant - Agartala",
      "Cafe Frespresso - Agartala",
      "Haveli Restaurant - Agartala"
    ]
  },

  "Uttar Pradesh": {
    hotels: [
      "Tajview Agra - Agra",
      "ITC Mughal - Agra",
      "The Oberoi Amarvilas - Agra",
      "Taj Mahal Lucknow - Lucknow"
    ],
    restaurants: [
      "Tunday Kababi - Lucknow",
      "Dastarkhwan - Lucknow",
      "Royal Cafe - Lucknow",
      "Peshawri - Agra"
    ]
  },

  "Uttarakhand": {
    hotels: [
      "Taj Rishikesh Resort & Spa - Rishikesh",
      "Ananda in the Himalayas - Narendra Nagar",
      "The Savoy Hotel - Mussoorie",
      "Rokeby Manor - Mussoorie"
    ],
    restaurants: [
      "Chotiwala Restaurant - Rishikesh",
      "Little Buddha Cafe - Rishikesh",
      "Kalsang Friends Corner - Mussoorie",
      "Cafe de Tavern - Mussoorie"
    ]
  },

  "West Bengal": {
    hotels: [
      "The Oberoi Grand Kolkata - Kolkata",
      "ITC Royal Bengal - Kolkata",
      "Taj Bengal - Kolkata",
      "The Westin Kolkata Rajarhat - Kolkata"
    ],
    restaurants: [
      "6 Ballygunge Place - Kolkata",
      "Peter Cat - Kolkata",
      "Kasturi Restaurant - Kolkata",
      "Kosha Mangsho - Kolkata"
    ]
  },

  /* =========================
     UNION TERRITORIES
     ========================= */

  "Andaman and Nicobar Islands": {
    hotels: [
      "Taj Exotica Resort & Spa - Havelock Island",
      "SeaShell Havelock - Havelock Island",
      "Symphony Palms - Havelock Island",
      "SeaShell Port Blair - Port Blair"
    ],
    restaurants: [
      "Full Moon Cafe - Havelock Island",
      "Something Different - Havelock Island",
      "Anju Coco Resto - Havelock Island",
      "New Lighthouse Restaurant - Port Blair"
    ]
  },

  "Chandigarh": {
    hotels: [
      "Taj Chandigarh - Chandigarh",
      "Hyatt Centric Sector 17 Chandigarh - Chandigarh",
      "JW Marriott Hotel Chandigarh - Chandigarh",
      "The Lalit Chandigarh - Chandigarh"
    ],
    restaurants: [
      "Pal Dhaba - Chandigarh",
      "Nik Bakers - Chandigarh",
      "Indian Coffee House - Chandigarh",
      "Black Lotus - Chandigarh"
    ]
  },

  "Dadra and Nagar Haveli and Daman and Diu": {
    hotels: [
      "The Gold Beach Resort - Daman",
      "The Deltin Daman - Daman",
      "Cidade de Daman - Daman",
      "Treat Resort - Silvassa"
    ],
    restaurants: [
      "19Sixty One Restaurant - Daman",
      "Pepper Restaurant - Daman",
      "Leonardo Italian Mediterranean Dining - Daman",
      "Woodlands Restaurant - Silvassa"
    ]
  },

  "Delhi": {
    hotels: [
      "The Imperial New Delhi - New Delhi",
      "The Leela Palace New Delhi - New Delhi",
      "Taj Palace New Delhi - New Delhi",
      "The Oberoi New Delhi - New Delhi"
    ],
    restaurants: [
      "Indian Accent - New Delhi",
      "Bukhara - New Delhi",
      "Karim's - Old Delhi",
      "Sodabottleopenerwala - New Delhi"
    ]
  },

  "Jammu and Kashmir": {
    hotels: [
      "The Lalit Grand Palace Srinagar - Srinagar",
      "Vivanta Dal View - Srinagar",
      "Taj Dal View Srinagar - Srinagar",
      "Khyber Himalayan Resort & Spa - Gulmarg"
    ],
    restaurants: [
      "Mughal Darbar - Srinagar",
      "Ahdoos - Srinagar",
      "Shamyana Restaurant - Srinagar",
      "Winterfell Cafe - Srinagar"
    ]
  },

  "Ladakh": {
    hotels: [
      "The Grand Dragon Ladakh - Leh",
      "The Bodhi Tree Hotel - Leh",
      "Chospa Hotel - Leh",
      "Ladakh Sarai Resort - Leh"
    ],
    restaurants: [
      "The Tibetan Kitchen - Leh",
      "Bon Appetit - Leh",
      "Lamayuru Restaurant - Leh",
      "Gesmo Restaurant - Leh"
    ]
  },

  "Lakshadweep": {
    hotels: [
      "Bangaram Island Resort - Bangaram",
      "Agatti Island Beach Resort - Agatti",
      "Sea Shell Beach Resort - Agatti",
      "Kavaratti Island Resort - Kavaratti"
    ],
    restaurants: [
      "Agatti Island Resort Restaurant - Agatti",
      "Bangaram Island Resort Restaurant - Bangaram",
      "Kavaratti Island Resort Restaurant - Kavaratti",
      "Sea Shell Restaurant - Agatti"
    ]
  },

  "Puducherry": {
    hotels: [
      "Palais de Mahe - Puducherry",
      "Le Dupleix - Puducherry",
      "The Promenade - Puducherry",
      "Maison Perumal - Puducherry"
    ],
    restaurants: [
      "Villa Shanti - Puducherry",
      "Cafe des Arts - Puducherry",
      "Le Dupleix Restaurant - Puducherry",
      "Coromandel Cafe - Puducherry"
    ]
  }
};


/* =========================================================
   FIND STATE / UT FROM USER QUESTION
   ========================================================= */

function findDestination(message) {

  const lower = message.toLowerCase();

  const destination = Object.keys(TRIPO_PLACES).find(
    (name) =>
      lower.includes(name.toLowerCase())
  );

  return destination || null;
}


/* =========================================================
   WAIT
   ========================================================= */

function wait(ms) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
}


/* =========================================================
   GEMINI REQUEST
   FAST PRIMARY + LIMITED FALLBACK
   ========================================================= */

async function generateAI(systemInstruction, contents) {

  const models = [
    "gemini-3.1-flash-lite",
    "gemini-3-flash-preview",
    "gemini-3.5-flash"
  ];

  let lastError = null;

  for (const model of models) {

    try {

      console.log(
        `🤖 TRIPO AI → ${model}`
      );

      const result =
        await ai.models.generateContent({

          model,

          contents,

          config: {

            systemInstruction,

            thinkingConfig: {
              thinkingLevel: "minimal"
            },

            maxOutputTokens: 1800

          }

        });

      const text = result?.text?.trim();

      if (text) {

        console.log(
          `✅ TRIPO AI answered using ${model}`
        );

        return text;

      }

      throw new Error(
        "Empty Gemini response."
      );

    }

    catch (error) {

      lastError = error;

      const errorMessage =
        error?.message ||
        String(error);

      console.log(
        `⚠️ ${model} failed:`,
        errorMessage
      );

      const temporary =
        errorMessage.includes("503") ||
        errorMessage.includes("UNAVAILABLE") ||
        errorMessage.includes("429") ||
        errorMessage.includes("RESOURCE_EXHAUSTED") ||
        errorMessage.includes("high demand");

      const unavailable =
        errorMessage.includes("404") ||
        errorMessage.includes("NOT_FOUND") ||
        errorMessage.includes("not available");

      /*
        Temporary problem:
        small wait and move to fallback.
      */

      if (temporary) {

        await wait(700);

        continue;

      }

      /*
        Model unavailable:
        immediately use next model.
      */

      if (unavailable) {

        continue;

      }

      /*
        Any other error:
        move to fallback.
      */

      continue;

    }

  }

  throw lastError ||
    new Error(
      "All Gemini models failed."
    );

}


/* =========================================================
   CHAT ROUTE
   ========================================================= */

router.post("/chat", async (req, res) => {

  try {

    const {
      message,
      history = []
    } = req.body;

    if (!message || !message.trim()) {

      return res.status(400).json({

        success: false,

        message:
          "Please enter your travel question."

      });

    }


    if (!apiKey || !ai) {

      return res.status(500).json({

        success: false,

        message:
          "Gemini API key is missing from backend .env"

      });

    }


    /* =====================================================
       DESTINATION DETECTION
       ===================================================== */

    const destination =
      findDestination(message);


    /* =====================================================
       ONLY LOAD REQUIRED STATE DATA
       ===================================================== */

    let databaseContext = "";

    try {

      if (destination) {

        const state =
          await State.findOne({
            name: destination
          })
          .select(
            "name capital description cities"
          )
          .lean();

        if (state) {

          databaseContext = `
TRIPO STATE DATABASE

State/UT:
${state.name}

Capital:
${state.capital || "Not available"}

Description:
${state.description || "Not available"}

Cities:
${
  Array.isArray(state.cities)
    ? state.cities.join(", ")
    : "Not available"
}
`;

        }

      }

    }

    catch (dbError) {

      console.log(
        "⚠️ State database unavailable:",
        dbError.message
      );

    }


    /* =====================================================
       HOTEL / RESTAURANT DATABASE
       ===================================================== */

    let placeContext = "";

    if (destination) {

      const places =
        TRIPO_PLACES[destination];

      if (places) {

        placeContext = `
TRIPO RECOMMENDED HOTELS
${places.hotels
  .map(
    (hotel, index) =>
      `${index + 1}. ${hotel}`
  )
  .join("\n")}

TRIPO RECOMMENDED RESTAURANTS
${places.restaurants
  .map(
    (restaurant, index) =>
      `${index + 1}. ${restaurant}`
  )
  .join("\n")}
`;

      }

    }


    /* =====================================================
       SYSTEM PROMPT
       ===================================================== */

    const systemPrompt = `
You are TRIPO AI, the official AI Travel Assistant
for TRIPO, an India travel planning platform.

Your job is to help users plan practical trips across
India.

You know about:

• Indian States
• Union Territories
• Cities
• Tourist attractions
• Hotels
• Restaurants
• Local food
• Budget travel
• Family travel
• Honeymoon
• Solo travel
• Weekend trips
• Road trips
• Transportation
• Weather travel advice
• Safety
• Itineraries
• Budget estimates

IMPORTANT RESPONSE RULES:

1. Be friendly, helpful and practical.

2. If a user asks:
"Plan a trip to Goa"
give a useful itinerary immediately.

3. If the user gives a number of days,
create a day-by-day itinerary.

4. If the user gives a budget,
give an approximate breakdown for:
Stay
Food
Transport
Sightseeing
Activities

5. If the user asks for hotels or restaurants,
use the TRIPO RECOMMENDED DATABASE below whenever
the requested destination matches it.

6. NEVER say that these hotels/restaurants are
TRIPO partners or have a tie-up.

7. Describe them simply as:
"TRIPO Recommended Hotels"
or
"TRIPO Recommended Restaurants".

8. NEVER invent a hotel or restaurant and claim that
it exists in the TRIPO database.

9. If the requested destination has no TRIPO database
listing in the supplied context, give general travel
advice without claiming exact TRIPO listings.

10. If the user asks for a trip to a specific destination,
include useful hotels/restaurants when relevant.

11. For a normal trip request, do NOT spend too much time
talking about hotels/restaurants unless useful.

12. Keep responses readable.

13. Use headings, bullets and day-by-day structure.

14. Do not unnecessarily ask follow-up questions.

15. For long trips such as 10, 15 or 20 days,
still provide a complete itinerary, but keep each day's
description concise.

16. Weather information is approximate unless live weather
data is explicitly available.

17. If the user asks something unrelated to travel,
politely say that TRIPO AI specializes in travel.

${databaseContext}

${placeContext}
`;


    /* =====================================================
       CONVERSATION HISTORY
       ===================================================== */

    const contents = [];


    if (Array.isArray(history)) {

      history
        .filter(
          (item) =>
            item &&
            item.text &&
            (
              item.role === "user" ||
              item.role === "assistant"
            )
        )
        .slice(-6)
        .forEach((item) => {

          contents.push({

            role:
              item.role === "assistant"
                ? "model"
                : "user",

            parts: [
              {
                text: item.text
              }
            ]

          });

        });

    }


    /* =====================================================
       CURRENT USER MESSAGE
       ===================================================== */

    contents.push({

      role: "user",

      parts: [
        {
          text: message.trim()
        }
      ]

    });


    /* =====================================================
       GEMINI
       ===================================================== */

    const answer =
      await generateAI(
        systemPrompt,
        contents
      );


    return res.status(200).json({

      success: true,

      answer

    });


  }

  catch (error) {

    console.error(
      "❌ TRIPO AI FINAL ERROR:",
      error
    );

    return res.status(503).json({

      success: false,

      message:
        "TRIPO AI is temporarily busy. Please try again in a few seconds."

    });

  }

});


export default router;