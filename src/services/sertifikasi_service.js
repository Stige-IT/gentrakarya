import apiService from "./api_service";

export const getSertifikasiGeneral = async (province_id, regency_id, district_id, village_id) => {
    try {
        const response = await apiService.get(`sertifikasi?province_id=${province_id === 0 ? null : province_id}&regency_id=${regency_id === 0 ? null : regency_id}&district_id=${district_id === 0 ? null : district_id}&village_id=${village_id === 0 ? null : village_id}`, {
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

export const searchSertifikasiGeneral = async (keyword) => {
    try {
        const response = await apiService.get(`sertifikasi/search?keyword=${keyword}`, {
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

export const getSertifikasiGeneralSample = async () => {
    try {
        const response = await apiService.get(`sertifikasi/sample`, {
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

export const getSertifikasi = async (accessToken) => {
    try {
        const response = await apiService.get(`lembaga/sertifikasi`, {
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

export const showSertifikasi = async (magangId) => {
    try {
        const response = await apiService.get(`sertifikasi/show/${encodeURIComponent(magangId)}`, {
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


export const postSertifikasi = async (
    accessToken,
    province_id,
    regency_id,
    district_id,
    village_id,
    map,
    detail,

    tanggalPelaksaan,
    judulsertifikasi,
    biayaSertifikasi,
    metoda,
    no_telepon,
    email,
    deskripsi,
    ) => {
    try {

        const body = {
            'province_id': province_id,
            'regency_id': regency_id,
            'district_id': district_id,
            'village_id': village_id,
            'map': map,
            'detail': detail,

            'tanggal_pelaksanaan' : tanggalPelaksaan,
            'judul_sertifikasi' : judulsertifikasi,
            'biaya_sertifikasi' : biayaSertifikasi,
            'metoda' : metoda,
            'no_telepon': no_telepon,
            'email': email,
            'deskripsi': deskripsi,
        }

        const response = await apiService.post(`lembaga/sertifikasi/create`, body, {
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