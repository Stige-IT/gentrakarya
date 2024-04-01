import apiService from "./api_service";

export const getRegistrasionCategory = async () => {
    try {
        const response = await apiService.get(`registration-category`,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        return response
    } catch (error) {
        return error.response
        console.error('Error fetching data:', error);
    }
};

export const getRegistrasionSubCategory = async (registrationCategoryId) => {
    try {
        const response = await apiService.get(`registration-sub-category/${encodeURIComponent(registrationCategoryId)}`,{
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response
    } catch (error) {
        return error.response
        console.error('Error fetching data:', error);
    }
};

export const showRegistrasionSubCategory = async (id) => {
    try {
        const response = await apiService.get(`registration-sub-category/show/${encodeURIComponent(id)}`,{
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response
    } catch (error) {
        return error.response
        console.error('Error fetching data:', error);
    }
};