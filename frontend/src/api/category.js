import {apiRequest} from "./index";

export const categoryAPI = {
    getFeaturedCategory: () => apiRequest('categories')
};
