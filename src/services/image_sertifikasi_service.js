import apiService from "./api_service"

export const getImageSertifikasi = async (sertifikasiId) => {
    try {
        const response = apiService.get(`image/sertifikasi/${encodeURIComponent(sertifikasiId)}`, {
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

export const postImageGalerySertifikasi = async (accessToken, sertifikasiId, images) => {
    try {
        const formData = new FormData();
        for (const image of images) {
            formData.append('images[]', image);
        }

        const response = await apiService.post(`lembaga/image/sertifikasi/${encodeURIComponent(sertifikasiId)}/create`, formData, {
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

export const deleteImageGalerySertifikasi = async (accessToken, imageId) => {
    try {
        const response = await apiService.post(`lembaga/image/sertifikasi/delete/${encodeURIComponent(imageId)}`, {}, {
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