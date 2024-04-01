import apiService from "./api_service";

export const getAddress = async (accessToken) => {
    try {

        const response = await apiService.get(`address`, {
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

export const createAddress = async (accessToken, provinceId, regencyId, districtId, villageId, map, detail) => {
    try {

        const body = {
            'province_id' : provinceId,
            'regency_id' : regencyId,
            'district_id' : districtId,
            'village_id' : villageId,
            'map' : map,
            'detail' : detail
        }
        const response = await apiService.post(`address/create`, body, {
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

export const updateAddress = async (accessToken, provinceId, regencyId, districtId, villageId, map, detail) => {
    try {

        const body = {
            'province_id' : provinceId,
            'regency_id' : regencyId,
            'district_id' : districtId,
            'village_id' : villageId,
            'map' : map,
            'detail' : detail
        }
        const response = await apiService.post(`address/update`, body, {
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