import { Helmet } from "react-helmet"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleLeft, faSave } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { getDistrict, getProvince, getRegency, getVillage } from "../../../services/location_service"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import TemplateInputV2 from "../../../components/template_input_v2"
import { useNavigate } from "react-router-dom"
import { getProfileLembaga } from "../../../services/profile_lembaga_service"
import { postWorkshop } from "../../../services/workshop_service"
import Layout from "../../../components/layout"
import Header from "../../../components/header"

const CreateInfoWorkshop = () => {

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

    const [profileLembaga, setProfileLembaga] = useState(null)

    const [tanggalPelaksanaan, setTanggalPelaksanaan] = useState('')
    const [judulWorkshop, setJudulWorkshop] = useState('')
    const [biayaWorkshop, setBiayaWorkshop] = useState(0)
    const [metoda, setMetoda] = useState('Offline')
    const [noTelepon, setNoTelepon] = useState('')
    const [email, setEmail] = useState('')
    const [deskripsi, setDeskripsi] = useState('')

    const [errorProvince, setErrorProvince] = useState(false)
    const [errorRegency, setErrorRegency] = useState(false)
    const [errorDistrict, setErrorDistrict] = useState(false)
    const [errorVillage, setErrorVillage] = useState(false)
    const [errorTanggalPelaksanaan, setErrorTanggalPelaksanaan] = useState(false)
    const [errorJudulWorkshop, setErrorJudulWorkshop] = useState(false)

    const [loading, setLoading] = useState(false)

    const fetchDataProfileLembaga = async (accessToken) => {
        try {
          const response = await getProfileLembaga(accessToken);
          setProfileLembaga(response.data.data);
          setEmail(response.data?.data?.email ?? "");
          setNoTelepon(response.data?.data?.no_telepon ?? "");
    
          setProvinceId(response.data?.data?.address?.province?.id ?? 0);
          setRegencyId(response.data?.data?.address?.regency?.id ?? 0);
          setDistrictId(response.data?.data?.address?.district?.id ?? 0);
          setVillageId(response.data?.data?.address?.village?.id ?? 0);
          setMap(response.data?.data?.address?.map ?? "");
          setDetail(response.data?.data?.address?.detail ?? "");
        } catch (error) {
          setProfileLembaga(null);
        }
      };
    
      const fetchDataProvince = async () => {
        try {
          const response = await getProvince();
          setProvince(response.data.data);
        } catch (error) {
          setProvince([]);
        }
      };
    
      const fetchDataRegency = async (provinceId) => {
        try {
          const response = await getRegency(provinceId);
          setRegency(response.data.data);
        } catch (error) {
          setRegency([]);
        }
      };
    
      const fetchDataDistrict = async (regencyId) => {
        try {
          const response = await getDistrict(regencyId);
          setDistrict(response.data.data);
        } catch (error) {
          setDistrict([]);
        }
      };
    
      const fetchDataVillage = async (districtId) => {
        try {
          const response = await getVillage(districtId);
          setVillage(response.data.data);
        } catch (error) {
          setVillage([]);
        }
      };

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token')
        if (accessToken === null || accessToken === '') {
            navigate('/login')
        } else {
            fetchDataProfileLembaga(`Bearer ${accessToken}`);

            fetchDataProvince();
            fetchDataRegency(provinceId);
            fetchDataDistrict(regencyId);
            fetchDataVillage(districtId);
        }
    }, [])

    const handleProvince = (e) => {
        const provinceId = e.target.value;
        setProvinceId(provinceId);
    
        setRegencyId(0);
    
        setDistrict([]);
        setDistrictId(0);
    
        setVillage([]);
        setVillageId(0);
    
        fetchDataRegency(provinceId);
      };
    
      const handleRegency = (e) => {
        const regencyId = e.target.value;
        setRegencyId(regencyId);
    
        setDistrictId(0);
        setVillage([]);
        setVillageId(0);
    
        fetchDataDistrict(regencyId);
      };
    
      const handleDistrict = (e) => {
        const districtId = e.target.value;
        setDistrictId(districtId);
    
        setVillageId(0);
    
        fetchDataVillage(districtId);
      };
    
      const handleVillage = (e) => {
        const villageId = e.target.value;
        setVillageId(villageId);
      };

      const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        const errors = {
            provinceId: provinceId === 0,
            regencyId: regencyId === 0,
            districtId: districtId === 0,
            villageId: villageId === 0,
            tanggalPelaksanaan: tanggalPelaksanaan === '' || tanggalPelaksanaan == null,
            judulWorkshop: judulWorkshop === '' || judulWorkshop == null,
            // noTelepon: noTelepon > 0 && (noTelepon > 12 || noTelepon < 13),
        };

        setErrorProvince(errors.provinceId);
        setErrorRegency(errors.regencyId);
        setErrorDistrict(errors.districtId);
        setErrorVillage(errors.villageId);
        setErrorTanggalPelaksanaan(errors.tanggalPelaksanaan);
        setErrorJudulWorkshop(errors.judulWorkshop);

        if (!Object.values(errors).some(Boolean)) {
            postWorkshop(accessToken, provinceId, regencyId, districtId, villageId, map, detail, tanggalPelaksanaan, judulWorkshop, biayaWorkshop, metoda, noTelepon, email, deskripsi).then((response) => {
                setLoading(false);
                setLoading(false)
                if (response && response.status === 200) {
                    navigate('/dashboard/workshop')
                } else {
                    alert('gagal menyimpan data, silahkan refreh kembali halamannya dan periksa kembali data pada form nya.!')
                }
            })
        } else {
            setLoading(false);
        }
    }
    return (
        <>
            <Helmet>
                <title>Tambah Info Workshop</title>
            </Helmet>
            <Layout>
                <form action="" onSubmit={handleSubmit}>
                    <Header>
                        <a href="/dashboard/workshop" className="flex items-center space-x-3">
                            <FontAwesomeIcon icon={faChevronCircleLeft}></FontAwesomeIcon>
                            <p className="text-sm hidden md:block">Kembali</p>
                        </a>

                        <p className="text-sm md:text-xl">Tambah Informasi Workshop</p>
                        <button type="submit" className="flex items-center space-x-3 px-3 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md">
                            {loading === true ?
                                <div className="w-5 aspect-square bg-white animate-spin"></div> :
                                <FontAwesomeIcon icon={faSave}></FontAwesomeIcon>
                            }
                            <p className="hidden md:block">Simpan Data</p>
                        </button>
                    </Header>
                    <div className="w-full px-5 md:px-10 py-5 flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0">

                        {/* Left */}
                        <div className="w-full md:w-[60%] flex flex-col items-end space-y-3">
                            <TemplateInputV2 typeInput="text" name="Nama Perusahaan" value={profileLembaga?.nama_lembaga} disabled={true}></TemplateInputV2>
                            <TemplateInputV2 typeInput="text" name="Lembaga" value={profileLembaga?.lembaga?.name} disabled={true}></TemplateInputV2>
                            <div className="w-full">
                                {errorTanggalPelaksanaan === true ? <p className="text-red-500 text-end">Tanggal pelaksanaan harus di isi..!</p> : ''}
                                <TemplateInputV2 value={tanggalPelaksanaan} onChange={(e) => setTanggalPelaksanaan(e.target.value)} typeInput="datetime-local" name="Tanggal Pelaksanaan"></TemplateInputV2>
                            </div>
                            <div className="w-full">
                                {errorJudulWorkshop === true ? <p className="text-red-500 text-end">Judul workshop harus di isi..!</p> : ''}
                                <TemplateInputV2 typeInput="text" name="Judul Workshop" value={judulWorkshop} onChange={(e) => setJudulWorkshop(e.target.value)}></TemplateInputV2>
                            </div>
                            <TemplateInputV2 value={biayaWorkshop} onChange={(e) => setBiayaWorkshop(e.target.value)} typeInput="number" name="Biaya Workshop"></TemplateInputV2>
                            <div className="w-full flex flex-col md:flex-row items-center justify-end md:space-x-3">
                                <label class="font-semibold" className="w-full font-semibold md:text-end">Metoda Workshop</label>
                                <select value={metoda} onChange={(e) => setMetoda(e.target.value)} className="outline-none border-2 px-3 py-2 rounded-md focus:border-yellow-400 w-full text-sm">
                                    <option value="Online">Online</option>
                                    <option value="Offline">Offline</option>
                                    <option value="Hibrid (Online & Offline)">Hibrid (Online & Offline)</option>
                                </select>
                            </div>
                            <div className="w-full">
                                <TemplateInputV2 value={noTelepon} onChange={(e) => setNoTelepon(e.target.value)} typeInput="text" name="No Telepon / Wa"></TemplateInputV2>
                            </div>
                            <TemplateInputV2 value={email} onChange={(e) => setEmail(e.target.value)} typeInput="email" name="Email"></TemplateInputV2>
                        </div>

                        {/* Right */}
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
                                <input type="text" className="px-3 py-2 outline-none border-2 focus:border-2 focus:border-custom-yellow rounded-md text-sm w-full" />
                            </div>
                            <div>
                                <label class="font-semibold">Detail Alamat</label>
                                <textarea rows={7} type="text" value={detail} onChange={(e) => setDetail(e.target.value)} className="px-3 py-2 outline-none border-2 focus:border-2 focus:border-custom-yellow rounded-md text-sm w-full" />
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
        </>
    )
}

export default CreateInfoWorkshop