import { Helmet } from "react-helmet"
import Layout from "../../../components/dashboard_component/layout"
import Header from "../../../components/dashboard_component/header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleLeft, faSave } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { getDistrict, getProvince, getRegency, getVillage } from "../../../services/location_service"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import TemplateInputV2 from "../../../components/template_input_v2"
import { useNavigate } from "react-router-dom"
import { getProfileLembaga } from "../../../services/profile_lembaga_service"
import { postMagang } from "../../../services/magang_service"
import {
    Datepicker,
    Input,
    initTE,
} from "tw-elements";

const CreateInfoMagang = () => {

    const navigate = useNavigate()
    const [accessToken, setAccessToken] = useState('')

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
    const [expiredAt, setExpiredAt] = useState('')

    const [profileLembaga, setProfileLembaga] = useState(null)

    const [jabatan, setJabatan] = useState('')
    const [jenisKelamin, setJenisKelamin] = useState('Laki-laki')
    const [gajiMinimal, setGajiMinimal] = useState(0)
    const [gajiMaksimal, setGajiMaksimal] = useState(0)
    const [rentangUsia, setRentangUsia] = useState('')
    const [status, setStatus] = useState('Menikah')
    const [noTelepon, setNoTelepon] = useState('')
    const [email, setEmail] = useState('')
    const [deskripsi, setDeskripsi] = useState('')

    const [errorProvince, setErrorProvince] = useState(false)
    const [errorRegency, setErrorRegency] = useState(false)
    const [errorDistrict, setErrorDistrict] = useState(false)
    const [errorVillage, setErrorVillage] = useState(false)
    const [errorJabatan, setErrorJabatan] = useState(false)
    const [errorRentangUsia, setErrorRentangUsia] = useState(false)
    const [errorTanggalExpire, setErrorTanggalExpire] = useState(false)

    const [loading, setLoading] = useState(false)


    const handleProvince = (e) => {
        const provinceId = e.target.value
        setProvinceId(provinceId)

        setRegencyId(0)

        setDistrict([])
        setDistrictId(0)

        setVillage([])
        setVillageId(0)

        getRegency(provinceId).then((response) => {
            if (response && response.status === 200) {
                setRegency(response.data.data)
            } else {
                setRegency([])
            }
        })

    }

    const handleRegency = (e) => {
        const regencyId = e.target.value
        setRegencyId(regencyId)

        setDistrictId(0)
        setVillage([])
        setVillageId(0)

        getDistrict(regencyId).then((response) => {
            if (response && response.status === 200) {
                setDistrict(response.data.data)
            } else {
                setDistrict([])
            }
        })

    }

    const handleDistrict = (e) => {
        const districtId = e.target.value
        setDistrictId(districtId)

        setVillageId(0)

        getVillage(districtId).then((response) => {
            if (response && response.status === 200) {
                setVillage(response.data.data)
            } else {
                setVillage([])
            }
        })


    }

    const handleVillage = (e) => {
        const villageId = e.target.value
        setVillageId(villageId)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        const errors = {
            provinceId: provinceId === 0,
            regencyId: regencyId === 0,
            districtId: districtId === 0,
            villageId: villageId === 0,
            jabatan: jabatan === '' || jabatan == null,
            rentangUsia: rentangUsia === '' || rentangUsia == null,
            tanggalExpire: expiredAt === '' || expiredAt == null,
            // noTelepon: noTelepon > 0 && (noTelepon > 12 || noTelepon < 13),
        };

        setErrorProvince(errors.provinceId);
        setErrorRegency(errors.regencyId);
        setErrorDistrict(errors.districtId);
        setErrorVillage(errors.villageId);
        setErrorJabatan(errors.jabatan);
        setErrorRentangUsia(errors.rentangUsia);
        setErrorTanggalExpire(errors.tanggalExpire);
        // setErrorNoTelepon(errors.noTelepon);

        if (!Object.values(errors).some(Boolean)) {
            postMagang(accessToken, provinceId, regencyId, districtId, villageId, map, detail, jabatan, jenisKelamin, gajiMinimal, gajiMaksimal, rentangUsia, status, noTelepon, email, deskripsi, expiredAt).then((response) => {
                console.log(response)
                setLoading(false);
                setLoading(false)
                if (response && response.status === 200) {
                    navigate('/dashboard/magang')
                } else {
                    alert('gagal menyimpan data, silahkan refreh kembali halamannya dan periksa kembali data pada form nya.!')
                }
            })
        } else {
            setLoading(false);
        }
    }

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token')
        setAccessToken(accessToken)
        if (accessToken === null || accessToken === '') {
            navigate('/login')
        } else {
            getProfileLembaga(accessToken).then((response) => {
                if (response && response.status === 200) {
                    setProfileLembaga(response.data.data)
                    setEmail(response.data?.data?.email ?? '')
                    setNoTelepon(response.data?.data?.no_telepon ?? '')
                } else {
                    setProfileLembaga(null)
                }
            })

            getProvince().then((response) => {
                if (response && response.status === 200) {
                    setProvince(response.data.data)
                } else {
                    setProvince([])
                    setProvinceId(0)
                }
            })

            initTE({ Datepicker, Input });
        }
    }, [navigate])
    return (
        <>
            <Helmet>
                <title>Tambah Info Magang</title>
            </Helmet>
            <Layout>
                <form action="" onSubmit={handleSubmit}>
                    <Header>
                        <a href="/dashboard/magang" className="flex items-center space-x-3">
                            <FontAwesomeIcon icon={faChevronCircleLeft}></FontAwesomeIcon>
                            <p className="text-sm hidden md:block">Kembali</p>
                        </a>
                        <p className="text-sm md:text-xl">Tambah Informasi Magang</p>
                        <button type="submit" className="flex items-center space-x-3 px-3 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md">
                            {loading === true ?
                                <div className="w-5 aspect-square bg-white animate-spin"></div> :
                                <FontAwesomeIcon icon={faSave}></FontAwesomeIcon>
                            }
                            <p className="hidden md:block">Simpan Data</p>
                        </button>
                    </Header>

                    <div className="w-full px-5 md:px-10 py-5 flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0">
                        <div className="w-full md:w-[60%] flex flex-col items-end space-y-3">
                            <TemplateInputV2 typeInput="text" name="Nama Perusahaan" value={profileLembaga?.nama_lembaga} disabled={true}></TemplateInputV2>
                            <TemplateInputV2 typeInput="text" name="Lembaga" value={profileLembaga?.lembaga?.name} disabled={true}></TemplateInputV2>
                            <div className="w-full">
                                {errorJabatan === true ? <p className="text-red-500 text-end">posisi / jabatan harus di isi..!</p> : ''}
                                <TemplateInputV2 typeInput="text" name="Posisi / Jabatan" value={jabatan} onChange={(e) => setJabatan(e.target.value)}></TemplateInputV2>
                            </div>

                            <div className="w-full flex flex-col md:flex-row items-center justify-end md:space-x-3">
                                <label class="font-semibold" className="w-full font-semibold md:text-end">Jenis Kelamin Yang dibutuhkan</label>
                                <select value={jenisKelamin} onChange={(e) => setJenisKelamin(e.target.value)} className="outline-none border-2 px-3 py-2 rounded-md focus:border-yellow-400 w-full text-sm">
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                    <option value="Laki-laki dan Perempuan">Keduanya</option>
                                </select>
                            </div>
                            <TemplateInputV2 value={gajiMinimal} onChange={(e) => setGajiMinimal(e.target.value)} typeInput="number" name="Gaji Minimal"></TemplateInputV2>
                            <TemplateInputV2 value={gajiMaksimal} onChange={(e) => setGajiMaksimal(e.target.value)} typeInput="number" name="Gaji Maksimal"></TemplateInputV2>
                            <div className="w-full">
                                {errorRentangUsia === true ? <p className="text-red-500 text-end">Rentang usia harus di isi..!</p> : ''}
                                <TemplateInputV2 value={rentangUsia} onChange={(e) => setRentangUsia(e.target.value)} typeInput="text" name="Rentang Usia Yang dibutuhkan"></TemplateInputV2>
                            </div>
                            <div className="flex flex-col md:flex-row md:space-x-3 w-full justify-end">
                                <label className="w-full font-semibold md:text-end" >Status Yang dibutuhkan</label>
                                <select value={status} onChange={(e) => setStatus(e.target.value)} className="outline-none border-2 px-3 py-2 rounded-md focus:border-yellow-400 w-full text-sm">
                                    <option value="Menikah">Menikah</option>
                                    <option value="Belum Menikah">Belum Menikah</option>
                                    <option value="Menikah dan Belum Menikah">Keduanya</option>
                                </select>
                            </div>
                            <div className="w-full">
                                <TemplateInputV2 value={noTelepon} onChange={(e) => setNoTelepon(e.target.value)} typeInput="text" name="No Telepon / Wa"></TemplateInputV2>
                            </div>
                            <TemplateInputV2 value={email} onChange={(e) => setEmail(e.target.value)} typeInput="email" name="Email"></TemplateInputV2>
                            <div className="w-full">
                                {errorTanggalExpire === true ? <p className="text-red-500 text-end">Tanggal kedaluarsa / expire harus di isi..!</p> : ''}
                                <TemplateInputV2 value={expiredAt} onChange={(e) => setExpiredAt(e.target.value)} typeInput="date" name="Tanggal Kedaluarsa / Expire"></TemplateInputV2>
                            </div>
                        </div>

                        <div className="w-full md:w-[40%] space-y-3">
                            <div>
                                {errorProvince === true ? <p className="text-red-500">silahkan pilih Provinsi..!</p> : ''}
                                <select value={provinceId} onChange={handleProvince} className="px-3 py-2 outline-none border-2 focus:border-2 focus:border-custom-yellow rounded-md text-sm w-full">
                                    <option value="0">Provinsi</option>
                                    {province?.map((item) => (
                                        <option value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                {errorRegency === true ? <p className="text-red-500">silahkan pilih Kabupaten Kota..!</p> : ''}
                                <select value={regencyId} onChange={handleRegency} className="px-3 py-2 outline-none border-2 focus:border-2 focus:border-custom-yellow rounded-md text-sm w-full">
                                    <option value="0">Kabupaten / Kota</option>
                                    {regency?.map((item) => (
                                        <option value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                {errorDistrict === true ? <p className="text-red-500">silahkan pilih Kecamatan..!</p> : ''}
                                <select value={districtId} onChange={handleDistrict} className="px-3 py-2 outline-none border-2 focus:border-2 focus:border-custom-yellow rounded-md text-sm w-full">
                                    <option value="0">Kecamatan</option>
                                    {district?.map((item) => (
                                        <option value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                {errorVillage === true ? <p className="text-red-500">silahkan pilih Desa / Kelurahan..!</p> : ''}
                                <select value={villageId} onChange={handleVillage} className="px-3 py-2 outline-none border-2 focus:border-2 focus:border-custom-yellow rounded-md text-sm w-full">
                                    <option value="0">Desa / Kelurahan</option>
                                    {village?.map((item) => (
                                        <option value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label class="font-semibold">Link Google Map</label>
                                <input type="text" value={map} onChange={(e) => setMap(e.target.value)} className="px-3 py-2 outline-none border-2 focus:border-2 focus:border-custom-yellow rounded-md text-sm w-full" />
                            </div>
                            <div>
                                <label class="font-semibold">Detail Alamat</label>
                                <textarea rows={10} type="text" value={detail} onChange={(e) => setDetail(e.target.value)} className="px-3 py-2 outline-none border-2 focus:border-2 focus:border-custom-yellow rounded-md text-sm w-full" />
                            </div>
                        </div>
                    </div>

                    <div className="px-5 md:px-10 mb-10">
                        <div className="w-full bg-gray-300 py-2 px-3 mb-3">
                            <p className="font-semibold">Deskripsi Magang</p>
                        </div>
                        <ReactQuill value={deskripsi} onChange={(value) => {
                            setDeskripsi(value)
                            console.log(deskripsi);
                        }}></ReactQuill>
                    </div>

                </form >
            </Layout >


            {/* Moadl Add Galery */}
            <form onSubmit={handleSubmit}>
                <div
                    data-te-modal-init
                    class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
                    id="exampleModalCenter"
                    tabindex="-1"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-modal="true"
                    role="dialog">
                    <div
                        data-te-modal-dialog-ref
                        class="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
                        <div
                            class="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                            <div
                                class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                                {/* <!--Modal title--> */}
                                <h5
                                    class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                                    id="exampleModalCenterTitle">
                                    Tambah Image Galery
                                </h5>
                                {/* <!--Close button--> */}
                                <button
                                    type="button"
                                    class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                    data-te-modal-dismiss
                                    aria-label="Close">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="h-6 w-6">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* <!--Modal body--> */}
                            <div class="relative p-4">
                                <div className="w-full">
                                    <label htmlFor=""></label>
                                    <input type="file" className="w-full" multiple accept="image/*" onChange={handleImageChange} />

                                </div>
                            </div>

                            {/* <!--Modal footer--> */}
                            <div
                                class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                                <button
                                    type="button"
                                    class="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                                    data-te-modal-dismiss
                                    data-te-ripple-init
                                    data-te-ripple-color="light">
                                    Kembali
                                </button>
                                <button
                                    type="submit"
                                    class="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    data-te-ripple-init
                                    data-te-ripple-color="light">
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default CreateInfoMagang