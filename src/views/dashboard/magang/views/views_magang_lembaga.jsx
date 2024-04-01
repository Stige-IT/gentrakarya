import { Helmet } from "react-helmet"
import Layout from "../../../../components/dashboard_component/layout"
import Header from "../../../../components/dashboard_component/header"
import CardMagang from "../../../../components/card_magang"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { getMagang } from "../../../../services/magang_service"

const ViewMagangLembaga = () => {

    const [magang, setMagang] = useState([])
    const [totalMagang, setTotalMagang] = useState(0)

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token')
        getMagang(accessToken).then((response) => {
            if (response && response.status === 200) {
                setMagang(response.data.data)
                setTotalMagang(response.data.meta.total)
            } else {
                setMagang([])
                setTotalMagang(0)
            }
        })
    }, [])
    return (
        <>
            <Helmet>
                <title>Magang</title>
            </Helmet>
            <Layout>
                <Header>
                    <p>Daftar Informasi Magang</p>
                    <a href="/dashboard/magang/add" className="flex items-center space-x-3 bg-blue-500 hover:bg-blue-600 transition-colors rounded-md px-3 py-2 text-white">
                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        <p className="hidden md:block">Tambah Info Magang</p>
                        <p className="md:hidden">Tambah Data</p>
                    </a>
                </Header>
                <div className="w-full px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-5">
                    {magang?.map((item) => (
                        <CardMagang
                            link={`/dashboard/magang/detail/${item?.id}`}
                            posisi={item.jabatan}
                            namaPerusahaan={item?.profile_lembaga?.nama_lembaga}
                            lembaga={item?.profile_lembaga?.lembaga?.name}
                            gajiMinimum={item?.gaji_minimal === 0 ? '-' : item?.gaji_minimal.toLocaleString()}
                            gajiMaksimum={item?.gaji_maksimal}
                            dibuatTanggal={item?.created_at}
                            berakhirTanggal={item?.expired_at}>
                        </CardMagang>
                    ))}
                </div>
            </Layout>
        </>
    )
}

export default ViewMagangLembaga