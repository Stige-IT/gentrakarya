import apiService from "./api_service"

export const getProvince = async () => {
    try {
        const response = apiService.get(`province`, {
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

export const getRegency = async (provinceId) => {
    try {
        const response = apiService.get(`regency/${provinceId}`, {
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

export const getDistrict = async (regencyId) => {
    try {
        const response = apiService.get(`district/${regencyId}`, {
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

export const getVillage = async (districtId) => {
    try {
        const response = apiService.get(`village/${districtId}`, {
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