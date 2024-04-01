import { Helmet } from "react-helmet"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import Header from "../../../components/header"
import Layout from "../../../components/layout"

const DetailLamaranD = () => {
    return (
        <>
            <Helmet>
                <title>Daftar Lamaran</title>
            </Helmet>
            <Layout>
                <Header>
                <Link to="/dashboard/lamaran" className="flex items-center space-x-3">
                        <FontAwesomeIcon icon={faChevronCircleLeft}></FontAwesomeIcon>
                        <p className="text-sm">Kembali</p>
                    </Link>
                    <p>Detail Lamaran</p>
                    <div></div>
                </Header>
            </Layout>
        </>
    )
}

export default DetailLamaranD