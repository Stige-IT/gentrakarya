import apiService from "./api_service";

export const getWorkshopGeneral = async (province_id, regency_id, district_id, village_id, page) => {
    try {
        const response = await apiService.get(`workshop?province_id=${province_id === 0 ? null : province_id}&regency_id=${regency_id === 0 ? null : regency_id}&district_id=${district_id === 0 ? null : district_id}&village_id=${village_id === 0 ? null : village_id}&page=${page}`, {
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

export const getWorkshopGeneralSample = async () => {
    try {
        const response = await apiService.get(`workshop/sample`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response
    } catch (error) {
        return error.response
    }
};

export const searchWorkshopGeneral = async (keyword) => {
    try {
        const response = await apiService.get(`workshop/search?keyword=${keyword}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response
    } catch (error) {
        return error.response
    }
};
export const getWorkshop = async (accessToken, page) => {
    try {
        const response = await apiService.get(`lembaga/workshop?page=${page}`, {
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


export const showWorkshopGeneral = async (WorkshopId) => {
    try {
        const response = await apiService.get(`workshop/show/${encodeURIComponent(WorkshopId)}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response
    } catch (error) {
        return error.response
    }
};

export const showWorkshop = async (accessToken, WorkshopId) => {
    try {
        const response = await apiService.get(`lembaga/workshop/show/${encodeURIComponent(WorkshopId)}`, {
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


export const postWorkshop = async (
    accessToken,
    province_id,
    regency_id,
    district_id,
    village_id,
    map,
    detail,

    tanggal_pelaksanaan,
    judul_workshop,
    biaya_workshop,
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
            'judul_workshop' : judul_workshop,
            'biaya_workshop' : biaya_workshop,
            'metoda' : metoda,
            'no_telepon': no_telepon,
            'email': email,
            'deskripsi': deskripsi,
        }

        const response = await apiService.post(`lembaga/workshop/create`, body, {
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