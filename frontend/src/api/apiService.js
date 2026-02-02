const API_BASE_URL = "http://localhost:3002/api";

// Auth API calls
export const authAPI = {
  signup: async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    return response.json();
  },

  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  getProfile: async (token) => {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
};

// Trading API calls
export const tradingAPI = {
  getAllHoldings: async () => {
    const response = await fetch(`${API_BASE_URL}/allHoldings`);
    return response.json();
  },

  getAllPositions: async () => {
    const response = await fetch(`${API_BASE_URL}/allPositions`);
    return response.json();
  },

  getAllOrders: async () => {
    const response = await fetch(`${API_BASE_URL}/allOrders`);
    return response.json();
  },

  createOrder: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/newOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
    return response.json();
  },
};
