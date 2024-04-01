import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import {
  getDistrict,
  getProvince,
  getRegency,
  getVillage,
} from "../../../services/location_service";
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import TemplateInputV2 from "../../../components/template_input_v2";
import { postLoker } from "../../../services/loker_service";
import { getJenjangPendidikan } from "../../../services/jenjang_pendidikan_service";
import Layout from "../../../components/layout";
import Header from "../../../components/header";
import { getProfileLembaga } from "../../../services/profile_lembaga_service";

const CreateInfoLoker = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState("");
  const [province, setProvince] = useState([]);
  const [provinceId, setProvinceId] = useState(0);

  const [regency, setRegency] = useState([]);
  const [regencyId, setRegencyId] = useState(0);

  const [district, setDistrict] = useState([]);
  const [districtId, setDistrictId] = useState(0);

  const [village, setVillage] = useState([]);
  const [villageId, setVillageId] = useState(0);

  const [map, setMap] = useState("");
  const [detail, setDetail] = useState("");

  const [profileLembaga, setProfileLembaga] = useState(null);

  const [jenisPekerjaan, setJenisPekerjaan] = useState("");
  const [posisi, setPosisi] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("Laki-laki");
  const [rentangUsia, setRentangUsia] = useState("");
  const [statusPerkawinan, setStatusPerkawinan] = useState("Menikah");

  const [jenjangPendidikan, setJenjangPendidikan] = useState([]);
  const [jenjangPendidikanId, setJenjangPendidikanId] = useState(0);

  const [gajiMinimal, setGajiMinimal] = useState(0);
  const [gajiMaksimal, setGajiMaksimal] = useState(0);

  const [kuotaLowongan, setKuotaLowongan] = useState(1);
  const [tanggalExpire, setTanggalExpire] = useState("");
  const [wilayahPenempatan, setWilayahPenempatan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const [noTelepon, setNoTelepon] = useState("");
  const [email, setEmail] = useState("");

  const [errorProvince, setErrorProvince] = useState(false);
  const [errorRegency, setErrorRegency] = useState(false);
  const [errorDistrict, setErrorDistrict] = useState(false);
  const [errorVillage, setErrorVillage] = useState(false);
  const [errorRentangUsia, setErrorRentangUsia] = useState(false);
  const [errorTanggalExpire, setErrorTanggalExpire] = useState(false);

  const [loading, setLoading] = useState(false);

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

  const fetchDataJenjangPendidikan = async (districtId) => {
    try {
      const response = await getJenjangPendidikan();
      setJenjangPendidikan(response.data.data);
    } catch (error) {
      setJenjangPendidikan([]);
    }
  };

  useEffect(() => {
    const newAccessToken = localStorage.getItem("access_token");
    if (newAccessToken === null || newAccessToken === "") {
      navigate("/login");
    } else {
      setAccessToken(`Bearer ${newAccessToken}`);

      fetchDataProfileLembaga(`Bearer${newAccessToken}`);

      fetchDataProvince();
      fetchDataRegency(provinceId);
            fetchDataDistrict(regencyId);
      fetchDataVillage(districtId);

      fetchDataJenjangPendidikan();
    }

    // eslint-disable-next-line
  }, [navigate]);

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
    const newRegencyId = e.target.value;
    setRegencyId(newRegencyId);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const errors = {
      provinceId: provinceId === 0,
      regencyId: regencyId === 0,
      districtId: districtId === 0,
      villageId: villageId === 0,
      posisi: posisi === "" || posisi == null,
      rentangUsia: rentangUsia === "" || rentangUsia == null,
      tanggalExpire: tanggalExpire === "" || tanggalExpire == null,
    };

    setErrorProvince(errors.provinceId);
    setErrorRegency(errors.regencyId);
    setErrorDistrict(errors.districtId);
    setErrorVillage(errors.villageId);
    setErrorRentangUsia(errors.rentangUsia);
    setErrorTanggalExpire(errors.tanggalExpire);

    if (!Object.values(errors).some(Boolean)) {
      try {
        await postLoker(
          accessToken,
          jenisPekerjaan,
          posisi,
          jenisKelamin,
          rentangUsia,
          statusPerkawinan,
          jenjangPendidikanId,
          gajiMinimal,
          gajiMaksimal,
          kuotaLowongan,
          tanggalExpire,
          wilayahPenempatan,
          deskripsi,
          provinceId,
          regencyId,
          districtId,
          villageId,
          map,
          detail,
          noTelepon,
          email
        );
        setLoading(false);
        navigate("/dashboard/loker");
      } catch (error) {
        setLoading(false);
        alert(
          "gagal menyimpan data, silahkan refreh kembali halamannya dan periksa kembali data pada form nya.!"
        );
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Tambah Info Loker</title>
      </Helmet>
      <Layout>
        <form action="" onSubmit={handleSubmit}>
          <Header>
            <a href="/dashboard/loker" className="flex items-center space-x-3">
              <FontAwesomeIcon icon={faChevronCircleLeft}></FontAwesomeIcon>
              <p className="text-sm hidden md:block">Kembali</p>
            </a>
            <p className="text-sm md:text-xl">Tambah Informasi Loker</p>
            <button
              type="submit"
              className="flex items-center space-x-3 px-3 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
            >
              {loading === true ? (
                <div className="w-5 aspect-square bg-white animate-spin"></div>
              ) : (
                <FontAwesomeIcon icon={faSave}></FontAwesomeIcon>
              )}
              <p className="hidden md:block">Simpan Data</p>
            </button>
          </Header>

          <div className="w-full px-5 md:px-10 py-5 flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0">
            <div className="w-full md:w-[60%] flex flex-col items-end space-y-3">
              <TemplateInputV2
                typeInput="text"
                name="Nama Perusahaan"
                value={profileLembaga?.nama_lembaga}
                disabled={true}
              />
              <TemplateInputV2
                typeInput="text"
                name="Lembaga"
                value={profileLembaga?.lembaga?.name}
                disabled={true}
              />

              <div className="w-full">
                <TemplateInputV2
                  typeInput="text"
                  name="Jenis Pekerjaan"
                  value={jenisPekerjaan}
                  onChange={(e) => setJenisPekerjaan(e.target.value)}
                />
              </div>
              <div className="w-full">
                {/* {errorJabatan === true ? (
                  <p className="text-red-500 text-end">
                    posisi / jabatan harus di isi..!
                  </p>
                ) : (
                  ""
                )} */}
                <TemplateInputV2
                  typeInput="text"
                  name="Posisi / Jabatan"
                  value={posisi}
                  onChange={(e) => setPosisi(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col md:flex-row items-center justify-end md:space-x-3">
                <label
                  class="font-semibold"
                  className="w-full font-semibold md:text-end"
                >
                  Jenis Kelamin Yang dibutuhkan
                </label>
                <select
                  value={jenisKelamin}
                  onChange={(e) => setJenisKelamin(e.target.value)}
                  className="outline-none border-2 px-3 py-2 rounded-md focus:border-yellow-400 w-full text-sm"
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                  <option value="Laki-laki dan Perempuan">Keduanya</option>
                </select>
              </div>
              <div className="w-full">
                {errorRentangUsia === true ? (
                  <p className="text-red-500 text-end">
                    Rentang usia harus di isi..!
                  </p>
                ) : (
                  ""
                )}
                <TemplateInputV2
                  value={rentangUsia}
                  onChange={(e) => setRentangUsia(e.target.value)}
                  typeInput="text"
                  name="Rentang Usia Yang dibutuhkan"
                />
              </div>
              <div className="w-full flex flex-col md:flex-row items-center justify-end md:space-x-3">
                <label
                  class="font-semibold"
                  className="w-full font-semibold md:text-end"
                >
                  Minimal Jenjang Pendidikan
                </label>
                <select
                  value={jenjangPendidikanId}
                  onChange={(e) => setJenjangPendidikanId(e.target.value)}
                  className="outline-none border-2 px-3 py-2 rounded-md focus:border-yellow-400 w-full text-sm"
                >
                  {jenjangPendidikan?.map((item) => (
                    <option value={item?.id}>{item?.name}</option>
                  ))}
                </select>
              </div>
              <TemplateInputV2
                value={gajiMinimal}
                onChange={(e) => setGajiMinimal(e.target.value)}
                typeInput="number"
                name="Gaji Minimal"
              />
              <TemplateInputV2
                value={gajiMaksimal}
                onChange={(e) => setGajiMaksimal(e.target.value)}
                typeInput="number"
                name="Gaji Maksimal"
              />

              <div className="flex flex-col md:flex-row md:space-x-3 w-full justify-end">
                <label className="w-full font-semibold md:text-end">
                  Status Yang dibutuhkan
                </label>
                <select
                  value={statusPerkawinan}
                  onChange={(e) => setStatusPerkawinan(e.target.value)}
                  className="outline-none border-2 px-3 py-2 rounded-md focus:border-yellow-400 w-full text-sm"
                >
                  <option value="Menikah">Menikah</option>
                  <option value="Belum Menikah">Belum Menikah</option>
                  <option value="Menikah dan Belum Menikah">Keduanya</option>
                </select>
              </div>
              <div className="w-full">
                {errorTanggalExpire === true ? (
                  <p className="text-red-500 text-end">
                    Tanggal kedaluarsa / expire harus di isi..!
                  </p>
                ) : (
                  ""
                )}
                <TemplateInputV2
                  value={kuotaLowongan}
                  onChange={(e) => setKuotaLowongan(e.target.value)}
                  typeInput="number"
                  name="Kuota Lowongan"
                ></TemplateInputV2>
              </div>
              <div className="w-full">
                {errorTanggalExpire === true ? (
                  <p className="text-red-500 text-end">
                    Tanggal kedaluarsa / expire harus di isi..!
                  </p>
                ) : (
                  ""
                )}
                <TemplateInputV2
                  value={tanggalExpire}
                  onChange={(e) => setTanggalExpire(e.target.value)}
                  typeInput="date"
                  name="Tanggal Kedaluarsa / Expire"
                ></TemplateInputV2>
              </div>
              <div className="w-full">
                {errorTanggalExpire === true ? (
                  <p className="text-red-500 text-end">
                    Tanggal kedaluarsa / expire harus di isi..!
                  </p>
                ) : (
                  ""
                )}
                <TemplateInputV2
                  value={wilayahPenempatan}
                  onChange={(e) => setWilayahPenempatan(e.target.value)}
                  typeInput="text"
                  name="Wilayah Penempatan"
                ></TemplateInputV2>
              </div>
              <div className="w-full">
                {/* {errorNoTelepon === true ? (
                  <p className="text-red-500 text-end">
                    No telepon harus memiliki panjang minimal 12 dan maksimal
                    13..!
                  </p>
                ) : (
                  ""
                )} */}
                <TemplateInputV2
                  value={noTelepon}
                  onChange={(e) => setNoTelepon(e.target.value)}
                  typeInput="text"
                  name="No Telepon / Wa"
                />
              </div>
              <TemplateInputV2
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                typeInput="email"
                name="Email"
              />
            </div>

            <div className="w-full md:w-[40%] space-y-3">
              <div>
                {errorProvince === true ? (
                  <p className="text-red-500">silahkan pilih Provinsi..!</p>
                ) : (
                  ""
                )}
                <select
                  value={provinceId}
                  onChange={handleProvince}
                  className="px-3 py-2 outline-none border-2 focus:border-2 focus:border-custom-yellow rounded-md text-sm w-full"
                >
                  <option value="0">Provinsi</option>
                  {province?.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>

              <div>
                {errorRegency === true ? (
                  <p className="text-red-500">
                    silahkan pilih Kabupaten Kota..!
                  </p>
                ) : (
                  ""
                )}
                <select
                  value={regencyId}
                  onChange={handleRegency}
                  className="px-3 py-2 outline-none border-2 focus:border-2 focus:border-custom-yellow rounded-md text-sm w-full"
                >
                  <option value="0">Kabupaten / Kota</option>
                  {regency?.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>

              <div>
                {errorDistrict === true ? (
                  <p className="text-red-500">silahkan pilih Kecamatan..!</p>
                ) : (
                  ""
                )}
                <select
                  value={districtId}
                  onChange={handleDistrict}
                  className="px-3 py-2 outline-none border-2 focus:border-2 focus:border-custom-yellow rounded-md text-sm w-full"
                >
                  <option value="0">Kecamatan</option>
                  {district?.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>

              <div>
                {errorVillage === true ? (
                  <p className="text-red-500">
                    silahkan pilih Desa / Kelurahan..!
                  </p>
                ) : (
                  ""
                )}
                <select
                  value={villageId}
                  onChange={handleVillage}
                  className="px-3 py-2 outline-none border-2 focus:border-2 focus:border-custom-yellow rounded-md text-sm w-full"
                >
                  <option value="0">Desa / Kelurahan</option>
                  {village?.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label class="font-semibold">Link Google Map</label>
                <input
                  type="text"
                  value={map}
                  className="px-3 py-2 outline-none border-2 focus:border-2 focus:border-custom-yellow rounded-md text-sm w-full"
                />
              </div>
              <div>
                <label class="font-semibold">Detail Alamat</label>
                <textarea
                  rows={10}
                  type="text"
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  className="px-3 py-2 outline-none border-2 focus:border-2 focus:border-custom-yellow rounded-md text-sm w-full"
                />
              </div>
            </div>
          </div>

          <div className="px-5 md:px-10 mb-10">
            <div className="w-full bg-gray-300 py-2 px-3 mb-3">
              <p className="font-semibold">Deskripsi Loker</p>
            </div>
            <ReactQuill
              value={deskripsi}
              onChange={(value) => {
                setDeskripsi(value);
                console.log(deskripsi);
              }}
            ></ReactQuill>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default CreateInfoLoker;
