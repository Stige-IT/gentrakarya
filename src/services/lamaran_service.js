import apiService from "./api_service";

export const getLamaranMasyarakat = async (accessToken, status) => {
    try {

        const response = await apiService.get(`lamaran?status=${status}`, {
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

export const getLamaranLembaga = async (accessToken, status) => {
    try {

        const response = await apiService.get(`lamaran?status=${status}`, {
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

export const postLamaran = async (
    accessToken,
    loker_id,

    nik,
    name,
    email,
    no_telepon,
    tempat_lahir,
    tanggal_lahir,
    jenis_kelamin_id,
    status_perkawinan_id,

    province_id,
    regency_id,
    district_id,
    village_id,
    map,
    detail,

    jenjang_pendidikan_id,
    data_pendidikan,
    data_pengalaman_kerja,
    data_pengalaman_pelatihan,

    pdfFile,
) => {
    try {

        
        const formData = new FormData();

        formData.append('loker_id', loker_id);

        formData.append('nik', nik);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('no_telepon', no_telepon);
        formData.append('tempat_lahir', tempat_lahir);
        formData.append('tanggal_lahir', tanggal_lahir);
        formData.append('jenis_kelamin_id', jenis_kelamin_id);
        formData.append('status_perkawinan_id', status_perkawinan_id);

        formData.append('province_id', province_id);
        formData.append('regency_id', regency_id);
        formData.append('district_id', district_id);
        formData.append('village_id', village_id);
        formData.append('map', map);
        formData.append('detail', detail);

        formData.append('jenjang_pendidikan_id', jenjang_pendidikan_id);
        formData.append('data_pendidikan', data_pendidikan);
        formData.append('data_pengalaman_kerja', data_pengalaman_kerja);
        formData.append('data_pengalaman_pelatihan', data_pengalaman_pelatihan);

        formData.append('pdfFile', pdfFile);

        const response = await apiService.post(`lamaran/create`, formData, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'multipart/form-data'
            }
        });

        return response
    } catch (error) {
        return error.response
    }
};

