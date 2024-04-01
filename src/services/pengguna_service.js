import apiService from "./api_service"

export const getPengguna = async (accessToken) => {
    try {
        const response = apiService.get(`super-admin/pengguna`, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            }
        })
        return response
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export const searchPengguna = async (accessToken, keyword) => {
    try {
        const response = apiService.get(`super-admin/pengguna/search?keyword=${keyword}`, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            }
        })
        return response
    } catch (error) {
        return error
    }
}

export const showPengguna = async (accessToken, adminId) => {
    try {
        const response = apiService.get(`super-admin/pengguna/show/${encodeURIComponent(adminId)}`, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            }
        })
        return response
    } catch (error) {
        return error
    }
}

export const deletePengguna = async (accessToken, adminId) => {
    try {
        const response = apiService.post(`super-admin/pengguna/delete/${encodeURIComponent(adminId)}`, {}, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            }
        })
        return response
    } catch (error) {
        return error
    }
}

