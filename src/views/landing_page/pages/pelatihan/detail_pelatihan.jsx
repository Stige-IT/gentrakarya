import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import Navbar from "../../../../components/navbar";
import PelatihanDetailCard from "../../../../components/card/pelatihan_detail_card";

const DetailPelatihan = () => {
  const { pelatihan_id } = useParams();
  return (
    <>
      <Helmet>
        <title>Detail Pelatihan - Gentra Karya</title>
      </Helmet>
      <div className="h-screen w-full bg-white text-black overflow-auto scrollbar-thin scrollbar-track-rounded-full  scrollbar-thumb-rounded-full scrollbar-thumb-yellow-400 pb-10">
        <Navbar></Navbar>
        <div className="sticky top-16 h-14 flex items-center px-10 text-sm border-b-2 bg-blue-300 space-x-3">
          <FontAwesomeIcon
            icon={faBell}
            className="h-8 aspect-square text-custom-dark"
          ></FontAwesomeIcon>
          <p className="text-base md:text-2xl font-semibold">
            Detail Informasi Pelatihan Gantra Karya
          </p>
        </div>

        <PelatihanDetailCard pelatihan_id={pelatihan_id} />
      </div>
    </>
  );
};

export default DetailPelatihan;
