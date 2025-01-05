import { apiRequest } from "./index";

export const orderAPI = {
  createOrder: (data) => apiRequest("order", "POST", data),
  getOrder: () => apiRequest("order"),
};
