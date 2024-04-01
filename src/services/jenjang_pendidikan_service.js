import apiService from "./api_service";

export const getJenjangPendidikan = async () => {
    try {

        const response = await apiService.get(`jenjang-pendidikan`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};