import apiService from "./api_service"

export const getImageMagang = async (magangId) => {
    try {
        const response = apiService.get(`image/magang/${encodeURIComponent(magangId)}`, {
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

export const postImageGaleryMagang = async (accessToken, magangId, images) => {
    try {
        const formData = new FormData();
        for (const image of images) {
            formData.append('images[]', image);
        }

        const response = await apiService.post(`lembaga/image/magang/${encodeURIComponent(magangId)}/create`, formData, {
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

export const deleteImageGaleryMagang = async (accessToken, imageId) => {
    try {
        const response = await apiService.post(`lembaga/image/magang/delete/${encodeURIComponent(imageId)}`, {}, {
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