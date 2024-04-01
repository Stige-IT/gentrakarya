import apiService from "./api_service";

export const register = async (name, email, password, password_confirmation, gender_id, registrasion_category, registrasion_sub_category,) => {
    try {

        const body = {
            'name': name,
            'email': email,
            'password': password,
            'password_confirmation': password_confirmation,
            'gender_id': gender_id,
            'registration_category_id': registrasion_category,
            'registration_sub_category_id': registrasion_sub_category,
        }

        const response = await apiService.post(`register`, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response
    } catch (error) {
        return error.response
        console.error('Error fetching data:', error);
    }
};

export const loginService = async (email, password) => {
    try {

        const body = {
            'email': email,
            'password': password
        }

        const response = await apiService.post(`login`, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        return error.response
        console.error('Error fetching data:', error);
    }
};

export const logoutService = async (accessToken) => {
    try {

        const response = await apiService.post(`logout`, {}, {
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
export const CreateNewPassword = async (email, password, password_confirmation) => {
    try {

        const body = {
            'email' : email,
            'new_password' : password,
            'new_password_confirmation' : password_confirmation,
        }
        const response = await apiService.post(`cewate-new-password`, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response
    } catch (error) {
        return error.response
        console.error('Error fetching data:', error);
    }
};

export const getProfile = async (accessToken) => {
    try {

        const response = await apiService.get(`profile`, {
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