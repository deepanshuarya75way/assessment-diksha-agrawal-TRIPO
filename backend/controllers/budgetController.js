exports.calculateBudget = (req, res) => {
  const { city, days, budget } = req.body;

  let hotel = 0, food = 0, travel = 0;

  if (city === "Jaipur") {
    hotel = 700 * days;
    food = 300 * days;
    travel = 200 * days;
  } else if (city === "Goa") {
    hotel = 1200 * days;
    food = 500 * days;
    travel = 400 * days;
  } else {
    hotel = 1000 * days;
    food = 400 * days;
    travel = 300 * days;
  }

  const total = hotel + food + travel;

  res.json({
    hotel,
    food,
    travel,
    total,
    status: total <= budget ? "Affordable ✅" : "Over Budget ❌"
  });
};