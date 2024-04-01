import apiService from "./api_service";

export const getProfileLembaga = async (accessToken) => {
    try {

        const response = await apiService.get(`lembaga/profile-lembaga`, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            }
        });

        return response
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


export const updateProfileLembaga = async (accessToken, lembaga_id, nama_lembaga, nama_penanggung_jawab, no_telepon, email) => {
    try {
        const body = {
            'lembaga_id' : lembaga_id,
            'nama_lembaga' : nama_lembaga,
            'nama_penanggung_jawab' : nama_penanggung_jawab,
            'no_telepon' : no_telepon,
            'email' : email,
        }
        const response = await apiService.post(`lembaga/profile-lembaga/update`, body, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            }
        });

        return response
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const updateFotoProfileLembaga = async (accessToken, image) => {
    try {
        const formData = new FormData();
        formData.append('image', image);
        
        const response = await apiService.post(`lembaga/profile-lembaga/update/foto/profile`, formData, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'multipart/form-data'
            }
        });

        return response
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};