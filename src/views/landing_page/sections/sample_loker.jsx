import { useEffect, useState } from "react";
import { getSampleLoker } from "../../../services/loker_service";
import LokerCard from "../../../components/card/loker_card";
import Title from "../../../components/Title";
import { useNavigate } from "react-router-dom";

const SampleLoker = () => {
  const navigate = useNavigate();
  const [loker, setLoker] = useState([]);
  const fetchSampleLoker = async () => {
    try {
      const response = await getSampleLoker();
      setLoker(response.data.data);
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        navigate("/network-error");
      } else {
        alert("Ini bukan Network");
      }
    }
  };

  useEffect(() => {
    fetchSampleLoker();
  }, []);
  return (
    <>
      <div className="w-full py-10 px-5 lg:px-10 ">
        <div className="flex items-center justify-between">
          <Title name="Info Lowongan Pekerjaan"></Title>
          <a
            href="/loker"
            className="text-black bg-custom-yellow px-3 py-2 rounded-md font-semibold"
          >
            Lihat Semua
          </a>
        </div>
        <div className="w-full mt-3 h-[2px] rounded-full bg-black"></div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-3">
          {loker?.map((item) => (
            <LokerCard
              link={`/loker/detail/${item?.id}`}
              posisi={item.jabatan}
              namaPerusahaan={item?.profile_lembaga?.nama_lembaga}
              lembaga={item?.profile_lembaga?.lembaga?.name}
              gajiMinimum={
                item?.gaji_minimal === 0
                  ? "-"
                  : item?.gaji_minimal.toLocaleString()
              }
              gajiMaksimum={item?.gaji_maksimal}
              kuota={item?.kuota_lowongan}
              dibuatTanggal={item?.created_at}
              berakhirTanggal={item?.expired_at}
            ></LokerCard>
          ))}
        </div>
      </div>
    </>
  );
};
export default SampleLoker;
