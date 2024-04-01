import apiService from "./api_service"

export const getImageWorkshop = async (workshopId) => {
    try {
        const response = apiService.get(`image/workshop/${encodeURIComponent(workshopId)}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    } catch (error) {
        return error.response
    }
}

export const postImageGaleryWorkshop = async (accessToken, workshopId, images) => {
    try {
        const formData = new FormData();
        for (const image of images) {
            formData.append('images[]', image);
        }

        const response = await apiService.post(`lembaga/image/workshop/${encodeURIComponent(workshopId)}/create`, formData, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'multipart/form-data',
            }
        });
        return response
    } catch (error) {
        return error.response
    }
};

export const deleteImageGaleryWorkshop = async (accessToken, imageId) => {
    try {
        const response = await apiService.post(`lembaga/image/workshop/delete/${encodeURIComponent(imageId)}`, {}, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            }
        });
        return response
    } catch (error) {
        return error.response
    }
};