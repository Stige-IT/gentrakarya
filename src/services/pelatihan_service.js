import apiService from "./api_service";

export const getPelatihanGeneral = async (province_id, regency_id, district_id, village_id) => {
    try {
        const response = await apiService.get(`pelatihan?province_id=${province_id === 0 ? null : province_id}&regency_id=${regency_id === 0 ? null : regency_id}&district_id=${district_id === 0 ? null : district_id}&village_id=${village_id === 0 ? null : village_id}`, {
            headers: {
                // Authorization: accessToken,
                'Content-Type': 'application/json'
            }
        });

        return response
    } catch (error) {
        return error.response
        console.error('Error fetching data:', error);
    }
};

export const getPelatihanGeneralSample = async () => {
    try {
        const response = await apiService.get(`pelatihan/sample`, {
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

export const searchPelatihanGeneral = async (keyword) => {
    try {
        const response = await apiService.get(`pelatihan/search?keyword=${keyword}`, {
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

export const getPelatihan = async (accessToken) => {
    try {
        const response = await apiService.get(`lembaga/pelatihan`, {
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


export const showPelatihanGeneral = async (PelatihanId) => {
    try {
        const response = await apiService.get(`pelatihan/show/${encodeURIComponent(PelatihanId)}`, {
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

export const showPelatihan = async (accessToken, PelatihanId) => {
    try {
        const response = await apiService.get(`lembaga/pelatihan/show/${encodeURIComponent(PelatihanId)}`, {
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


export const postPelatihan = async (
    accessToken,
    province_id,
    regency_id,
    district_id,
    village_id,
    map,
    detail,

    tanggal_pelaksanaan,
    judul_pelatihan,
    biaya_pelatihan,
    metoda,
    no_telepon,
    email,
    deskripsi
) => {
    try {

        const body = {
            'province_id': province_id,
            'regency_id': regency_id,
            'district_id': district_id,
            'village_id': village_id,
            'map': map,
            'detail': detail,

            'tanggal_pelaksanaan' : tanggal_pelaksanaan,
            'judul_pelatihan' : judul_pelatihan,
            'biaya_pelatihan' : biaya_pelatihan,
            'metoda' : metoda,
            'no_telepon': no_telepon,
            'email': email,
            'deskripsi': deskripsi,
        }

        const response = await apiService.post(`lembaga/pelatihan/create`, body, {
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