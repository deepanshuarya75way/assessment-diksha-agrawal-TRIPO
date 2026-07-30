import mongoose from "mongoose";
import dotenv from "dotenv";
import State from "../models/State.js";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);

const states = [

{
name:"Uttarakhand",
capital:"Dehradun",
description:"Uttarakhand is famous for mountains, temples, rivers and adventure tourism.",
image:"https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
famousPlaces:["Mussoorie","Nainital","Rishikesh","Haridwar","Kedarnath"],
famousFood:["Kafuli","Aloo Ke Gutke","Bal Mithai"],
bestTimeToVisit:"March - June",
language:"Hindi",
population:"10 Million",
area:"53,483 km²",
weather:"Cool",
averageBudget:3500,
googleMap:"https://maps.google.com/?q=Uttarakhand",
isFeatured:true
},

{
name:"Rajasthan",
capital:"Jaipur",
description:"Land of forts, palaces and deserts.",
image:"https://images.unsplash.com/photo-1599661046289-e31897846e41",
famousPlaces:["Jaipur","Udaipur","Jaisalmer","Mount Abu"],
famousFood:["Dal Baati","Ghewar"],
bestTimeToVisit:"October - March",
language:"Hindi",
population:"81 Million",
area:"342239 km²",
weather:"Hot",
averageBudget:4500,
googleMap:"https://maps.google.com/?q=Rajasthan",
isFeatured:true
},

{
name:"Goa",
capital:"Panaji",
description:"Goa is famous for beaches and nightlife.",
image:"https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
famousPlaces:["Baga","Calangute","Anjuna"],
famousFood:["Sea Food","Fish Curry"],
bestTimeToVisit:"November - February",
language:"Konkani",
population:"1.5 Million",
area:"3702 km²",
weather:"Pleasant",
averageBudget:6000,
googleMap:"https://maps.google.com/?q=Goa",
isFeatured:true
}

];

await State.deleteMany();

await State.insertMany(states);

console.log("States Inserted Successfully");

process.exit();