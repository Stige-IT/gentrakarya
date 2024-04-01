import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAddress } from "../../../services/address_service"
import { getDistrict } from "../../../services/location_service"
import TemplateInput from "../../../components/template_input"
import { getRegistrasionSubCategory, showRegistrasionSubCategory } from "../../../services/registration_service"
import { getProfileLembaga, updateProfileLembaga } from "../../../services/profile_lembaga_service"
import { Modal, Button } from "flowbite-react"

const EditProfileLembaga = ({ onProfileUpdate }) => {
    const navigate = useNavigate()
    const [accessToken, setAccessToken] = useState('')
    const [profileLembaga, setProfileLembaga] = useState(null)
    const [registrationCategoryId] = useState('b8a657df-6478-40e3-934d-64e3291bf4f9')
    const [registrationSubCategory, setRegistrationSubCategory] = useState([])
    const [registrationSubCategoryId, setRegistrationSubCategoryId] = useState('')

    const [namaPerusahaan, setNamaPerusahaan] = useState('')
    const [namaPenanggungJawab, setNamaPenanggungJawab] = useState('')
    const [noTelepon, setNoTelepon] = useState('')
    const [email, setEmail] = useState('')

    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        updateProfileLembaga(accessToken, registrationSubCategoryId, namaPerusahaan, namaPenanggungJawab, noTelepon, email).then((response) => {
            if (response && response.status == 200) {
                showRegistrasionSubCategory(registrationSubCategoryId).then((response) => {
                    if (response && response.status === 200) {
                        localStorage.removeItem('registration_sub_category')
                        localStorage.setItem('registration_sub_category', response?.data?.name)
                    }
                    
                    window.location.reload();
                    setLoading(false)
                    onProfileUpdate(true)
                    setOpenModal(false)
                })
            } else {

            }
        })
    }

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token')
        setAccessToken(accessToken)
        if (accessToken === null) {
            navigate('/login')
        } else {
            getProfileLembaga(accessToken).then((response) => {
                if (response && response.status === 200) {
                    setProfileLembaga(response.data.data)
                    setRegistrationSubCategoryId(response.data.data?.lembaga?.id)
                    setNamaPerusahaan(response.data.data?.nama_lembaga)
                    setNamaPenanggungJawab(response.data.data?.nama_penanggung_jawab)
                    setNoTelepon(response.data.data?.no_telepon)
                    setEmail(response.data.data?.email)
                } else {
                    setProfileLembaga(null)
                }
            })

            getRegistrasionSubCategory(registrationCategoryId).then((response) => {
                if (response && response.status === 200) {
                    setRegistrationSubCategory(response.data)
                } else {
                    setRegistrationSubCategory([])
                }
            })
        }
    }, [])
    return (
        <>
            <Button onClick={() => setOpenModal(true)} className="px-3 bg-custom-yellow hover:bg-yellow-400 transition-all text-black rounded-md font-semibold">Update Profile Lembaga</Button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Edit Profile Lembaga</Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div className="space-y-3">
                            <TemplateInput name="Nama Perusahaan / Instansi" value={namaPerusahaan} onChange={(e) => setNamaPerusahaan(e.target.value)} ></TemplateInput>
                            <div>
                                <label htmlFor="" className="font-semibold">Lembaga</label>
                                <select
                                    value={registrationSubCategoryId}
                                    onChange={(e) => setRegistrationSubCategoryId(e.target.value)}
                                    className="outline-none border-2 px-3 py-2 rounded-md focus:border-yellow-400 w-full text-sm"
                                >
                                    {registrationSubCategory?.map((item) => (
                                        <option value={item.id} >{item?.name}</option>
                                    ))}
                                </select>
                            </div>
                            <TemplateInput name="Nama Penanggung Jawab" value={namaPenanggungJawab} onChange={(e) => setNamaPenanggungJawab(e.target.value)} ></TemplateInput>
                            <TemplateInput name="No Telepon" value={noTelepon} onChange={(e) => setNoTelepon(e.target.value)} ></TemplateInput>
                            <TemplateInput name="Email" value={email} onChange={(e) => setEmail(e.target.value)} ></TemplateInput>
                        </div>
                    </Modal.Body>
                    <div class="flex items-center justify-end space-x-3 font-medium text-white pb-3 px-5 py-5">
                        <button
                            onClick={() => setOpenModal(false)}
                            type="button"
                            class=" rounded-md px-3 py-2 bg-red-500 hover:bg-red-600 transition-colors w-32"
                            data-te-modal-dismiss
                            data-te-ripple-init
                            data-te-ripple-color="light">
                            Kembali
                        </button>
                        <button
                            type="submit"
                            class=" rounded-md px-3 py-2 bg-blue-500 hover:bg-blue-600 transition-colors flex items-center justify-center space-x-3 w-32"
                            data-te-ripple-init
                            data-te-ripple-color="light">
                            {loading !== true ? '' : <div className="h-5 aspect-square bg-black animate-spin"></div>}
                            <p>Simpan</p>
                        </button>
                    </div>
                </form >
            </Modal>
        </>
    )
}

export default EditProfileLembaga