const API =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const BASE_URL = `${API}/api`;

export const getCities = async () => {
  const res = await fetch(`${BASE_URL}/cities`);
  return res.json();
};

export const getStates = async () => {
  const res = await fetch(`${BASE_URL}/states`);
  return res.json();
};

export const createBooking = async (data) => {
  const res = await fetch(`${BASE_URL}/booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const askAI = async (message) => {
  const res = await fetch(`${BASE_URL}/ai/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  return res.json();
};

export const getWeather = async (city) => {
  const res = await fetch(
    `${BASE_URL}/weather?city=${encodeURIComponent(city)}`
  );

  return res.json();
};

export const createOrder = async (amount) => {
  const res = await fetch(`${BASE_URL}/payment/create-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  });

  return res.json();
};

export const verifyPayment = async (data) => {
  const res = await fetch(`${BASE_URL}/payment/verify-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};