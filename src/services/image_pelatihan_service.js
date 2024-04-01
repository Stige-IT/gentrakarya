import apiService from "./api_service"

export const getImagePelatihan = async (pelatihanId) => {
    try {
        const response = apiService.get(`image/pelatihan/${encodeURIComponent(pelatihanId)}`, {
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

export const postImageGaleryPelatihan = async (accessToken, pelatihanId, images) => {
    try {
        const formData = new FormData();
        for (const image of images) {
            formData.append('images[]', image);
        }

        const response = await apiService.post(`lembaga/image/pelatihan/${encodeURIComponent(pelatihanId)}/create`, formData, {
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

export const deleteImageGaleryPelatihan = async (accessToken, imageId) => {
    try {
        const response = await apiService.post(`lembaga/image/pelatihan/delete/${encodeURIComponent(imageId)}`, {}, {
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