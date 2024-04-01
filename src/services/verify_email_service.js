import apiService from "./api_service";

export const verifyEmail = async (email, code, type) => {
    try {
        const body = {
            'email' : email,
            'code' : code
        }
        const response = await apiService.post(`email/verify/${type}`, body, {
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

export const resendEmail = async (email, type) => {
    try {
        const body = {
            'email' : email
        }
        const response = await apiService.post(`email/resend/${type}`, body, {
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

export const sendEmail = async (email) => {
    try {
        const body = {
            'email' : email
        }
        const response = await apiService.post(`email/send`, body, {
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