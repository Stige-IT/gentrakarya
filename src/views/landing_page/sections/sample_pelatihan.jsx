import { useEffect } from "react";
import Title from "../../../components/Title"
import { useState } from "react";
import { getPelatihanGeneralSample } from "../../../services/pelatihan_service";
import PelatihanCard from "../../../components/card/pelatihan_card";

const SamplePelatihan = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getPelatihanGeneralSample().then((response) => {
            if (response && response.status === 200) {
                setData(response.data.data)
            } else {
                setData([])
            }
        })
    }, [])
    return (
        <>
            <div className="w-full py-10 px-5 lg:px-10 ">
                <div className="flex justify-between">
                    <Title name="Info Pelatihan"></Title>
                    <a href="/pelatihan" className="text-black bg-custom-yellow px-3 py-2 rounded-md font-semibold">Lihat Semua</a>
                </div>
                <div className="w-full mt-3 h-1 rounded-full bg-black"></div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-5">
                    {data?.map((item) => (
                        <PelatihanCard
                            link={`/pelatihan/detail/${item?.id}`}
                            posisi={item.judul_pelatihan}
                            namaPerusahaan={item?.profile_lembaga?.nama_lembaga}
                            lembaga={item?.profile_lembaga?.lembaga?.name}
                            biaya={item?.biaya_pelatihan}
                            metoda={item?.metoda}
                            pelaksanaan={item?.tanggal_pelaksanaan}
                            dibuatTanggal={item?.created_at} >
                        </PelatihanCard>
                    ))}
                </div>
            </div>
        </>
    )
}
export default SamplePelatihan