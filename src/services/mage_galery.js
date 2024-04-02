import apiService from "./api_service";

export const getImagGalerySample = async (accessToken) => {
    try {

        const response = await apiService.get(`image/galery/sample`, {
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

export const getImagGalery = async () => {
    try {

        const response = await apiService.get(`image/galery`, {
            headers: {
                // Authorization: accessToken,
                'Content-Type': 'application/json'
            }
        });

        return response
    } catch (error) {
        return error.response
    }
};

export const postImageGalery = async (accessToken, images,) => {
    try {

        const formData = new FormData();
        for (const image of images) {
            formData.append('images[]', image);
        }
        

        const response = await apiService.post(`super-admin/image/galery/create`, formData, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'multipart/form-data'
            }
        });
        
        return response
    } catch (error) {
        return error.response
    }
};

export const deleteImageGalery = async (accessToken, imageId,) => {
    try {
        const response = await apiService.post(`super-admin/image/galery/delete/${encodeURIComponent(imageId)}`, {}, {
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