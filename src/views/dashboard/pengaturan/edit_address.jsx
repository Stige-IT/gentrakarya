import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createAddress, getAddress } from "../../../services/address_service"
import { getDistrict, getProvince, getRegency, getVillage } from "../../../services/location_service"
import { Button, Modal } from "flowbite-react"

const EditAddress = () => {
    const navigate = useNavigate()

    const [accessToken, setAccessToken] = useState('')

    const [profile, setProfile] = useState(null)
    const [address, setAddress] = useState(null)

    const [province, setProvince] = useState([])
    const [provinceId, setProvinceId] = useState(0)

    const [regency, setRegency] = useState([])
    const [regencyId, setRegencyId] = useState(0)

    const [district, setDistrict] = useState([])
    const [districtId, setDistrictId] = useState(0)

    const [village, setVillage] = useState([])
    const [villageId, setVillageId] = useState(0)

    const [map, setMap] = useState('')
    const [detail, setDetail] = useState('')


    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false)

    const handleProvince = (e) => {
        const provinceId = e.target.value
        setProvinceId(provinceId)

        getRegency(provinceId).then((response) => {
            if (response && response.status === 200) {
                setRegency(response.data.data)
            } else {
                setRegency([])
            }
            setRegencyId(0)

            setDistrict([])
            setDistrictId(0)

            setVillage([])
            setVillageId(0)


        })
    }

    const handleRegency = (e) => {
        const regencyId = e.target.value
        setRegencyId(regencyId)

        getDistrict(regencyId).then((response) => {
            if (response && response.status === 200) {
                setDistrict(response.data.data)
            } else {
                setDistrict([])
            }
            setDistrictId(0)

            setVillage([])
            setVillageId(0)
        })
    }

    const handleDistrict = (e) => {
        const districtId = e.target.value
        setDistrictId(districtId)

        getVillage(districtId).then((response) => {
            if (response && response.status === 200) {
                setVillage(response.data.data)
            } else {
                setVillage([])
            }
            setVillageId(0)
        })
    }

    const handleVillage = (e) => {
        const vilageId = e.target.value
        setVillageId(vilageId)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        createAddress(accessToken, provinceId, regencyId, districtId, villageId, map, detail).then((response) => {
            // if (response && response.status == 200) {
                window.location.reload();
                setLoading(false)
                setOpenModal(false)
            // }
        })
    }

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token')
        setAccessToken(accessToken)

        if (accessToken === null || accessToken === '') {
            navigate('/login')
        } else {
            getAddress(accessToken).then((response) => {
                if (response && response.status === 200) {
                    setAddress(response.data.data)
                    setProvinceId(response.data.data?.province?.id ?? 0)
                    setRegencyId(response.data.data?.regency?.id ?? 0)
                    setDistrictId(response.data.data?.district?.id ?? 0)
                    setVillageId(response.data.data?.village?.id ?? 0)
                    setMap(response.data.data?.map ?? '')
                    setDetail(response.data.data?.detail ?? '')

                    getRegency(response.data.data?.province?.id).then((response) => {
                        if (response && response.status === 200) {
                            setRegency(response.data.data)
                        } else {
                            setRegency([])
                        }
                    })

                    getDistrict(response.data.data?.regency?.id).then((response) => {
                        if (response && response.status === 200) {
                            setDistrict(response.data.data)
                        } else {
                            setDistrict([])
                        }
                    })

                    getVillage(response.data.data?.district?.id).then((response) => {
                        if (response && response.status === 200) {
                            setVillage(response.data.data)
                        } else {
                            setVillage([])
                        }
                    })

                } else {
                    setAddress(null)
                }
            });

            getProvince().then((response) => {
                if (response && response.status === 200) {
                    setProvince(response.data.data)
                } else {
                    setProvince([])
                }
                setProvinceId(0)
            })
        }
    }, [])
    return (
        <>
            <Button onClick={() => setOpenModal(true)} className="px-3 bg-custom-yellow hover:bg-yellow-400 transition-all text-black rounded-md font-semibold">Ubah Alamat</Button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Edit Profile Lembaga</Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body >
                        <div className="space-y-3 overflow-auto">
                            <div>
                                <label htmlFor="" className="font-semibold">Provinsi</label>
                                <select value={provinceId} onChange={handleProvince} className="w-full py-2 focus:border-yellow-400 border-2 rounded-md outline-none">
                                    <option value="0" >Pilih Provinsi</option>
                                    {province?.map((item) => (
                                        <option value={item?.id}> {item?.name} </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="" className="font-semibold">Kabupaten</label>
                                <select value={regencyId} onChange={handleRegency} className="w-full py-2 focus:border-yellow-400 border-2 rounded-md outline-none">
                                    <option value="0" >Pilih Kabupaten / Kota</option>
                                    {regency?.map((item) => (
                                        <option value={item?.id}> {item?.name} </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="" className="font-semibold">Kecamatan</label>
                                <select value={districtId} onChange={handleDistrict} className="w-full py-2 focus:border-yellow-400 border-2 rounded-md outline-none text-black">
                                    <option value="0" >Pilih Kecamatan</option>
                                    {district?.map((item) => (
                                        <option value={item?.id} >{item?.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="" className="font-semibold">Kelurahan</label>
                                <select value={villageId} onChange={handleVillage} className="w-full py-2 focus:border-yellow-400 border-2 rounded-md outline-none">
                                    <option value="0" > Pilih Desa / Kelurahan </option>
                                    {village?.map((item) => (
                                        <option value={item?.id}> {item?.name} </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="">Link Google Map (Opsional)</label>
                                <input type="text" value={map} onChange={(e) => setMap(e.target.value)} className="w-full py-2 focus:border-yellow-400 border-2 rounded-md outline-none" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="">Detail Alamat</label>
                                <textarea name="" id="" cols="10" rows="5" onChange={(e) => setDetail(e.target.value)} className="w-full py-2 px-3 focus:border-yellow-400 border-2 rounded-md outline-none">{detail}</textarea>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="bg-white ">
                        <div class="w-full flex items-center justify-end space-x-3 font-medium text-white pb-3 px-5 py-5 bg-white">
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
                    </Modal.Footer>
                </form >
            </Modal>

        </>
    )
}

export default EditAddress