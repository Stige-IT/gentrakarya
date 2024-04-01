import { Helmet } from "react-helmet"
import Layout from "../../../../components/dashboard_component/layout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import Header from "../../../../components/dashboard_component/header"
import CardPelatihan from "../../../../components/card_pelatihan"
import { useEffect, useState } from "react"
import { getPelatihan } from "../../../../services/pelatihan_service"
import FormatDateTime from "../../../../components/format_datetime"

const ViewPelatihanLembaga = () => {
    const [pelatihan, setPelatihan] = useState([])
    const [totalPelatihan, setTotalPelatihan] = useState(0)

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token')
        getPelatihan(accessToken).then((response) => {
            // console.log(response.data.data);
            if (response && response.status === 200) {
                setPelatihan(response.data.data)
                setTotalPelatihan(response.data.meta.total)
            } else {
                setPelatihan([])
                setTotalPelatihan(0)
            }
        })
    }, [])
    return (
        <>
            <Helmet>
                <title>Pelatihan</title>
            </Helmet>
            <Layout>
                <Header>
                    <p>Daftar Informasi Pelatihan <span className="text-xl">({totalPelatihan})</span></p>
                    <a href="/dashboard/pelatihan/add" className="flex items-center space-x-3 bg-blue-500 hover:bg-blue-600 transition-colors rounded-md px-3 py-2 text-white">
                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        <p className="hidden md:block">Tambah Info Pelatihan</p>
                        <p className="md:hidden">Tambah Data</p>
                    </a>
                </Header>
                <div className="w-full px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-5">
                    {pelatihan?.map((item) => (
                        <CardPelatihan
                            link={`/dashboard/pelatihan/detail/${item?.id}`}
                            posisi={item.judul_pelatihan}
                            namaPerusahaan={item?.profile_lembaga?.nama_lembaga}
                            lembaga={item?.profile_lembaga?.lembaga?.name}
                            biaya={item?.biaya_workshop}
                            metoda={item?.metoda}
                            pelaksanaan={<FormatDateTime dateTime={item?.tanggal_pelaksanaan}></FormatDateTime>}
                            dibuatTanggal={<FormatDateTime dateTime={item?.created_at}></FormatDateTime>}>
                        </CardPelatihan>
                    ))}
                </div>

            </Layout>
        </>
    )
}

export default ViewPelatihanLembaga