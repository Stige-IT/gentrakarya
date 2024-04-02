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
  getPelatihanGeneral,
  searchPelatihanGeneral,
} from "../../../../services/pelatihan_service";
import Navbar from "../../../../components/navbar";
import PelatihanCard from "../../../../components/card/pelatihan_card";
import SpinnerDotCircle from "../../../../components/spinner/spinner_dot_circle";
import PelatihanLoadingCard from "../../../../components/card/pelatihan_loading_card";
import ReactPaginate from "react-js-pagination";

const Pelatihan = () => {
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

  const handleProvince = (e) => {
    const provinceId = e.target.value;
    setProvinceId(provinceId);

    getRegency(provinceId).then((response) => {
      if (response && response.status === 200) {
        setRegency(response.data.data);
      } else {
        setRegency([]);
      }
      setRegencyId(0);

      setDistrict([]);
      setDistrictId(0);

      setVillage([]);
      setVillageId(0);

      getPelatihanGeneral(provinceId, regencyId, districtId, villageId).then(
        (response) => {
          if (response && response.status === 200) {
            setData(response.data.data);
            setTotalData(response.data.meta.total);
          } else {
            setData([]);
            setTotalData(0);
          }
        }
      );
    });
  };

  const handleRegency = (e) => {
    const regencyId = e.target.value;
    setRegencyId(regencyId);

    getDistrict(regencyId).then((response) => {
      if (response && response.status === 200) {
        setDistrict(response.data.data);
      } else {
        setDistrict([]);
      }
      setDistrictId(0);

      setVillage([]);
      setVillageId(0);

      getPelatihanGeneral(provinceId, regencyId, districtId, villageId).then(
        (response) => {
          if (response && response.status === 200) {
            setData(response.data.data);
            setTotalData(response.data.meta.total);
          } else {
            setData([]);
            setTotalData(0);
          }
        }
      );
    });
  };

  const handleDistrict = (e) => {
    const districtId = e.target.value;
    setDistrictId(districtId);

    getVillage(districtId).then((response) => {
      if (response && response.status === 200) {
        setVillage(response.data.data);
      } else {
        setVillage([]);
      }
      setVillageId(0);
    });

    getPelatihanGeneral(provinceId, regencyId, districtId, villageId).then(
      (response) => {
        if (response && response.status === 200) {
          setData(response.data.data);
          setTotalData(response.data.meta.total);
        } else {
          setData([]);
          setTotalData(0);
        }
      }
    );
  };

  const handleVillage = (e) => {
    const vilageId = e.target.value;
    setVillageId(vilageId);

    getPelatihanGeneral(provinceId, regencyId, districtId, villageId).then(
      (response) => {
        if (response && response.status === 200) {
          setData(response.data.data);
          setTotalData(response.data.meta.total);
        } else {
          setData([]);
          setTotalData(0);
        }
      }
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchPelatihanGeneral(keyword).then((response) => {
      if (response && response.status === 200) {
        setData(response.data.data);
        setTotalData(response.data.meta.total);
        setProvinceId(0);
        setRegencyId(0);
        setDistrictId(0);
        setVillageId(0);
      } else {
        setData([]);
        setTotalData(0);
      }
    });
  };

  const fetchDataPelatihan = async (provinceId, regencyId, districtId, villageId, page) => {
    try {
      const response = await   getPelatihanGeneral(provinceId, regencyId, districtId, villageId, page)
      if (response && response.status === 200) {
        setData(response.data.data);
        setTotalData(response.data.meta.total);
        setCurrentPage(response.data.meta.current_page);
        setLastPage(response.data.meta.last_page);
      } else {
        setData([]);
        setTotalData(0);
        setCurrentPage(1);
        setLastPage(1);
      }
    } catch (error) {
      setData([]);
        setTotalData(0);
        setCurrentPage(1);
        setLastPage(1);
    }
    setLoading(false)
  }
  useEffect(() => {
    setLoading(true);
    getProvince().then((response) => {
      if (response && response.status === 200) {
        setProvince(response.data.data);
      } else {
        setProvince([]);
      }
      setProvinceId(0);
    });

    fetchDataPelatihan(provinceId, regencyId, districtId, villageId, currentPage)

    // elsint-disable-next-line
  }, []);

  const handlePageChange = (currentPage) => {
    console.log(`active page is ${currentPage}`);
    // setActivePage(pageNumber);
    setCurrentPage(currentPage);
    // Place logic here to fetch data based on pageNumber

    fetchDataPelatihan(provinceId, regencyId, districtId, villageId, currentPage)
  };
  return (
    <>
      <Helmet>
        <title>Pelatihan - Gentra Karya</title>
      </Helmet>
      <div className="h-screen w-full bg-white text-black overflow-auto scrollbar-thin scrollbar-track-rounded-full  scrollbar-thumb-rounded-full scrollbar-thumb-yellow-400">
        <Navbar></Navbar>
        <div className="sticky top-16 z-10 h-14 flex items-center justify-between px-10 text-sm border-b-2 bg-blue-300 space-x-3">
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon
              icon={faBell}
              className="h-8 aspect-square text-black"
            ></FontAwesomeIcon>
            <p className="text-base md:text-2xl font-semibold">
              Informasi Pelatihan Gantra Karya
            </p>
          </div>

          {loading === true ? (
            <SpinnerDotCircle></SpinnerDotCircle>
          ) : (
            <div className="flex items-center space-x-2 font-semibold">
              <p className="text-2xl">
                <span className="md:hidden">(</span>
                <span>{totalData}</span>
                <span className="md:hidden">)</span>
              </p>
              <p className="hidden md:block text-base">Total Magang</p>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between  px-5 lg:px-10 text-sm mt-20 lg:mt-5 border-b-2 pb-3 border-black space-y-3 lg:space-y-0">
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
                <PelatihanLoadingCard></PelatihanLoadingCard>
              ))}
            </>
          ) : (
            <>
              {data?.map((item) => (
                <PelatihanCard
                  link={`/pelatihan/detail/${item?.id}`}
                  posisi={item.judul_pelatihan}
                  namaPerusahaan={item?.profile_lembaga?.nama_lembaga}
                  lembaga={item?.profile_lembaga?.lembaga?.name}
                  biaya={item?.biaya_pelatihan}
                  metoda={item?.metoda}
                  pelaksanaan={item?.tanggal_pelaksanaan}
                  dibuatTanggal={item?.created_at}
                />
              ))}
            </>
          )}
        </div>

        <div className="flex justify-center items-center mt-4 mb-10">
          <ReactPaginate
            activePage={currentPage}
            itemsCountPerPage={20} // Jumlah item per halaman
            totalItemsCount={lastPage} // Jumlah total item
            pageRangeDisplayed={5} // Jumlah halaman yang ditampilkan di sekitar halaman saat ini
            onChange={handlePageChange}
            itemClass="relative inline-block px-2 py-2 leading-5 text-gray-700 bg-white border border-gray-300 cursor-pointer hover:bg-gray-100 rounded-full"
            linkClass="text-sm"
            activeClass="bg-indigo-500 text-white"
            activeLinkClass="bg-indigo-500 text-white"
            firstPageText="Pertama"
            lastPageText="Terakhir"
            prevPageText="Sebelumnya"
            nextPageText="Selanjutnya"
            innerClass="flex"
          />
        </div>

      </div>
    </>
  );
};

export default Pelatihan;
