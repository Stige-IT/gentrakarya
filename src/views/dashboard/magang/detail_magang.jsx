import { Helmet } from "react-helmet"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleLeft, faLocation, faLocationDot, faPlus } from "@fortawesome/free-solid-svg-icons"
import { useParams } from "react-router-dom"
import MagangDetailCard from "../../../components/card/magang_detail_card"
import Layout from "../../../components/layout"
import Header from "../../../components/header"

const DetailMagangD = () => {

    const { magang_id } = useParams()

    return (
        <>
            <Helmet>Detail Informasi Magang</Helmet>
            <Layout>
                <Header>
                    <a href="/dashboard/magang" className="flex items-center space-x-3">
                        <FontAwesomeIcon icon={faChevronCircleLeft}></FontAwesomeIcon>
                        <p className="text-sm">Kembali</p>
                    </a>
                    <p>Detail Informasi Magang</p>
                </Header>
            
                <MagangDetailCard magang_id={magang_id}></MagangDetailCard>
            </Layout>
        </>
    )
}

export default DetailMagangD