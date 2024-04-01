import { useEffect } from "react"
import Title from "../../../components/Title"
import { getMagangGeneralSample } from "../../../services/magang_service"
import { useState } from "react"
import MagangCard from "../../../components/card/magang_card"

const SampleMagang = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        getMagangGeneralSample().then((response) => {
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
                    <Title name="Info Magang"></Title>
                    <a href="/magang" className="text-black bg-custom-yellow px-3 py-2 rounded-md font-semibold">Lihat Semua</a>
                </div>
                <div className="w-full mt-3 h-1 rounded-full bg-black"></div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-5">
                    {data?.map((item) => (
                        <MagangCard
                            link={`/magang/detail/${item?.id}`}
                            posisi={item.jabatan}
                            namaPerusahaan={item?.profile_lembaga?.nama_lembaga}
                            lembaga={item?.profile_lembaga?.lembaga?.name}
                            gajiMinimum={item?.gaji_minimal === 0 ? '-' : item?.gaji_minimal.toLocaleString()}
                            gajiMaksimum={item?.gaji_maksimal}
                            dibuatTanggal={item?.created_at}
                            berakhirTanggal={item?.expired_at}>
                        </MagangCard>
                    ))}
                </div>
            </div>
        </>
    )
}
export default SampleMagang