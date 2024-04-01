import { Helmet } from "react-helmet"
import Layout from "../../../../components/dashboard_component/layout"
import Header from "../../../../components/dashboard_component/header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import CardWorkshop from "../../../../components/card_workshop"
import { getWorkshop } from "../../../../services/workshop_service"

const ViewWorkshopLembaga = () => {

    const [workshop, setWorkshop] = useState([])
    const [totalWorkshop, setTotalWorkshop] = useState(0)

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token')
        getWorkshop(accessToken).then((response) => {
            // console.log(response.data.data);
            if (response && response.status === 200) {
                setWorkshop(response.data.data)
                setTotalWorkshop(response.data.meta.total)
            } else {
                setWorkshop([])
                setTotalWorkshop(0)
            }
        })
    }, [])
    return (
        <>
            <Helmet>
                <title>Workshop</title>
            </Helmet>
            <Layout>
                <Header>
                    <p>Daftar Informasi Workshop <span className="text-xl">({totalWorkshop})</span></p>
                    <a href="/dashboard/workshop/add" className="flex items-center space-x-3 bg-blue-500 hover:bg-blue-600 transition-colors rounded-md px-3 py-2 text-white">
                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        <p className="hidden md:block">Tambah Info Workshop</p>
                        <p className="md:hidden">Tambah Data</p>
                    </a>
                </Header>
                <div className="w-full px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-5">
                    {workshop?.map((item) => (
                        <CardWorkshop
                            link={`/dashboard/workshop/detail/${item?.id}`}
                            posisi={item.judul_workshop}
                            namaPerusahaan={item?.profile_lembaga?.nama_lembaga}
                            lembaga={item?.profile_lembaga?.lembaga?.name}
                            biaya={item?.biaya_workshop}
                            metoda={item?.metoda}
                            pelaksanaan={item?.tanggal_pelaksanaan}
                            dibuatTanggal={item?.created_at} >
                        </CardWorkshop>
                    ))}
                </div>
            </Layout>
        </>
    )
}

export default ViewWorkshopLembaga