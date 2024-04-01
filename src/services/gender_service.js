import apiService from "./api_service";

export const getGender = async () => {
    try {
        const response = await apiService.get(`gender`,{
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