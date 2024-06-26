import apiService from "./api_service";

export const getImageslider = async () => {
    try {

        const response = await apiService.get(`image/slider`, {
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

export const postImageSlider = async (accessToken, images,) => {
    try {

        const formData = new FormData();
        for (const image of images) {
            formData.append('images[]', image);
        }
        

        const response = await apiService.post(`super-admin/image/slider/create`, formData, {
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

export const deleteImageSlider = async (accessToken, imageId,) => {
    try {
        const response = await apiService.post(`super-admin/image/slider/delete/${encodeURIComponent(imageId)}`, {}, {
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