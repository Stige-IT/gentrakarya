import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getWorkshop } from "../../../../services/workshop_service";
import WorkshopCard from "../../../../components/card/workshop_card";
import WorkshopLoadingCard from "../../../../components/card/workshop_loading_card";
import Layout from "../../../../components/layout";
import Header from "../../../../components/header";

const ViewWorkshopLembaga = () => {
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    getWorkshop(accessToken).then((response) => {
      // console.log(response.data.data);
      if (response && response.status === 200) {
        setData(response.data.data);
        setTotalData(response.data.meta.total);
      } else {
        setData([]);
        setTotalData(0);
      }
    });
  }, []);
  return (
    <>
      <Helmet>
        <title>Workshop</title>
      </Helmet>
      <Layout>
        <Header>
          <p>
            Daftar Informasi Workshop{" "}
            <span className="text-xl">({totalData})</span>
          </p>
          <a
            href="/dashboard/workshop/add"
            className="flex items-center space-x-3 bg-blue-500 hover:bg-blue-600 transition-colors rounded-md px-3 py-2 text-white"
          >
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            <p className="hidden md:block">Tambah Info Workshop</p>
            <p className="md:hidden">Tambah Data</p>
          </a>
        </Header>
        <div className="w-full grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-3 px-3 md:px-5 lg:px-10">
          {loading === true ? (
            <>
              {Array.from({ length: 3 }, (_, index) => (
                <WorkshopLoadingCard></WorkshopLoadingCard>
              ))}
            </>
          ) : (
            <>
              {data?.map((item) => (
                <WorkshopCard
                  link={`/dashboard/workshop/detail/${item?.id}`}
                  posisi={item.judul_workshop}
                  namaPerusahaan={item?.profile_lembaga?.nama_lembaga}
                  lembaga={item?.profile_lembaga?.lembaga?.name}
                  biaya={item?.biaya_workshop}
                  metoda={item?.metoda}
                  pelaksanaan={item?.tanggal_pelaksanaan}
                  dibuatTanggal={item?.created_at}
                />
              ))}
            </>
          )}
        </div>
      </Layout>
    </>
  );
};

export default ViewWorkshopLembaga;
