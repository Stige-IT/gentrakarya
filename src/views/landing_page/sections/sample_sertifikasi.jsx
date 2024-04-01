import { useState } from "react";
import { getSertifikasiGeneralSample } from "../../../services/sertifikasi_service";
import { useEffect } from "react";
import SertifikasiCard from "../../../components/card/sertifikasi._card";
import Title from "../../../components/Title";

const SampleSertiikasi = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getSertifikasiGeneralSample().then((response) => {
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
                    <Title name="Info Sertifikasi"></Title>
                    <a href="/sertifikasi" className="text-black bg-custom-yellow px-3 py-2 rounded-md font-semibold">Lihat Semua</a>
                </div>
                <div className="w-full mt-3 h-1 rounded-full bg-black"></div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-5">
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
                            berakhirTanggal="20 April 2024">
                        </SertifikasiCard>
                    ))}
                </div>
            </div>
        </>
    )
}
export default SampleSertiikasi