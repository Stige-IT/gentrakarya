import apiService from "./api_service"

export const getImageLoker = async (lokerId) => {
    try {
        const response = apiService.get(`image/loker/${encodeURIComponent(lokerId)}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    } catch (error) {
        return error.response
        console.error('Error fetching data:', error);
    }
}

export const postImageGaleryLoker = async (accessToken, lokerId, images) => {
    try {
        const formData = new FormData();
        for (const image of images) {
            formData.append('images[]', image);
        }

        const response = await apiService.post(`lembaga/image/loker/${encodeURIComponent(lokerId)}/create`, formData, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'multipart/form-data',
            }
        });
        return response
    } catch (error) {
        return error.response
        console.error('Error fetching data:', error);
    }
};

export const deleteImageGaleryLoker = async (accessToken, imageId) => {
    try {
        const response = await apiService.post(`lembaga/image/loker/delete/${encodeURIComponent(imageId)}`, {}, {
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