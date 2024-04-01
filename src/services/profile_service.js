import apiService from "./api_service"

export const updateFotoProfile = async (accessToken, image) => {
    try {

        const formData = new FormData();
        formData.append('image', image);

        const response = apiService.post('profile/update/image', formData, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'multipart/form-data'
            }
        })
        return response
    } catch (error) {
        return error.response
    }
}