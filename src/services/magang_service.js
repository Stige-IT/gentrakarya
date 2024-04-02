import apiService from "./api_service";

export const getMagangGeneral = async (province_id, regency_id, district_id, village_id, page) => {
    try {
        const response = await apiService.get(`magang?province_id=${province_id === 0 ? null : province_id}&regency_id=${regency_id === 0 ? null : regency_id}&district_id=${district_id === 0 ? null : district_id}&village_id=${village_id === 0 ? null : village_id}&page=${page}`, {
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

export const getMagangGeneralSample = async () => {
    try {
        const response = await apiService.get(`magang/sample`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response
    } catch (error) {
        return error.response
    }
};

export const searchMagangGeneral = async (keyword) => {
    try {
        const response = await apiService.get(`magang/search?keyword=${keyword}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response
    } catch (error) {
        return error.response
    }
};



export const showMagangGeneral = async (magangId) => {
    try {
        const response = await apiService.get(`magang/show/${encodeURIComponent(magangId)}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response
    } catch (error) {
        return error.response
    }
};

export const getMagang = async (accessToken, page) => {
    try {
        const response = await apiService.get(`lembaga/magang?page=${page}`, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            }
        });

        return response
    } catch (error) {
        return error.respons
    }
};
export const showMagang = async (accessToken, magangId) => {
    try {
        const response = await apiService.get(`lembaga/magang/show/${encodeURIComponent(magangId)}`, {
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


export const postMagang = async (
    accessToken,
    province_id,
    regency_id,
    district_id,
    village_id,
    map,
    detail,
    jabatan,
    jenis_kelamin,
    minimal_gaji,
    maksimal_gaji,
    rentang_usia,
    status,
    no_telepon,
    email,
    deskripsi,
    expiredAt) => {
    try {

        if (minimal_gaji < 0) {
            minimal_gaji = 0;
        }

        const body = {
            'province_id': province_id,
            'regency_id': regency_id,
            'district_id': district_id,
            'village_id': village_id,
            'map': map,
            'detail': detail,

            'jabatan': jabatan,
            'jenis_kelamin': jenis_kelamin,
            'minimal_gaji': minimal_gaji,
            'maksimal_gaji': maksimal_gaji,
            'rentang_usia': rentang_usia,
            'status': status,
            'no_telepon': no_telepon,
            'email': email,
            'deskripsi': deskripsi,
            'expired_at': expiredAt
        }

        const response = await apiService.post(`lembaga/magang/create`, body, {
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