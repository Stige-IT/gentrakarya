import { Helmet } from "react-helmet"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleLeft} from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { showPelatihan } from "../../../services/pelatihan_service"
import { deleteImageGaleryPelatihan, getImagePelatihan } from "../../../services/image_pelatihan_service"
import PelatihanDetailCard from "../../../components/card/pelatihan_detail_card"
import Layout from "../../../components/layout"
import Header from "../../../components/header"

const DetailPelatihanD = () => {

    const { pelatihan_id } = useParams()
const navigate = useNavigate()

    useEffect(() => {
        const newAccessToken = localStorage.getItem('access_token')
        
        if (newAccessToken === null || newAccessToken === "") {
            navigate('/')
        } 
    }, [pelatihan_id, navigate])
    return (
        <>
            <Helmet>Detail Informasi Pelatihan</Helmet>
            <Layout>
                <Header>
                    <a href="/dashboard/pelatihan" className="flex items-center space-x-3">
                        <FontAwesomeIcon icon={faChevronCircleLeft}></FontAwesomeIcon>
                        <p className="text-sm">Kembali</p>
                    </a>
                    <p>Detail Informasi Pelatihan</p>
                </Header>
                <PelatihanDetailCard pelatihan_id={pelatihan_id} category="lembaga" />
            </Layout>
        </>
    )
}

export default DetailPelatihanD