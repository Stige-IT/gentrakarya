import { Helmet } from "react-helmet"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { showWorkshop } from "../../../services/workshop_service"
import { deleteImageGaleryWorkshop, getImageWorkshop } from "../../../services/image_workshop_service"
import WorkshopDetailCard from "../../../components/card/workshop_detail_card"
import Layout from "../../../components/layout"
import Header from "../../../components/header"

const DetailWorkshopD = () => {

    const { workshop_id } = useParams()
    const [accessToken, setAccessToken] = useState('')

    return (
        <>
            <Helmet>Detail Informasi Workshop</Helmet>
            <Layout>
                <Header>
                    <Link to="/dashboard/workshop" className="flex items-center space-x-3">
                        <FontAwesomeIcon icon={faChevronCircleLeft}></FontAwesomeIcon>
                        <p className="text-sm">Kembali</p>
                    </Link>
                    <p>Detail Informasi Workshop</p>
                </Header>
            
                <WorkshopDetailCard workshop_id={workshop_id} category="lembaga"  />
            </Layout>

        </>
    )
}

export default DetailWorkshopD