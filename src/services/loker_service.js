import apiService from "./api_service"

export const getSampleLoker = async () => {
    try {
        const response = apiService.get('loker/sample', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    } catch (error) {
        // alert(error.response.status)
        return error.response
        console.error('Error fetching data:', error);
    }
}

export const getGeneralLoker = async (province_id, regency_id, district_id, village_id, page) => {
    try {
        const response = await apiService.get(`loker?province_id=${province_id === 0 ? null : province_id}&regency_id=${regency_id === 0 ? null : regency_id}&district_id=${district_id === 0 ? null : district_id}&village_id=${village_id === 0 ? null : village_id}&page=${page}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    } catch (error) {
        return error.response
    }
}

export const searchLokerGeneral = async (keyword) => {
    try {
        const response = await apiService.get(`loker/search?keyword=${keyword}`, {
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

export const getLoker = async (accessToken) => {
    try {
        const response = apiService.get('lembaga/loker', {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            }
        })
        return response
    } catch (error) {
        return error.response
        console.error('Error fetching data:', error);
    }
}

export const showLoker = async (lokerId) => {
    try {
        const response = apiService.get(`loker/show/${encodeURIComponent(lokerId)}`, {
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

export const addressLoker = async (accessToken, lokerId) => {
    try {
        const response = apiService.get(`loker/${encodeURIComponent(lokerId)}/address`, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            }
        })
        return response
    } catch (error) {
        return error.response
        console.error('Error fetching data:', error);
    }
}

export const PersyaratanLoker = async (accessToken, lokerId) => {
    try {
        const response = apiService.get(`loker/${encodeURIComponent(lokerId)}/persyaratan`, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            }
        })
        return response
    } catch (error) {
        return error.response
        console.error('Error fetching data:', error);
    }
}

export const deletLoker = async (accessToken, lokerId) => {
    try {
        const response = apiService.post(`lembaga/loker/delete/${encodeURIComponent(lokerId)}`, {}, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            }
        })
        return response
    } catch (error) {
        return error.response
        alert('Hapus data gagal..!')
        // console.error('Error fetching data:', error);
    }
}

export const createLoker = async (
    accessToken,
    jenis_pekerjaan,
    posisi,
    gaji_minimal,
    gaji_maksimal,
    kuota_lowongan,
    kontak_email,
    tanggal_expire,
    kecamatan_penempatan,
    detail,
    district_id,
    village_id,
    detail_address,

    jenis_kelamin,
    minimal_pendidikan,
    rentang_usia,
    status_pelamar,
    detail_persyaratan,
) => {
    try {

        const body = {
            "jenis_pekerjaan": jenis_pekerjaan,
            "posisi": posisi,
            "gaji_minimal": gaji_minimal,
            "gaji_maksimal": gaji_maksimal,
            "kuota_lowongan": kuota_lowongan,
            "kontak_email": kontak_email,
            "tanggal_expire": tanggal_expire,
            "kecamatan_penempatan": kecamatan_penempatan,
            "detail": detail,
            "district_id": district_id,
            "village_id": village_id,
            "detail_address": detail_address,

            "jenis_kelamin": jenis_kelamin,
            "minimal_pendidikan": minimal_pendidikan,
            "rentang_usia": rentang_usia,
            "status_pelamar": status_pelamar,
            "detail_persyaratan": detail_persyaratan,
        }
        const response = apiService.post(`loker/create`, body, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            }
        })
        return response
    } catch (error) {
        alert('Tambah data lowongan pekerjaan gagal..!')
        return error.response
        // console.error('Error fetching data:', error);
    }
}


export const postLoker = async (
    // images,
    accessToken,
    jenis_pekerjaan,
    posisi,
    jenis_kelamin,
    rentang_usia,
    status_perkawinan,
    jenjang_pendidikan_id,
    gaji_minimal,
    gaji_maksimal,
    kuota_lowongan,
    tanggal_expire,
    wilayah_penempatan,
    deskripsi,
    province_id,
    regency_id,
    district_id,
    village_id,
    map,
    detail,
    no_telepon,
    email
) => {
    try {

        if (gaji_minimal < 0) {
            gaji_minimal = 0;
        }

        const body = {
            // 'images': images,
            'jenis_pekerjaan': jenis_pekerjaan,
            'posisi' : posisi,
            'jenis_kelamin': jenis_kelamin,
            'rentang_usia': rentang_usia,
            'status_perkawinan': status_perkawinan,
            'jenjang_pendidikan_id': jenjang_pendidikan_id,
            'gaji_minimal': gaji_minimal,
            'gaji_maksimal': gaji_maksimal,
            'kuota_lowongan': kuota_lowongan,
            'tanggal_expire': tanggal_expire,
            'wilayah_penempatan': wilayah_penempatan,
            'deskripsi': deskripsi,
            'province_id': province_id,
            'regency_id': regency_id,
            'district_id': district_id,
            'village_id': village_id,
            'map': map,
            'detail': detail,
            'no_telepon': no_telepon,
            'email': email
        }

        const response = await apiService.post(`lembaga/loker/create`, body, {
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