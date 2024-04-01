import apiService from "./api_service"

export const getAdmin = async (accessToken) => {
    try {
        const response = apiService.get(`super-admin/admin`, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            }
        })
        return response
    } catch (error) {
        return error.response
    }
}

export const searchAdmin = async (accessToken, keyword) => {
    try {
        const response = apiService.get(`super-admin/admin/search?keyword=${keyword}`, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            }
        })
        return response
    } catch (error) {
        return error.response
    }
}

export const showAdmin = async (accessToken, adminId) => {
    try {
        const response = apiService.get(`super-admin/admin/show/${encodeURIComponent(adminId)}`, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            }
        })
        return response
    } catch (error) {
        return error.response
    }
}

export const postAdmin = async (accessToken, name, email, genderId, password, passwordConfirm) => {
    try {
        const body = {
            'name': name,
            'email': email,
            'gender_id' : genderId,
            'password': password,
            'password_confirmation': passwordConfirm
        }
        const response = apiService.post(`super-admin/admin/create`, body, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            }
        })
        return response
    } catch (error) {
        return error.response
    }
}

export const deleteAdmin = async (accessToken, adminId) => {
    try {
        const response = apiService.post(`super-admin/admin/delete/${encodeURIComponent(adminId)}`, {}, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            }
        })
        return response
    } catch (error) {
        return error.response
    }
}

