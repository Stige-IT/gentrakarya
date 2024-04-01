import apiService from "./api_service";

export const getLayanan = async (accessToken) => {
    try {

        const response = await apiService.get(`layanan`, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            }
        });

        return response
    } catch (error) {
        return error.response
        console.error('Error fetching data:', error);
    }
};

export const postLayanan = async (accessToken, name, detail) => {
    try {

        const body = {
            'name': name,
            'detail': detail
        }
        const response = await apiService.post(`super-admin/layanan/create`, body, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            }
        });
        return response
    } catch (error) {
        return error.response
        console.error('Error fetching data:', error);
    }
};

export const deleteLayanan = async (accessToken, layananId) => {
    try {
        const response = await apiService.post(`super-admin/layanan/delete/${encodeURIComponent(layananId)}`, {}, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            }
        });
        return response
    } catch (error) {
        return error.response
        console.error('Error fetching data:', error);
    }
};
