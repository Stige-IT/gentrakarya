import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import {
  getDistrict,
  getProvince,
  getRegency,
  getVillage,
} from "../../../../services/location_service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import {
  getSertifikasiGeneral,
  searchSertifikasiGeneral,
} from "../../../../services/sertifikasi_service";
import SertifikasiCard from "../../../../components/card/sertifikasi._card";
import Navbar from "../../../../components/navbar";
import SpinnerDotCircle from "../../../../components/spinner/spinner_dot_circle";
import SertifikasiLoadingCard from "../../../../components/card/sertifikasi_loading_card";

const Sertifikasi = () => {
  const [province, setProvince] = useState([]);
  const [provinceId, setProvinceId] = useState(0);

  const [regency, setRegency] = useState([]);
  const [regencyId, setRegencyId] = useState(0);

  const [district, setDistrict] = useState([]);
  const [districtId, setDistrictId] = useState(0);

  const [village, setVillage] = useState([]);
  const [villageId, setVillageId] = useState(0);

  const [data, setData] = useState([]); // Data yang akan ditampilkan
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [keyword, setKeyword] = useState("");

  const fetchDataProvince = async () => {
    setProvinceId(0);
    try {
      const response = await getProvince();
      setProvince(response.data.data);
    } catch (error) {
      setProvince([]);
    }
  };
  const fetchDataRegency = async (provinceId) => {
    setRegencyId(0);
    try {
      const response = await getRegency(provinceId);
      setRegency(response.data.data);
    } catch (error) {
      setRegency([]);
    }
  };

  const fetchDataDistrict = async (regencyId) => {
    setDistrictId(0);
    try {
      const response = await getDistrict(regencyId);
      setDistrict(response.data.data);
    } catch (error) {
      setDistrict([]);
    }
  };

  const fetchDataVillage = async (districtId) => {
    setVillageId(0);
    try {
      const response = await getVillage(districtId);
      setVillage(response.data.data);
    } catch (error) {
      setVillage([]);
    }
  };

  const fetchDataSertifikasi = async (
    provinceId,
    regencyId,
    districtId,
    villageId,
    page
  ) => {
    setVillageId(0);
    try {
      const response = await getSertifikasiGeneral(
        provinceId,
        regencyId,
        districtId,
        villageId,
        page
      );
      setData(response.data.data);
      setTotalData(response.data.meta.total);
      setCurrentPage(response.data.meta.current_page);
      setLastPage(response.data.meta.last_page);
    } catch (error) {
      setData([]);
      setTotalData(0);
      setCurrentPage(1);
      setLastPage(1);
    }
    setLoading(false);
  };

  const fetchSearchDataSertifikasi = async (keyword) => {
    try {
      const response = await searchSertifikasiGeneral(keyword);
      setData(response.data.data);
      setTotalData(response.data.meta.total);
      setProvinceId(0);
      setRegencyId(0);
      setDistrictId(0);
      setVillageId(0);
    } catch (error) {
      setData([]);
      setTotalData(0);
    }
    setLoading(false)
  };

  useEffect(() => {
    setLoading(true);

    fetchDataProvince();

    fetchDataSertifikasi(
      provinceId,
      regencyId,
      districtId,
      villageId,
      currentPage
    );
    //  elsint-disable-next-line
  }, []);

  const handleProvince = (e) => {
    setLoading(true);
    const provinceId = e.target.value;
    setProvinceId(provinceId);

    fetchDataRegency(provinceId);
    fetchDataSertifikasi(
      provinceId,
      regencyId,
      districtId,
      villageId,
      currentPage
    );
  };

  const handleRegency = (e) => {
    setLoading(true);
    const regencyId = e.target.value;
    setRegencyId(regencyId);

    fetchDataDistrict(regencyId);
    fetchDataSertifikasi(
      provinceId,
      regencyId,
      districtId,
      villageId,
      currentPage
    );
  };

  const handleDistrict = (e) => {
    setLoading(true);
    const districtId = e.target.value;
    setDistrictId(districtId);

    fetchDataVillage(districtId);
    fetchDataSertifikasi(
      provinceId,
      regencyId,
      districtId,
      villageId,
      currentPage
    );
  };

  const handleVillage = (e) => {
    setLoading(true);
    const vilageId = e.target.value;
    setVillageId(vilageId);

    fetchDataSertifikasi(
      provinceId,
      regencyId,
      districtId,
      villageId,
      currentPage
    );
    setLoading(false);
  };

  const handleSearch = (e) => {
    setLoading(true)
    e.preventDefault();
    fetchSearchDataSertifikasi(keyword)
  };
  return (
    <>
      <Helmet>
        <title>Sertifikasi - Gentra Karya</title>
      </Helmet>
      <div className="h-screen w-full bg-white text-black overflow-auto scrollbar-thin scrollbar-track-rounded-full  scrollbar-thumb-rounded-full scrollbar-thumb-yellow-400">
        <Navbar></Navbar>
        <div className="sticky top-16 h-14 flex items-center justify-between px-10 text-sm border-b-2 bg-blue-300 space-x-3">
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon
              icon={faBell}
              className="h-8 aspect-square text-black"
            ></FontAwesomeIcon>
            <p className="text-base md:text-2xl font-semibold">
              Informasi Sertifikasi Gantra Karya
            </p>
          </div>

          {loading === true ? (
            <SpinnerDotCircle></SpinnerDotCircle>
          ) : (
            <div className="flex items-center space-x-2 font-semibold">
              <p className="text-2xl">{totalData}</p>
              <p className="text-base">Total Sertifikasi</p>
            </div>
          )}
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between  px-5 lg:px-10 text-sm mt-5 border-b-2 pb-3 border-black">
          {/* Search */}
          <div class="">
            <form action="" onSubmit={handleSearch}>
              <div class="relative mb-4 flex w-full flex-wrap items-stretch">
                <input
                  type="search"
                  class="relative m-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                  placeholder="Search"
                  aria-label="Search"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  aria-describedby="button-addon1"
                />

                {/* <!--Search button--> */}
                <button
                  class="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                  type="submit"
                  id="button-addon1"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="h-5 w-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-col md:flex-row items-center md:justify-evenly md:space-x-3 space-y-3 md:space-y-0">
            <div className="w-full flex items-center justify-evenly space-x-3 md:w-1/2">
              <select
                value={provinceId}
                onChange={handleProvince}
                name=""
                className="outline-none px-3 focus:border-2 focus:outline-none focus:border-custom-yellow rounded-md  w-full lg:w-40 text-sm"
              >
                <option value="0">==Provinsi==</option>
                {province?.map((item) => (
                  <option value={item?.id}> {item?.name} </option>
                ))}
              </select>
              <select
                value={regencyId}
                onChange={handleRegency}
                name=""
                className="outline-none px-3 focus:border-2 focus:outline-none focus:border-custom-yellow rounded-md w-full lg:w-40 text-sm"
              >
                <option value="0">==Kabupaten / Kota==</option>
                {regency?.map((item) => (
                  <option value={item?.id}> {item?.name} </option>
                ))}
              </select>
            </div>
            <div className="w-full flex items-center justify-evenly space-x-3 md:w-1/2">
              <select
                value={districtId}
                onChange={handleDistrict}
                name=""
                className="outline-none px-3 focus:border-2 focus:outline-none focus:border-custom-yellow rounded-md w-full lg:w-40 text-sm"
              >
                <option value="0">==Kecamatan==</option>
                {district?.map((item) => (
                  <option value={item?.id}> {item?.name} </option>
                ))}
              </select>
              <select
                value={villageId}
                onChange={handleVillage}
                name=""
                className="outline-none px-3 focus:border-2 focus:outline-none focus:border-custom-yellow rounded-md w-full lg:w-40 text-sm"
              >
                <option value="0">==Desa / Kelurahan==</option>
                {village?.map((item) => (
                  <option value={item?.id}> {item?.name} </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-3 px-3 md:px-5 lg:px-10">
          {loading === true ? (
            <>
              {Array.from({ length: 3 }, (_, index) => (
                <SertifikasiLoadingCard></SertifikasiLoadingCard>
              ))}
            </>
          ) : (
            <>
              {data?.map((item) => (
                <SertifikasiCard
                  link={`/sertifikasi/detail/${item?.id}`}
                  tanggalPelaksanaan={item?.tanggal_pelaksanaan}
                  posisi={item?.judul_sertifikasi}
                  namaPerusahaan={item?.profile_lembaga?.nama_lembaga}
                  lembaga={item?.profile_lembaga?.lembaga?.name}
                  biaya={`Rp. ${item?.biaya_sertifikasi.toLocaleString()}`}
                  metoda={item?.metoda}
                  dibuatTanggal={item?.created_at}
                  berakhirTanggal="20 April 2024"
                ></SertifikasiCard>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sertifikasi;
