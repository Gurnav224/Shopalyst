// const apiUrl = "http://localhost:3000/api";
const apiUrl = import.meta.env.VITE_API_URL_VERCEL;
const token = localStorage.getItem("token");

console.log(apiUrl)


export const apiRequest = async (endpoint, method = "GET", body = null) => {
  try {
    const headers = {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    };

    const response = await fetch(`${apiUrl}/api/${endpoint}`, {
      method: method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`API, Error, ${response.statusText}`);
    }


    return response.json();
  } catch (error) {
    console.error("API Request Error: ", error);
    throw error;
  }
};
