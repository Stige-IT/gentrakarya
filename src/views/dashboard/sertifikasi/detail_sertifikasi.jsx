import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { showSertifikasi } from "../../../services/sertifikasi_service";
import {
  deleteImageGalerySertifikasi,
  getImageSertifikasi,
} from "../../../services/image_sertifikasi_service";
import Layout from "../../../components/layout";
import Header from "../../../components/header";
import SertifikasiDetailCard from "../../../components/card/sertifikasi_detail_card";

const DetailSertifikasiD = () => {
  const { sertifikasi_id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [data, setData] = useState([]);
  const [imageGalery, setImageGalery] = useState([]);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // postImageSlider(accessToken, selectedImage).then((response) => {
    //     console.log(response);
    //     if (response && response.status === 200) {
    //         getImageslider().then((response) => {
    //             if (response && response.status === 200) {
    //                 setData(response.data.data)
    //             } else {
    //                 setData([])
    //             }
    //         })
    //     } else {
    //         alert('gagal tambah data..!')
    //     }

    // })
  };

  const addListClass = (htmlContent) => {
    return htmlContent.replace(/<ol>/g, '<ol class="list-decimal pl-10">');
  };

  const handleDeleteImage = (imageId) => {
    deleteImageGalerySertifikasi(accessToken, imageId).then((response) => {
      console.log(response);
      getImageSertifikasi(sertifikasi_id).then((response) => {
        if (response && response.status === 200) {
          setImageGalery(response.data.data);
        } else {
          setImageGalery([]);
        }
      });
    });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    setAccessToken(accessToken);

    showSertifikasi(sertifikasi_id).then((response) => {
      if (response && response.status === 200) {
        setData(response.data.data);
      } else {
        setData([]);
      }
    });

    getImageSertifikasi(sertifikasi_id).then((response) => {
      if (response && response.status === 200) {
        setImageGalery(response.data.data);
      } else {
        setImageGalery([]);
      }
    });
  }, []);
  return (
    <>
      <Helmet>
        <title>Detail Informasi Sertifikasi</title>
      </Helmet>
      <Layout>
        <Header>
          <Link
            to="/dashboard/sertifikasi"
            className="flex items-center space-x-3"
          >
            <FontAwesomeIcon icon={faChevronCircleLeft}></FontAwesomeIcon>
            <p className="text-sm">Kembali</p>
          </Link>
          <p>Detail Informasi Sertifikasi</p>
        </Header>


        <SertifikasiDetailCard sertifikasi_id={sertifikasi_id} category="lembaga" />
      </Layout>
    </>
  );
};

export default DetailSertifikasiD;
