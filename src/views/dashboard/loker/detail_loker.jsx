import { Helmet } from "react-helmet";
import {
  faChevronCircleLeft,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import LokerDetailCard from "../../../components/card/loker_detail_card";
import Layout from "../../../components/layout";
import Header from "../../../components/header";
import { deletLoker } from "../../../services/loker_service";

const DetaiLokerD = () => {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState("");

  const { loker_id } = useParams();

  const handleDelete = () => {
    deletLoker(accessToken, loker_id).then((response) => {
      if (response && response.status === 200) {
        navigate("/dashboard/loker");
      } else {
        alert("Hapus data gagal..!");
      }
    });
  };



  useEffect(() => {
    const accessToken = `Bearer ${localStorage.getItem("access_token")}`;
    setAccessToken(accessToken);

    
  }, []);
  return (
    <>
      <Helmet>
        <title>Detail Loker</title>
      </Helmet>
      <Layout>
        <Header>
          <Link to="/dashboard/loker" className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faChevronCircleLeft}></FontAwesomeIcon>
            <p className="text-sm">Kembali</p>
          </Link>
          <p>Nama Pekerjaan</p>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={handleDelete}
              className="space-x-3 flex items-center px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 text-sm"
            >
              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
              <p>Hapus</p>
            </button>

            <button
              type="button"
              className="space-x-3 flex items-center px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-sm"
            >
              <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
              <p>Edit</p>
            </button>
          </div>
        </Header>
        <LokerDetailCard loker_id={loker_id} category="lembaga"/>
      </Layout>
    </>
  );
};

export default DetaiLokerD;
