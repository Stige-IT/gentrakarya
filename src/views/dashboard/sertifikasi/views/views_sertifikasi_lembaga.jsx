import { Helmet } from "react-helmet"
import Layout from "../../../../components/dashboard_component/layout"
import Header from "../../../../components/dashboard_component/header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import CardSertifikasi from "../../../../components/card_sertifikasi"
import { getSertifikasi } from "../../../../services/sertifikasi_service"

const ViewSertifikasiLembaga = () => {

    const [sertifikasi, setSertifikasi] = useState([])
    const [totalSertifikasi, setTotalSertifikasi] = useState(0)

    useEffect(() => {
        const accessToken = `Bearer ${localStorage.getItem('access_token')}`
        getSertifikasi(accessToken).then((response) => {
            console.log(response.data.data);
            if (response && response.status === 200) {
                setSertifikasi(response.data.data)
                setTotalSertifikasi(response.data.meta.total)
            } else {
                setSertifikasi([])
                setTotalSertifikasi(0)
            }
        })
    }, [])
    return (
        <>
            <Helmet>
                <title>Sertifikasi</title>
            </Helmet>
            <Layout>
                <Header>
                    <p>
                        <span>Daftar Informasi Sertifikasi</span>
                        <span className="font-semibold text-base ml-3">({totalSertifikasi} Sertifikasi)</span>
                    </p>
                    <a href="/dashboard/sertifikasi/add" className="flex items-center space-x-3 bg-blue-500 hover:bg-blue-600 transition-colors rounded-md px-3 py-2 text-white">
                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        <p className="hidden md:blok">Tambah Info Sertifikasi</p>
                    </a>
                </Header>
                <div className="w-full px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-5">
                    {sertifikasi?.map((item) => (
                    <CardSertifikasi
                        link={`/dashboard/sertifikasi/detail/${item?.id}`}
                        tanggalPelaksanaan={item?.tanggal_pelaksanaan}
                        posisi={item?.judul_sertifikasi}
                        namaPerusahaan={item?.profile_lembaga?.nama_lembaga}
                        lembaga={item?.profile_lembaga?.lembaga?.name}
                        biaya={`Rp. ${item?.biaya_sertifikasi.toLocaleString()}`}
                        metoda={item?.metoda}
                        dibuatTanggal={item?.created_at}
                        berakhirTanggal="20 April 2024">
                    </CardSertifikasi>
                    ))}

                </div>
            </Layout>
        </>
    )
}

export default ViewSertifikasiLembaga