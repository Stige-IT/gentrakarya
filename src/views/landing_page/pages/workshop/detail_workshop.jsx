import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import WorkshopDetailCard from "../../../../components/card/workshop_detail_card";
import Navbar from "../../../../components/navbar";

const DetailWorkshop = () => {
  const { workshop_id } = useParams();
  return (
    <>
      <Helmet>
        <title> Detail Workshop - Gentra Karya</title>
      </Helmet>
      <div className="h-screen w-full bg-white text-black overflow-auto scrollbar-thin scrollbar-track-rounded-full  scrollbar-thumb-rounded-full scrollbar-thumb-yellow-400 pb-10">
        <Navbar></Navbar>
        <div className="sticky top-16 h-14 flex items-center px-10 text-sm border-b-2 bg-blue-300 space-x-3">
          <FontAwesomeIcon
            icon={faBell}
            className="h-8 aspect-square text-custom-dark"
          ></FontAwesomeIcon>
          <p className="text-base md:text-2xl font-semibold">
            Detail Informasi Workshop Gantra Karya
          </p>
        </div>
      <WorkshopDetailCard workshop_id={workshop_id}  />
      </div>
    </>
  );
};

export default DetailWorkshop;
